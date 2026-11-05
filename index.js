
function updateStats() {
    const rows = document.querySelectorAll("#podTable tr");

    let total = rows.length;
    let running = 0;

    rows.forEach(row => {
        const status = row.querySelector(".status");

        if (status && status.classList.contains("running")) {
            running++;
        }
    });

    document.getElementById("totalPods").innerText =
        String(total).padStart(2, "0");

    document.getElementById("runningPods").innerText =
        String(running).padStart(2, "0");
}

// Start / Stop Pod
function togglePod(button) {
    const row = button.closest("tr");
    const status = row.querySelector(".status");

    if (status.classList.contains("running")) {
        status.className = "status stopped";
        status.innerText = "● Stopped";

        button.className = "action-btn start";
        button.innerText = "Start";

        row.cells[3].innerText = "0%";
        row.cells[4].innerText = "0 MB";

    } else {
        status.className = "status running";
        status.innerText = "● Running";

        button.className = "action-btn stop";
        button.innerText = "Stop";

        row.cells[3].innerText = "25%";
        row.cells[4].innerText = "512 MB";
    }

    updateStats();
}

// Create new Pod
function createPod() {
    const name = prompt("Enter your new pod name:");

    if (!name || !name.trim()) return;

    const table = document.getElementById("podTable");

    const row = table.insertRow();

    row.innerHTML = `
        <td>
            <strong>${escapeHTML(name.trim())}</strong>
            <small>pod-${Date.now().toString().slice(-6)}</small>
        </td>
        <td>nginx:latest</td>
        <td><span class="status stopped">● Stopped</span></td>
        <td>0%</td>
        <td>0 MB</td>
        <td>
            <button class="action-btn start"
                onclick="togglePod(this)">Start</button>
        </td>
    `;

    updateStats();
}

// Search Pods
function searchPods() {
    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const rows = document.querySelectorAll("#podTable tr");

    rows.forEach(row => {
        const name = row.cells[0].innerText.toLowerCase();
        row.style.display = name.includes(search) ? "" : "none";
    });
}

// Prevent HTML injection in pod names
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

updateStats();
