const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const clearBtn = document.getElementById("clearBtn");

// Load saved messages
let chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

function displayMessages() {
    messages.innerHTML = "";

    if (chatMessages.length === 0) {
        messages.innerHTML = `
            <div class="welcome">
                👋 Welcome to My Chat App!
                <br>
                Enter your name and send a message.
            </div>
        `;
        return;
    }

    chatMessages.forEach(function (chat) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
messageDiv.innerHTML = `
    <strong>${chat.name}</strong>
    <p>${chat.message}</p>
    <small>${chat.time}</small>
    <button class="delete-btn">🗑️ Delete</button>
`;
        

        messages.appendChild(messageDiv);
    });

    messages.scrollTop = messages.scrollHeight;
}

// Send message
function sendMessage() {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username === "") {
        alert("Please enter your name!");
        usernameInput.focus();
        return;
    }

    if (message === "") {
        alert("Please type a message!");
        messageInput.focus();
        return;
    }

    const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const newMessage = {
        name: username,
        message: message,
        time: currentTime
    };

    chatMessages.push(newMessage);

    localStorage.setItem(
        "chatMessages",
        JSON.stringify(chatMessages)
    );

    messageInput.value = "";

    displayMessages();
}

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter key
messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Clear chat
clearBtn.addEventListener("click", function () {
    if (chatMessages.length === 0) {
        alert("Chat is already empty!");
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to clear all messages?"
    );

    if (confirmClear) {
        chatMessages = [];

        localStorage.removeItem("chatMessages");

        displayMessages();
    }
});

// Display messages when page opens
displayMessages();
document.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const messageDiv = event.target.parentElement;

        const messageIndex =
            Array.from(messages.children).indexOf(messageDiv);

        chatMessages.splice(messageIndex, 1);

        localStorage.setItem(
            "chatMessages",
            JSON.stringify(chatMessages)
        );

        displayMessages();
    }

});
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});
const typingBox = document.getElementById("typing");

messageInput.addEventListener("input", function () {

    const username = usernameInput.value.trim();

    if (messageInput.value.trim() !== "" && username !== "") {
        typingBox.textContent = username + " is typing...";
    } else {
        typingBox.textContent = "";
    }

});