const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    console.log("🚀 Starting MongoDB Atlas Connection Test...");
    console.log(
      "📍 Connection URI Status:",
      process.env.MONGODB_URI ? "✅ Found" : "❌ Not Found"
    );

    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI not found in environment variables");
      console.log(
        "💡 Make sure your .env file exists and contains MONGODB_URI"
      );
      return;
    }

    // Mask sensitive parts of URI for logging
    const maskedUri = process.env.MONGODB_URI.replace(
      /:([^:@]{8})[^:@]*@/,
      ":****@"
    );
    console.log("🔗 Connecting to:", maskedUri);

    console.log("⏳ Attempting connection...");

    // Set connection timeout options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      connectTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log("✅ MongoDB Atlas Connection Successful!");
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name || "default"}`);
    console.log(`📡 Port: ${conn.connection.port || "default"}`);
    console.log(
      `⚡ Ready State: ${
        conn.connection.readyState === 1 ? "Connected" : "Not Connected"
      }`
    );

    // Test database operations
    console.log("🔍 Testing database operations...");

    // List collections
    const admin = mongoose.connection.db.admin();
    const result = await admin.ping();
    console.log("🏓 Database ping successful:", result);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`📁 Available Collections: ${collections.length}`);

    if (collections.length > 0) {
      console.log(
        "📋 Collection names:",
        collections.map((c) => c.name).join(", ")
      );
    } else {
      console.log(
        "📝 No collections found (this is normal for a new database)"
      );
    }

    // Test creating a simple document
    console.log("📝 Testing document creation...");
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now },
    });
    const TestModel = mongoose.model("ConnectionTest", TestSchema);

    const testDoc = new TestModel({ name: "Connection Test" });
    await testDoc.save();
    console.log("✅ Test document created successfully");

    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log("🧹 Test document cleaned up");

    // Close connection
    await mongoose.connection.close();
    console.log("🔒 Connection closed successfully");
    console.log(
      "🎉 All tests passed! Your MongoDB Atlas connection is working perfectly."
    );
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Failed!");
    console.error("📝 Error details:", error.message);

    // Provide specific troubleshooting advice
    if (error.message.includes("authentication")) {
      console.error("🔑 Authentication Error:");
      console.error(
        "   - Check your username and password in the connection string"
      );
      console.error("   - Verify database user permissions in MongoDB Atlas");
    } else if (
      error.message.includes("IP") ||
      error.message.includes("whitelist") ||
      error.message.includes("not whitelisted")
    ) {
      console.error("🌐 IP Whitelist Error:");
      console.error("   1. Go to https://cloud.mongodb.com");
      console.error("   2. Navigate to Network Access");
      console.error('   3. Click "Add IP Address"');
      console.error(
        "   4. Add your current IP or use 0.0.0.0/0 for development"
      );
    } else if (
      error.message.includes("ENOTFOUND") ||
      error.message.includes("DNS")
    ) {
      console.error("🔍 DNS/URL Error:");
      console.error("   - Check your MongoDB cluster URL");
      console.error("   - Verify internet connection");
    } else if (error.message.includes("timeout")) {
      console.error("⏰ Connection Timeout:");
      console.error("   - Check your internet connection");
      console.error("   - MongoDB Atlas cluster might be starting up");
    }

    console.error("\n🔧 Quick fixes to try:");
    console.error("   1. Add your IP to MongoDB Atlas Network Access");
    console.error("   2. Check your internet connection");
    console.error("   3. Verify the connection string is correct");
    console.error("   4. Ensure your MongoDB Atlas cluster is running");

    process.exit(1);
  }
};

testConnection();
