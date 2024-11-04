// Check if the user is authenticated by looking for a token in local storage
window.onload = function() {
    const token = localStorage.getItem('token');
    if (!token) {
        // If no token, redirect to login page
        window.location.href = 'index.html';
    } else {
        // Token is present, fetch and display student data
        fetchStudents();
    }
};

// Fetch student data from the server and populate the table
let allStudents = [];
async function fetchStudents() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/get_students/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    allStudents = await response.json(); // Store all students in the global variable
    displayStudents(allStudents); // Call a function to display students
}

// Function to display students in the table
function displayStudents(students) {
    const tbody = document.getElementById('student-list').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear the existing content

    // Populate the table with student data
    students.forEach(student => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = student.name;
        row.insertCell(1).innerText = student.subject;
        row.insertCell(2).innerText = student.marks;

        const actionsCell = row.insertCell(3);

        // Dropdown Menu for Edit and Delete
        const actionDropdown = document.createElement('select');
        actionDropdown.className = 'action-dropdown'; // Add class for styling

        // Create a default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.innerText = 'Select an action'; // Placeholder option
        defaultOption.disabled = true; // Make it unselectable
        defaultOption.selected = true; // Set it as the default selected option

        const editOption = document.createElement('option');
        editOption.value = 'edit';
        editOption.innerText = 'Edit';

        const deleteOption = document.createElement('option');
        deleteOption.value = 'delete';
        deleteOption.innerText = 'Delete';

        // Append options to the dropdown
        actionDropdown.appendChild(defaultOption);
        actionDropdown.appendChild(editOption);
        actionDropdown.appendChild(deleteOption);

        // Handle dropdown selection
        actionDropdown.onchange = () => {
            if (actionDropdown.value === 'edit') {
                openEditModal(student); // Open modal for editing
            } else if (actionDropdown.value === 'delete') {
                deleteStudent(student.id); // Function to handle delete
            }
            actionDropdown.selectedIndex = 0; // Reset dropdown to default after selection
        };

        actionsCell.appendChild(actionDropdown);
    });
}


// Function to search students by name or subject
function searchStudents() {
    const query = document.getElementById('searchInput').value.toLowerCase(); // Get the search input
    const filteredStudents = allStudents.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.subject.toLowerCase().includes(query)
    );

    displayStudents(filteredStudents); // Display the filtered students
}


// Open the Add Student Modal
function openAddModal() {
    document.getElementById("addModal").style.display = "block";
}

// Close the Add Student Modal
function closeAddModal() {
    document.getElementById("addModal").style.display = "none";
}

// Function to Save a New Student
function saveNewStudent() {
    const name = document.getElementById("addName").value;
    const subject = document.getElementById("addSubject").value;
    const marks = document.getElementById("addMarks").value;

    if (name && subject && marks) {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8000/api/create_student/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                subject: subject,
                marks: parseInt(marks)
            })
        })
        .then(response => {
            console.log(response); 
            if (!response.ok) {
                // Handle HTTP errors
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Failed to add student');
                });
            }
            return response.json(); // Parse response JSON if status is OK
        })
        .then(data => {
            alert("Student added successfully!");
            closeAddModal();
            fetchStudents();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error adding student: " + error.message);
        });
    } else {
        alert("Please fill in all fields");
    }
}


// Delete student from the server
async function deleteStudent(studentId) {
    const token = localStorage.getItem('token');
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
        const response = await fetch(`http://localhost:8000/api/student_detail/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            alert('Student deleted successfully.');
            fetchStudents(); // Refresh the student list
        } else {
            const errorData = response.status;
            console.log(errorData);
            if (errorData == 403){
                alert("You are not allowed to delete this student");
                console.log(errorData);
            }
            else{
                alert("Failed to update student details");
            }
        }
    }
}

// Open edit modal with student details pre-filled
function openEditModal(student) {
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';

    // Pre-fill the form with student data
    document.getElementById('editName').value = student.name;
    document.getElementById('editSubject').value = student.subject;
    document.getElementById('editMarks').value = student.marks;

    // Save the student ID in a hidden field for later use
    document.getElementById('editStudentId').value = student.id;
}

// Close the modal
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}


// Edit student details and send the update to the server
async function saveEdit() {
    const studentId = document.getElementById('editStudentId').value;
    const updatedName = document.getElementById('editName').value;
    const updatedSubject = document.getElementById('editSubject').value;
    const updatedMarks = document.getElementById('editMarks').value;

    const token = localStorage.getItem('token');
    
    const response = await fetch(`http://localhost:8000/api/student_detail/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({  
            // student: {
                name: updatedName,
                subject: updatedSubject,
                marks: updatedMarks
            // }
        })
    });

    if (response.ok) {
        alert('Student details updated successfully.');
        closeEditModal();
        fetchStudents(); // Refresh the student list
    } else {
        const errorData = response.status;
        console.log(errorData);
        if (errorData == 403){
            alert("You are not allowed to edit this student");
            console.log(errorData);
        }
        else{
            alert("Failed to update student details");
        }
    }
}

// Logout function
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('token'); // Remove token
    window.location.href = 'index.html'; // Redirect to login
});


