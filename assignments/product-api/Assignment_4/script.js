const form = document.getElementById("requestForm");
const requestList = document.getElementById("requestList");


// GET all requests
async function getRequests() {

    const response = await fetch("/api/requests");

    const requests = await response.json();

    displayRequests(requests);
}


// Display requests
function displayRequests(requests) {

    requestList.innerHTML = "";

    requests.forEach(request => {

        const div = document.createElement("div");

        div.className = "request";

        div.innerHTML = `
            <h3>${request.category}</h3>

            <p><strong>Name:</strong> ${request.studentName}</p>

            <p><strong>Email:</strong> ${request.email}</p>

            <p><strong>Description:</strong> ${request.description}</p>

            <p><strong>Priority:</strong> ${request.priority}</p>

            <button class="edit"
                onclick="editRequest(${request.id})">
                Edit
            </button>

            <button class="delete"
                onclick="deleteRequest(${request.id})">
                Delete
            </button>
        `;

        requestList.appendChild(div);
    });
}


// POST new request
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const requestData = {

        studentName:
            document.getElementById("studentName").value,

        email:
            document.getElementById("email").value,

        category:
            document.getElementById("category").value,

        description:
            document.getElementById("description").value,

        priority:
            document.getElementById("priority").value
    };


    await fetch("/api/requests", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(requestData)
    });


    form.reset();

    getRequests();
});


// DELETE request
async function deleteRequest(id) {

    if (!confirm("Are you sure you want to delete this request?")) {
        return;
    }

    await fetch(`/api/requests/${id}`, {
        method: "DELETE"
    });

    getRequests();
}


// PUT request
async function editRequest(id) {

    const studentName =
        prompt("Enter student name:");

    const email =
        prompt("Enter email:");

    const category =
        prompt("Enter category:");

    const description =
        prompt("Enter problem description:");

    const priority =
        prompt("Enter priority (Low/Medium/High):");


    if (!studentName || !email || !category ||
        !description || !priority) {
        return;
    }


    await fetch(`/api/requests/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            studentName,
            email,
            category,
            description,
            priority

        })
    });


    getRequests();
}


// Load requests when page opens
getRequests();