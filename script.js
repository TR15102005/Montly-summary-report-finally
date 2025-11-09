document.addEventListener('DOMContentLoaded', function() {
    const roleSelector = document.getElementById('role-selector');
    const logoutButton = document.getElementById('logout-btn');
    const generateButton = document.getElementById('generate-btn');
    
    // --- Role Management ---
    
    // Function to update the UI based on the selected role
    function updateRoleUI(role) {
        // Hide all role-specific elements first
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.teacher-only').forEach(el => el.style.display = 'none');

        // Show elements specific to the current role
        if (role === 'admin') {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
            console.log("UI set for: Admin");
        } else if (role === 'teacher') {
            document.querySelectorAll('.teacher-only').forEach(el => el.style.display = 'block');
            console.log("UI set for: Teacher");
        }
        
        // The Logout button remains visible across all roles (No change needed here)
        logoutButton.style.display = 'inline-block';
    }

    // Event listener for changing the role (for demo)
    roleSelector.addEventListener('change', function() {
        updateRoleUI(this.value);
    });

    // Initial load: Set the UI based on the default selected value ("teacher" in HTML)
    updateRoleUI(roleSelector.value);

    // --- Report Generation and Data Handling ---

    generateButton.addEventListener('click', function() {
        const monthYear = document.getElementById('month-select').value;
        const [year, month] = monthYear.split('-');
        
        // In a real application, this would be an AJAX/Fetch call to the Java API:
        // fetch(`/api/v1/attendance/report?year=${year}&month=${month}`)
        
        console.log(`Fetching report for: ${month}/${year}`);
        
        // --- SIMULATED DATA FETCH ---
        // Replace this with your actual fetch call and error handling
        const simulatedData = [
            { id: 1001, name: "Alice Smith", hoursMS: 577800000, lateCount: 2, absentDays: 0 },
            { id: 1002, name: "Bob Johnson", hoursMS: 571500000, lateCount: 5, absentDays: 1 },
            { id: 1003, name: "Charlie Brown", hoursMS: 594000000, lateCount: 0, absentDays: 0 },
            { id: 1004, name: "Diana Prince", hoursMS: 550800000, lateCount: 1, absentDays: 2 }
        ];

        renderTable(simulatedData);
    });

    // Function to format milliseconds into human-readable hours/minutes
    function formatDuration(ms) {
        if (ms < 0) return "N/A";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }

    // Function to render the data into the HTML table
    function renderTable(reportData) {
        const tableBody = document.getElementById('report-body');
        tableBody.innerHTML = ''; // Clear existing rows

        reportData.forEach(record => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = record.id;
            row.insertCell().textContent = record.name;
            row.insertCell().textContent = formatDuration(record.hoursMS);
            row.insertCell().textContent = record.lateCount;
            row.insertCell().textContent = record.absentDays;
        });
    }
    
    // --- Logout Action ---
    logoutButton.addEventListener('click', function() {
        if (confirm("Are you sure you want to log out?")) {
            // Implement actual session termination and redirect here
            alert("Logging out...");
            // window.location.href = '/login.html'; // Redirect to login page
        }
    });

});