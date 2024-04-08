const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const scriptPath = path.join('/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/', 'test.js');

const textNumber = Math.floor(Math.random() * 1000) + 1;
const color = [Math.random(), Math.random(), Math.random(), 1];
const outputName = `output-${textNumber}-${color.join('-')}.mp4`;

const config = {
  textNumber,
  color,
  outputName,
};

fs.writeFileSync('./config.json', JSON.stringify(config), 'utf8');

const appleScript = `
  tell application "Adobe After Effects 2024"
    DoScriptFile "/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/test.js"
  end tell
`;

// Execute the AppleScript using osascript
const command = `osascript -e '${appleScript}'`;

exec(command, (error, stdout, stderr) => {
  console.log("==RAW OUTPUT==");
  console.log("Error:", error);
  console.log("Stdout:", stdout);
  console.log("Stderr:", stderr);
});