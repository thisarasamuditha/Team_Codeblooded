const https = require("https");

const getPublicIP = () => {
  return new Promise((resolve, reject) => {
    https
      .get("https://api.ipify.org?format=json", (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.ip);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const checkIP = async () => {
  try {
    console.log("🔍 Checking your public IP address...");
    const ip = await getPublicIP();
    console.log(`🌐 Your current public IP address is: ${ip}`);
    console.log("\n📋 Steps to whitelist this IP in MongoDB Atlas:");
    console.log("1. Go to https://cloud.mongodb.com");
    console.log("2. Select your project");
    console.log('3. Click "Network Access" in the left sidebar');
    console.log('4. Click "Add IP Address" button');
    console.log("5. Either:");
    console.log(`   - Enter this specific IP: ${ip}`);
    console.log('   - Or click "Add Current IP Address"');
    console.log("   - Or use 0.0.0.0/0 for development (allows all IPs)");
    console.log('6. Click "Confirm"');
    console.log(
      '7. Wait for the status to show "Active" (may take 1-2 minutes)'
    );
    console.log(
      "\n⚠️  Important: For production, use specific IP addresses, not 0.0.0.0/0"
    );
  } catch (error) {
    console.error("❌ Could not retrieve IP address:", error.message);
    console.log("\n🔧 Manual steps:");
    console.log("1. Go to https://whatismyipaddress.com/ to find your IP");
    console.log("2. Follow the MongoDB Atlas IP whitelisting steps above");
  }
};

console.log("🚀 IP Address Checker for MongoDB Atlas Whitelisting");
checkIP();
