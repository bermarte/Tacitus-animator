const fs = require("fs");
const path = require("path");

const numberOfFiles = 100;
const stepSize = 1 / (numberOfFiles - 1);

const outputDir = "out";

// Create 'out' directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Helper function to interpolate between start and end values for variables with multiple numbers
function interpolateMultiValues(startValue, endValue, t) {
  const startValuesArr = startValue.split(", ");
  const endValuesArr = endValue.split(", ");

  if (startValuesArr.length !== endValuesArr.length) {
    throw new Error(
      "Number of values in start and end values must be the same for multi-value variables."
    );
  }

  const interpolatedValuesArr = startValuesArr.map((start, index) => {
    const end = parseFloat(endValuesArr[index]);
    return (parseFloat(start) + t * (end - parseFloat(start))).toFixed(6);
  });

  return interpolatedValuesArr.join(", ");
}

// Read startValues and endValues from file1.txt and file2.txt respectively
const file1Content = fs.readFileSync("keyframe1.txt", "utf8");
const file2Content = fs.readFileSync("keyframe2.txt", "utf8");

console.log("File 1 Content:");
console.log(file1Content);

console.log("\nFile 2 Content:");
console.log(file2Content);

const startValues = {};
const endValues = {};

file1Content.split("\n").forEach((line) => {
  const [key, value] = line.trim().split(" = ");
  startValues[key] = value;
});

file2Content.split("\n").forEach((line) => {
  const [key, value] = line.trim().split(" = ");
  endValues[key] = value;
});

console.log("\nStart Values:");
console.log(startValues);

console.log("\nEnd Values:");
console.log(endValues);

for (let i = 0; i < numberOfFiles; i++) {
  const t = i * stepSize;
  const interpolatedValues = {};

  for (const key of Object.keys(startValues)) {
    const startValue = startValues[key];
    const endValue = endValues[key];

    if (startValue.includes(",")) {
      // For variables with multiple values, call the helper function to interpolate each value
      interpolatedValues[key] = interpolateMultiValues(startValue, endValue, t);
    } else {
      // For single-value variables, use regular interpolation
      interpolatedValues[key] =
        parseFloat(startValue) +
        t * (parseFloat(endValue) - parseFloat(startValue));
    }
  }

  const fileName = `file_${i + 1}.txt`;
  const filePath = path.join(outputDir, fileName);
  const content = Object.entries(interpolatedValues)
    .map(([key, value]) => `${key} = ${value}`)
    .join("\n");

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Error creating the file:", err);
    } else {
      console.log(`File "${fileName}" has been created successfully.`);
    }
  });
}

console.log("Finished creating files.");
