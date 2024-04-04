const fs = require('fs');

// Read 
const inputFilePath = './input.txt';
const outputFilePath = './output.txt';

let content;
try {
    content = fs.readFileSync(inputFilePath, 'utf8');
} catch (error) {
    console.error('Error reading file:', error);
    process.exit(1);
}

// Modify 
const modifiedContent = content.toUpperCase();

// Write 
try {
    fs.writeFileSync(outputFilePath, modifiedContent, 'utf8');
    console.log('File modified successfully!');
} catch (error) {
    console.error('Error writing file:', error);
    process.exit(1);
}
