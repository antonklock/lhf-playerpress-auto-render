function logToFile(message) {
    var logFile = new File("/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/logs/aerender_log.txt"); // Choose a path to save log
    logFile.open('a'); // 'a' for appending 
    logFile.writeln(message);
    logFile.close();
}

logToFile("Script Execution Started"); // Mark the start

try {
    var file = File("/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/config.json");
    file.open();
    var content = file.read();
    file.close();

    var data = JSON.parse(content);

    //Write a script for after effects that changes a text layer's source text to a random number between 1 and 1000
    var comp = app.project.activeItem;

    //Get the text layer called "TEXT"
    var textLayer = comp.layer("TEXT");
    // textLayer.property("Source Text").setValue(Math.floor(Math.random() * 1000) + 1);
    textLayer.property("Source Text").setValue(data.textNumber);

    //Get the fill effect on the text layer
    var fillEffect = textLayer.property("Effects").property("Fill");
    //Change the fill effect color to a random color by first generating a random color for later use
    var randomColor = [Math.random(), Math.random(), Math.random(), 1];
    fillEffect.property("Color").setValue(randomColor);

    //Change the color of the fill effect on a solid layer to a random color
    var solidLayer = comp.layer("BG");

    //Get the fill effect called BG-Color on the solid layer
    var fillEffect = solidLayer.property("Effects").property("Fill");

    //Change the color to a random color that has great contrast to the text layer's color
    // fillEffect.property("Color").setValue([Math.random(), Math.random(), Math.random(), 1]);
    fillEffect.property("Color").setValue(data.color);



    function getComposition(name) {
        var project = app.project;
        for (var i = 1; i <= project.items.length; i++) {
            if (project.items[i].name === name && project.items[i] instanceof CompItem) {
                return project.items[i];
            }
        }
        return null;
    }

    var renderComp = getComposition("RENDER_COMP");

    if (renderComp) {
        var renderQueue = app.project.renderQueue;
        var renderItem = renderQueue.items.add(renderComp);
        renderItem.applyTemplate("Best Settings");
        renderItem.outputModule(1).applyTemplate("LHF PRORES");
        renderItem.outputModule(1).file = new File("/Users/antonklock/Documents/Projects/Workbench/Code/lhf-playerpresso-auto-renderer/output/" + data.outputName);
    } else {
        alert("Composition 'RENDER_COMP' not found in project!");
    }

    app.project.renderQueue.render();

    logToFile("Script completed successfully!");
    logToFile("Text Number: " + data.textNumber);
    logToFile("Color: " + data.color.toString());
    logToFile("Output Name: " + data.outputName);
} catch (error) {
    logToFile("Error occurred: " + error.toString());
}

