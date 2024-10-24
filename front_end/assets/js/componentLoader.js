// Load HTML component and inject it into a target element
function loadComponent(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load the dashboard container
loadComponent('components/dashboard_container.html', 'dashboard-container');

// Load the modals
loadComponent('components/edit_modal.html', 'modals-container');
loadComponent('components/add_modal.html', 'modals-container');
