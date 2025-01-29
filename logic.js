async function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const userInput = userInputField.value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    // Display user message (left side)
    chatBox.innerHTML += `
    <div class="message user-message">
        <img src="user.png" alt="User" />
        <div>
            <strong>You:</strong> ${userInput}
        </div>
    </div>`;

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    userInputField.value = "";

    // Show " is typing..." message (right side)
    const typingMessage = `
    <div class="message bot-message typing">
        <img src="logo.png" alt="Bot Logo" />
        <div>
            <strong>Dialogix:</strong> <span style="color:white;">...</span>
        </div>
    </div>`;
    chatBox.innerHTML += typingMessage;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("http://localhost:5000/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        // Replace "Bot is typing..." with actual bot response (right side)
        const botResponse = `
        <div class="message bot-message">
            <img src="logo.png" alt="Bot Logo" />
            <div>
                <strong>Dialogix:</strong> ${data.response}
            </div>
        </div>`;
        
        // Remove the typing indicator
        document.querySelector(".typing").remove();

        // Display actual bot response
        chatBox.innerHTML += botResponse;
        
        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div class="message bot-message" style="background-color: red;"><strong>Error:</strong> ${error.message}</div>`;
    }
}

// Listen for Enter key
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
