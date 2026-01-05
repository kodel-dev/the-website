const socket = new WebSocket("ws://goofy-ahh-silly.my.id//");

socket.onopen = () => {
    console.log("Connected to WSS server");
};

socket.onerror = (e) => {
    console.error("WebSocket error", e);
};

socket.onmessage = (event) => {
    console.log("Raw:", event.data);

    const data = JSON.parse(event.data);
    const adminAbuseView = document.getElementById("admin_abuse_view");
    const liveChat = document.getElementById("live_chat");

    if (data.Type === "AdminAbuse") {
        adminAbuseView.innerHTML = `
            <p>Player: ${data.Player}</p>
            <p>Message: ${data.Message}</p>
        `;
        alert(`Admin Abuse Alert: ${data.Player} said: \n${data.Message}`);
    } else if (data.Type === "LiveChat") {
        liveChat.innerHTML += `
            <p><strong>${data.Player}:</strong> ${data.Message}</>
        `;
    }
};

function toggle_ROFE() {
    const checkbox = document.getElementById("text_filter");

    socket.send(JSON.stringify({
        Type: "ToggleFilter",
        IsEnabled: checkbox.checked
    }));
}

function sendMesg() {
    const input = document.getElementById("message_input");
    socket.send(JSON.stringify({
        Type: "LiveChat",
        Player: "Anonymous",
        Message: input.value
    }));
    input.value = "";
}