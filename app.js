const express = require("express");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle the POST request to execute the Node.js script
app.post("/executeScript", (req, res) => {
  const createFilesProcess = spawn("node", ["script.js"]);

  createFilesProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  createFilesProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  createFilesProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    res.send("Node.js script execution completed!");
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
