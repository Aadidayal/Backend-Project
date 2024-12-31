const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-data', (req, res) => {
    const userData = req.body;  

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading data file' });
        }

        let users = [];
        if (data) {
            
            users = JSON.parse(data);
        }

        users.push(userData);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving user data' });
            }

            
            res.json({ message: 'User data saved successfully!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
