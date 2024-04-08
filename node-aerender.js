const { exec } = require('child_process');

const aeDir = "/Applications/Adobe\\ After\\ Effects\\ 2024";
const projectDir = "/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/test-project.aep";

const scriptPath = "/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/test.js";
const command = `${aeDir}/aerender -project ${projectDir} -comp "RENDER_COMP" -s 1 -e 74 -RStemplate "Best Settings" -OMtemplate "LHF PRORES" -output "/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/output/movie.mov" -v quiet -execute "${tempScriptPath}"`;


exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log("==RAW OUTPUT==");
        console.log("Error:", error);
        console.log("Stdout:", stdout);
        console.log("Stderr:", stderr);
        return;
    } else {
        console.log("==RAW OUTPUT==");
        console.log("Error:", error);
        console.log("Stdout:", stdout);
        console.log("Stderr:", stderr);
    }
});