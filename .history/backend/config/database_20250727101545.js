module.exports = {
  database: {
    url: process.env.DATABASE_URL || "postgresql://farukzahra@localhost:5432/tokenverde_db"
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || "tokenverde-super-secret-jwt-key-2024",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  },
  
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development"
  }
} 