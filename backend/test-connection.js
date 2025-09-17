const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    console.log("🔄 Testing MongoDB Atlas connection...");
    console.log(
      `📍 Connection URI: ${
        process.env.MONGODB_URI ? "URI found in .env" : "URI NOT FOUND"
      }`
    );

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Atlas Connection Successful!");
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`📡 Port: ${conn.connection.port}`);
    console.log(
      `⚡ Ready State: ${
        conn.connection.readyState === 1 ? "Connected" : "Not Connected"
      }`
    );

    // Test a simple operation
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`📁 Available Collections: ${collections.length}`);

    if (collections.length > 0) {
      console.log(
        "📋 Collection names:",
        collections.map((c) => c.name).join(", ")
      );
    }

    // Close connection
    await mongoose.connection.close();
    console.log("🔒 Connection closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Failed!");
    console.error("📝 Error details:", error.message);

    if (error.message.includes("authentication")) {
      console.error(
        "🔑 Authentication Error: Please check your username and password"
      );
    } else if (error.message.includes("network")) {
      console.error("🌐 Network Error: Please check your internet connection");
    } else if (error.message.includes("ENOTFOUND")) {
      console.error("🔍 DNS Error: Please check your MongoDB URI");
    }

    process.exit(1);
  }
};

console.log("🚀 Starting MongoDB Atlas Connection Test...");
testConnection();
