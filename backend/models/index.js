require('dotenv').config();
const sql = require('mssql');

// Validate environment variables
const requiredEnvVars = ['DB_USER', 'DB_PASS', 'DB_HOST', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Log connection details (remove in production)
console.log('Attempting to connect to:', process.env.DB_HOST);
console.log('Database:', process.env.DB_NAME);
console.log('User:', process.env.DB_USER);

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
    connectionTimeout: 30000
  }
};

async function connect() {
  try {
    await sql.connect(config);
    console.log('Connected to Azure SQL Database');
  } catch (err) {
    console.error('Database connection failed:');
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
    if (err.originalError) {
      console.error('Original error:', err.originalError.message);
    }
    process.exit(1);
  }
}

connect();

module.exports = sql;
