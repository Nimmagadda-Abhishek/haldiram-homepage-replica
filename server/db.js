const mysql = require('mysql2/promise');
require('dotenv').config();

// Parse the DATABASE_URL from the .env file
const parseConnectionString = (url) => {
  try {
    // Format: mysql://username:password@hostname:port/database
    const regex = /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    const match = url.match(regex);
    
    if (!match) {
      throw new Error('Invalid connection string format');
    }
    
    return {
      user: match[1],
      password: match[2],
      host: match[3],
      port: parseInt(match[4], 10),
      database: match[5]
    };
  } catch (error) {
    console.error('Error parsing connection string:', error);
    // Fallback to hardcoded values if parsing fails
    return {
      host: 'srv1402.hstgr.io',
      user: 'u567147732_joshfoods',
      password: 'Joshfoods4123',
      database: 'u567147732_joshfoods',
      port: 3306
    };
  }
};

// Create a connection pool
const createPool = () => {
  const config = parseConnectionString(process.env.DATABASE_URL);
  console.log('Creating MySQL connection pool with config:', {
    host: config.host,
    user: config.user,
    database: config.database,
    port: config.port
  });
  
  return mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

const pool = createPool();

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connection successful!');
    connection.release();
    return true;
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    return false;
  }
};

// Execute a query
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  query,
  testConnection
};