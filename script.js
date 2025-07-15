const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Function to add message to chat box
function addMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle send button click
sendBtn.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  userInput.value = '';

  // Optional: Show typing...
  const typing = document.createElement('div');
  typing.classList.add('bot-message');
  typing.innerText = 'Typing...';
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await res.json();

    // Remove "Typing..." and show response
    chatBox.removeChild(typing);
    addMessage(data.reply || 'Sorry, I did not understand that.', 'bot');
  } catch (err) {
    chatBox.removeChild(typing);
    addMessage('Error connecting to server.', 'bot');
  }
});