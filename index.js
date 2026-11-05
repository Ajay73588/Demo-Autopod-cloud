function startPod() {
    document.getElementById("status").innerText = "Running";
    document.getElementById("status").style.color = "green";

    alert("Pod started successfully!");
}

function stopPod() {
    document.getElementById("status").innerText = "Stopped";
    document.getElementById("status").style.color = "red";

    alert("Pod stopped successfully!");
}