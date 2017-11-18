const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname + "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
// Start the app by listening on the default
// Heroku port
const port = process.env.PORT | "3001";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log("Running"));
