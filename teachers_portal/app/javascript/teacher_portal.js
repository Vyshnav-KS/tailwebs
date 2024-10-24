document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', async function() {
      const row = button.closest('tr');
      const id = button.dataset.id;
      const name = row.querySelector('td:nth-child(1)').innerText;
      const subject = row.querySelector('td:nth-child(2)').innerText;
      const marks = row.querySelector('td:nth-child(3)').innerText;
      
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ student: { name, subject, marks } })
        });
        
        if (!response.ok) {
          alert('Failed to update student');
        }
      } catch (error) {
        console.error('Error updating student:', error);
      }
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async function() {
      const id = button.dataset.id;
      
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          button.closest('tr').remove();
        } else {
          alert('Failed to delete student');
        }
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    });
  });

  document.getElementById('add-student-btn').addEventListener('click', function() {
    document.getElementById('new-student-modal').style.display = 'block';
  });
  
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('new-student-modal').style.display = 'none';
  });
  
  document.getElementById('new-student-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const subject = event.target.subject.value;
    const marks = event.target.marks.value;
    
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ student: { name, subject, marks } })
      });
      
      if (response.ok) {
        // Add student to the table dynamically
        window.location.reload(); // Or dynamically insert the new student row
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  });
  
  