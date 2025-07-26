module.exports = {
  // Database
  database: {
    url: process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/tokenverde_db"
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || "your-super-secret-jwt-key-here",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  },

  // Server
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development"
  },

  // Blockchain
  blockchain: {
    network: process.env.ETHEREUM_NETWORK || "sepolia",
    infuraProjectId: process.env.INFURA_PROJECT_ID || "your-infura-project-id",
    privateKey: process.env.PRIVATE_KEY || "your-private-key"
  },

  // Email
  email: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password"
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379"
  },

  // File Upload
  upload: {
    path: process.env.UPLOAD_PATH || "./uploads",
    maxFileSize: process.env.MAX_FILE_SIZE || 5242880
  },

  // API Keys
  apiKeys: {
    googleMaps: process.env.GOOGLE_MAPS_API_KEY || "your-google-maps-api-key",
    openWeather: process.env.OPENWEATHER_API_KEY || "your-openweather-api-key"
  }
} 