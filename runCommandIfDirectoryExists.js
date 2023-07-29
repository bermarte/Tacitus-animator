const fs = require("fs");
const { spawn } = require("child_process");

const directoryPath = "./out"; // Replace 'your_directory' with the actual directory path
console.log("got it");
// Check if the directory exists
if (fs.existsSync(directoryPath)) {
  // Run the simple command (for demonstration, we'll run 'ls' command)
  const command = "ls"; // Replace 'ls' with your desired command
  const args = ["-l"]; // Replace ['-l'] with arguments for your command, if needed

  const childProcess = spawn(command, args, { stdio: "inherit" });

  // delete folder
  fs.rmdir(directoryPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error deleting directory:", err);
    } else {
      console.log("Directory deleted successfully.");
    }
  });

  childProcess.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
} else {
  console.log(`Directory "${directoryPath}" does not exist.`);
}
