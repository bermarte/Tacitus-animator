const fs = require("fs");
const path = require("path");

const startValues = {
  ObjectRotation: -25.43482,
  CX: 4.078432,
  CY: 16,
  CZ: 2.196079,
  ang: -0.2941177,
  scale: 3.098039,
  maxIterations: 13,
  Bailout: 4,
  PhongPower: 1,
  ShadowDensity: 0.1372549,
  AmbientOcclusionColor: "0, 0, 0.16875",
  AmbientOcclusionDensity: 0.58,
  AmbientOcclusionEmphasis: 0.85,
  ColorSpread: 0.7156863,
  RimLightFactor: 0,
  Specularity: 0.66,
  Shinyness: 15,
  EpsilonScale: 1,
  RaytracingStepLimit: 2000,
  BoundingSphereRadius: 16,
  CameraPosition: "-4, -2.173913, 0.7826087",
  CameraRotation: "121.3043, 117.3913, 86.08696",
  CameraZoom: 0,
  BackgroundColor: "0, 0, 0, 0",
  BackgroundImage: "<null>",
  AmbientColor: "0, 0, 0, 0",
  DiffuseColor: "0.83125, 0.85, 0.6625",
  LightPosition: "-8.652174, -25.69565, -13.54348",
  LightColor: "0, 1, 1",
  Exposure: 0.4705882,
};

const endValues = {
  ObjectRotation: 50.23913,
  CX: 16,
  CY: 32,
  CZ: 5.196079,
  ang: 0.2941177,
  scale: 5.098039,
  maxIterations: 50,
  Bailout: 10,
  PhongPower: 10,
  ShadowDensity: 0.3372549,
  AmbientOcclusionColor: "0, 0, 0.36875",
  AmbientOcclusionDensity: 1,
  AmbientOcclusionEmphasis: 1,
  ColorSpread: 1,
  RimLightFactor: 0.5,
  Specularity: 0.8,
  Shinyness: 30,
  EpsilonScale: 5,
  RaytracingStepLimit: 10000,
  BoundingSphereRadius: 32,
  CameraPosition: "-8, -4.173913, 1.7826087",
  CameraRotation: "241.3043, 237.3913, 206.08696",
  CameraZoom: 50,
  BackgroundColor: "1, 1, 1, 1",
  BackgroundImage: "<image>",
  AmbientColor: "1, 1, 1, 1",
  DiffuseColor: "1.83125, 1.85, 1.6625",
  LightPosition: "-16.652174, -50.69565, -30.54348",
  LightColor: "1, 2, 2",
  Exposure: 1.4705882,
};

const numberOfFiles = 100;
const stepSize = 1 / (numberOfFiles - 1);

const outputDir = "out";

// Create 'out' directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Helper function to interpolate between start and end values
function interpolateValues(startValue, endValue, t) {
  if (typeof startValue === "number" && typeof endValue === "number") {
    return startValue + t * (endValue - startValue);
  } else if (typeof startValue === "string" && typeof endValue === "string") {
    const startComponents = startValue.split(", ");
    const endComponents = endValue.split(", ");
    const interpolatedComponents = startComponents.map((start, index) => {
      const end = parseFloat(endComponents[index]);
      return (parseFloat(start) + t * (end - parseFloat(start))).toFixed(6);
    });
    return interpolatedComponents.join(", ");
  } else {
    throw new Error("Invalid data type for interpolation.");
  }
}

for (let i = 0; i < numberOfFiles; i++) {
  const t = i * stepSize;
  const interpolatedValues = {};

  for (const key of Object.keys(startValues)) {
    interpolatedValues[key] = interpolateValues(
      startValues[key],
      endValues[key],
      t
    );
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
