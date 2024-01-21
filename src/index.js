const app = require("./app");
const connectDB = require("./db");

connectDB();

app.listen(3000);
console.log("Server on port", 3000);
