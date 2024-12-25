const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files (e.g., HTML in 'public' folder)
app.use(express.static(path.join(__dirname, 'public')));

// Function to execute a script
function executeScript(script, res) {
    const scriptPath = path.join(__dirname, 'deploy', script);
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ${script}: ${stderr}`);
            return res.status(500).send(`Failed to deploy ${script}.`);
        }
        console.log(`Output from ${script}: ${stdout}`);
        res.send(`${script} deployed successfully!`);
    });
}

// Dynamically generate endpoints for each script in 'deploy' folder
const deployFolder = path.join(__dirname, 'deploy');
if (fs.existsSync(deployFolder)) {
    const scripts = fs.readdirSync(deployFolder);
    scripts.forEach(script => {
        const scriptName = script.replace('.jelly.bash', ''); // Remove file extension for the endpoint
        app.post(`/deploy/${scriptName}`, (req, res) => {
            console.log(`Endpoint triggered: /deploy/${scriptName}`);
            executeScript(script, res);
        });
    });
} else {
    console.error(`Deploy folder not found at ${deployFolder}`);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
