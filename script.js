const fs = require("fs");
const path = require("path");

const startNumber = 5.0;
const endNumber = 10.0;
const numberOfFiles = 10;
const stepSize = (endNumber - startNumber) / (numberOfFiles - 1);

const outputDir = "out";

// Create 'out' directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

for (let i = 0; i < numberOfFiles; i++) {
  const currentNumber = (startNumber + i * stepSize).toString();
  const fileName = `file_${currentNumber}.txt`;
  const filePath = path.join(outputDir, fileName);
  const content = currentNumber;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error creating the file:", err);
    } else {
      console.log(`File "${fileName}" has been created successfully.`);
    }
  });
}
