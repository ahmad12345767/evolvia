// EVOLVIA AI Assistant Widget Simulation

document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const chatChips = document.querySelectorAll('.chat-chip');

  if (!chatMessages) return;

  const responses = {
    "Add document": "📄 Document uploaded! I'm analyzing the data structure now...",
    "Analyze": "📊 System analysis complete: 4 Workflow bottlenecks detected. Automation can save 24 hrs/week.",
    "Generate Image": "🎨 Creating high-conversion web graphic asset in EVOLVIA design style...",
    "research": "🔍 Deep web research complete: Target audience prefers clean dark glassmorphism interfaces.",
    "E-mail Sending..": "✉️ Automated cold outreach sequence initiated for 50 verified leads.",
    "LinkedIn": "💼 LinkedIn campaign scheduled for top 100 enterprise decision makers."
  };

  chatChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const text = chip.textContent.trim();
      
      // Append user prompt
      appendMessage(text, 'user');

      // Simulate AI typing delay
      setTimeout(() => {
        const reply = responses[text] || "⚡ Processing request with EVOLVIA AI Engine...";
        appendMessage(reply, 'ai');
      }, 600);
    });
  });

  function appendMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg msg-${type}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
