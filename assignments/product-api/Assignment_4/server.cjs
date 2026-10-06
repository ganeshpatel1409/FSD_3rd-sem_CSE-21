const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, "requests.json");

app.use(express.json());

app.use(express.static(__dirname));

// Read requests from JSON file
function getRequests() {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

// Save requests to JSON file
function saveRequests(requests) {
    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));
}


// GET all requests
app.get("/api/requests", (req, res) => {
    const requests = getRequests();
    res.json(requests);
});


// GET request by ID
app.get("/api/requests/:id", (req, res) => {
    const requests = getRequests();

    const request = requests.find(
        r => r.id === parseInt(req.params.id)
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});


// POST new request
app.post("/api/requests", (req, res) => {
    const requests = getRequests();

    const newRequest = {
        id: requests.length > 0
            ? Math.max(...requests.map(r => r.id)) + 1
            : 1,

        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);
    saveRequests(requests);

    res.status(201).json(newRequest);
});


// PUT update request
app.put("/api/requests/:id", (req, res) => {
    const requests = getRequests();

    const index = requests.findIndex(
        r => r.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests[index] = {
        id: requests[index].id,
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    saveRequests(requests);

    res.json(requests[index]);
});


// DELETE request
app.delete("/api/requests/:id", (req, res) => {
    const requests = getRequests();

    const index = requests.findIndex(
        r => r.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const deletedRequest = requests.splice(index, 1);

    saveRequests(requests);

    res.json({
        message: "Request deleted successfully",
        request: deletedRequest[0]
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});