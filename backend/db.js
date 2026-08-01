import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Declared let, initialized in connectDB to handle environment configurations gracefully
let pool;

export const connectDB = async () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('\n========================================================================');
    console.error('❌ ERROR: DATABASE_URL environment variable is missing!');
    console.error('========================================================================');
    console.error('👉 The application is running in an environment where the ".env" file is');
    console.error('   missing (or has not been created in the "backend" folder).');
    console.error('   Please create a ".env" file in the "backend" directory containing:');
    console.error('   DATABASE_URL=postgresql://neondb_owner:npg_ngAR1mvjeH5z@ep-small-bread-avn3zsc2-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require');
    console.error('   or configure DATABASE_URL in your server system environment.');
    console.error('========================================================================\n');
    throw new Error('DATABASE_URL environment variable is not defined.');
  }

  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Neon serverless postgres ssl
    }
  });

  try {
    // Test database connection
    const client = await pool.connect();
    console.log('✨ Neon PostgreSQL Connected successfully!');
    client.release();

    // Create tables if they do not exist
    await initializeTables();

    // Seed products table if empty
    await seedDatabaseIfEmpty();
  } catch (error) {
    console.error('❌ Failed to connect or initialize Neon PostgreSQL database:', error.message);
    throw error;
  }
};

const initializeTables = async () => {
  // 1. Products table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC NOT NULL,
      unit VARCHAR(50) DEFAULT '250g',
      category VARCHAR(100) NOT NULL,
      traditional_method VARCHAR(255) NOT NULL,
      benefits TEXT[] NOT NULL,
      specifications JSONB NOT NULL,
      usage TEXT NOT NULL,
      recipes TEXT[] NOT NULL,
      rating NUMERIC DEFAULT 4.8,
      image VARCHAR(255) NOT NULL,
      stock INTEGER DEFAULT 100
    )
  `);

  // 2. Orders table (using JSONB for flexible items lists and customer details)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id VARCHAR(50) PRIMARY KEY,
      customer JSONB NOT NULL,
      items JSONB NOT NULL,
      total_amount NUMERIC NOT NULL,
      status VARCHAR(50) DEFAULT 'Processing',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 3. Messages/Contact table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('📋 Database tables verified/created successfully.');
};

const seedDatabaseIfEmpty = async () => {
  try {
    const seedFile = path.join(DATA_DIR, 'seed.json');
    if (!fs.existsSync(seedFile)) return;

    const seedData = JSON.parse(fs.readFileSync(seedFile, 'utf-8'));

    for (const prod of seedData) {
      const prodId = prod._id || prod.id;
      // UPSERT products into PostgreSQL Neon DB
      await pool.query(`
        INSERT INTO products (
          id, name, description, price, unit, category, traditional_method, 
          benefits, specifications, usage, recipes, rating, image, stock
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          unit = EXCLUDED.unit,
          category = EXCLUDED.category,
          traditional_method = EXCLUDED.traditional_method,
          benefits = EXCLUDED.benefits,
          specifications = EXCLUDED.specifications,
          usage = EXCLUDED.usage,
          recipes = EXCLUDED.recipes,
          rating = EXCLUDED.rating,
          image = EXCLUDED.image,
          stock = EXCLUDED.stock;
      `, [
        prodId,
        prod.name,
        prod.description,
        prod.price,
        prod.unit || '100g',
        prod.category,
        prod.traditionalMethod,
        prod.benefits,
        JSON.stringify(prod.specifications),
        prod.usage,
        prod.recipes,
        prod.rating || 4.8,
        prod.image,
        prod.stock || 100
      ]);
    }
    console.log(`✅ Products database synchronized with ${seedData.length} standard 100g packages.`);
  } catch (error) {
    console.error('❌ Error seeding/updating PostgreSQL products table:', error.message);
  }
};

// Map Postgres DB row into frontend JSON format
const mapProductRow = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    unit: row.unit,
    category: row.category,
    traditionalMethod: row.traditional_method,
    benefits: row.benefits,
    specifications: row.specifications,
    usage: row.usage,
    recipes: row.recipes,
    rating: parseFloat(row.rating),
    image: row.image,
    stock: parseInt(row.stock)
  };
};

const mapOrderRow = (row) => {
  if (!row) return null;
  return {
    orderId: row.order_id,
    customer: row.customer,
    items: row.items,
    totalAmount: parseFloat(row.total_amount),
    status: row.status,
    createdAt: row.created_at
  };
};

export const dbService = {
  // PRODUCTS
  async getProducts() {
    const res = await pool.query('SELECT * FROM products ORDER BY name ASC');
    return res.rows.map(mapProductRow);
  },

  async getProductById(id) {
    const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (res.rows.length === 0) return null;
    return mapProductRow(res.rows[0]);
  },

  // ORDERS
  async createOrder(orderData) {
    const orderId = 'AGN-' + Math.floor(100000 + Math.random() * 900000);
    const status = 'Processing';
    const createdAt = new Date().toISOString();

    await pool.query(`
      INSERT INTO orders (order_id, customer, items, total_amount, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      orderId,
      JSON.stringify(orderData.customer),
      JSON.stringify(orderData.items),
      orderData.totalAmount,
      status,
      createdAt
    ]);

    return {
      orderId,
      customer: orderData.customer,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status,
      createdAt
    };
  },

  async getOrders() {
    const res = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return res.rows.map(mapOrderRow);
  },

  // MESSAGES
  async createMessage(msgData) {
    const id = 'MSG-' + Math.floor(100000 + Math.random() * 900000);
    const createdAt = new Date().toISOString();

    await pool.query(`
      INSERT INTO messages (id, name, email, phone, subject, message, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      id,
      msgData.name,
      msgData.email,
      msgData.phone || '',
      msgData.subject || '',
      msgData.message,
      createdAt
    ]);

    return {
      id,
      ...msgData,
      createdAt
    };
  },

  async getMessages() {
    const res = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    return res.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at
    }));
  }
};
