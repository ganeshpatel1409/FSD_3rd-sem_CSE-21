const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'students.json');

// Ensure students.json exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
}

// HTML Form Interface
const getFormHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Record Form</title>
</head>
<body>
    <h1>Welcome to Student Management Server</h1>
    <h2>Add Student Record</h2>
    <form action="/" method="POST">
        <label for="name">Student Name:</label><br>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="rollNumber">Roll Number:</label><br>
        <input type="text" id="rollNumber" name="rollNumber" required><br><br>
        
        <label for="course">Course:</label><br>
        <input type="text" id="course" name="course" required><br><br>
        
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>
        
        <button type="submit">Add Student</button>
    </form>
    <br>
    <a href="/students">View All Students</a>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    // 1. GET / - Display Welcome message and Form
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(getFormHTML());
    } 
    // 2. POST / - Handle Form Submission
    else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = querystring.parse(body);
            
            // Read current data
            fs.readFile(DATA_FILE, 'utf8', (err, data) => {
                let students = [];
                if (!err && data) {
                    try {
                        students = JSON.parse(data);
                    } catch (e) {
                        students = [];
                    }
                }

                // Add new student record
                students.push(formData);

                // Save back to students.json
                fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Student added successfully!</h1><a href="/">Go Back</a> | <a href="/students">View Records</a>');
                });
            });
        });
    } 
    // 3. GET /students - Display JSON Records
    else if (req.method === 'GET' && req.url === '/students') {
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data || JSON.stringify([]));
        });
    } 
    // 4. Handle 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});