// EVOLVIA AI Assistant — Evie Organic Natural Intelligence Engine

document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const chatChips = document.querySelectorAll('.chat-chip');
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-user-input');

  if (!chatMessages) return;

  function getEvieOrganicResponse(userText) {
    const textLower = userText.toLowerCase().trim();
    const words = textLower.split(/\s+/);

    // 1. Specific Query: How websites are built / Development team
    if (
      textLower.includes("developing team") ||
      textLower.includes("developer") ||
      textLower.includes("how do you guys build") ||
      textLower.includes("how do you build") ||
      textLower.includes("how is it built") ||
      textLower.includes("team or what") ||
      textLower.includes("who builds") ||
      textLower.includes("in house") ||
      textLower.includes("code base") ||
      textLower.includes("how websites are made") ||
      textLower.includes("stack")
    ) {
      return "We have a dedicated in-house team of senior web engineers and UI/UX designers led by Ahmad Jammal. Every website is engineered completely custom from scratch — starting with strategic wireframes and glassmorphic designs, followed by hand-coding high-speed frameworks (HTML5, Vanilla CSS, JS, Vite/Next.js) with 60fps micro-animations and custom AI tools. No rigid pre-made templates!";
    }

    // 2. Weather & Environment
    if (
      textLower.includes("weather") ||
      textLower.includes("temperature") ||
      textLower.includes("rain") ||
      textLower.includes("sunny") ||
      textLower.includes("cold outside") ||
      textLower.includes("hot outside")
    ) {
      return "I don't have a live satellite weather sensor built into my code, but inside EVOLVIA's servers it's always 72°F and 100% optimal for building high-converting websites! How is the weather where you're located today?";
    }

    // 3. Greetings with "How are you"
    if (
      textLower.includes("how are you") ||
      textLower.includes("how are u") ||
      textLower.includes("how's it going") ||
      textLower.includes("how do you feel") ||
      textLower.includes("what's up") ||
      textLower.includes("how is your day")
    ) {
      return "Hi there! I'm Evie, doing fantastic and ready to help! How are you doing today? Let me know if you have any questions about custom website design, workflow automations, or how EVOLVIA operates.";
    }

    // 4. Standalone Greetings (Short queries only)
    if (/^(hi|hello|hey|yo|greetings|howdy|sup)\b/i.test(textLower) && words.length <= 4) {
      return "Hi! I'm Evie, EVOLVIA's AI assistant. What's on your mind today? Feel free to ask me anything about our web engineering process, pricing, build timelines, or custom AI solutions!";
    }

    // 5. Identity / Who is Evie
    if (
      textLower.includes("who are you") ||
      textLower.includes("what are you") ||
      textLower.includes("your name") ||
      textLower.includes("who built you") ||
      textLower.includes("who is evie") ||
      textLower.includes("are you real")
    ) {
      return "I'm Evie, EVOLVIA's AI assistant! I help clients explore custom web design projects, architect workflow automations, calculate project scopes, and answer technical or strategic questions in real time.";
    }

    // 6. Web Design & Agency Services
    if (
      textLower.includes("web design") ||
      textLower.includes("website") ||
      textLower.includes("landing page") ||
      textLower.includes("redesign") ||
      textLower.includes("glassmorphism") ||
      textLower.includes("frontend") ||
      textLower.includes("ui/ux") ||
      textLower.includes("responsive") ||
      textLower.includes("seo") ||
      textLower.includes("ecommerce")
    ) {
      return "🌐 EVOLVIA specializes in bespoke, ultra-high-end web design and engineering. We craft modern glassmorphism user interfaces, 60fps micro-animations, lightning-fast Next.js/Vite frameworks, and mobile-optimized layouts designed explicitly to convert visitors into paying clients.";
    }

    // 7. Pricing & Costs
    if (
      textLower.includes("cost") ||
      textLower.includes("price") ||
      textLower.includes("pricing") ||
      textLower.includes("package") ||
      textLower.includes("how much") ||
      textLower.includes("rate") ||
      textLower.includes("quote") ||
      textLower.includes("budget") ||
      textLower.includes("expensive") ||
      textLower.includes("cheap")
    ) {
      return "💰 At EVOLVIA, pricing is transparent and tailored to your project's specific scope. We offer packages for growing startups, custom brand builds, and enterprise platforms with custom AI integrations. Contact us or click 'Book a Call' for an exact tailored estimate!";
    }

    // 8. Timelines & Turnaround
    if (
      textLower.includes("timeline") ||
      textLower.includes("how long") ||
      textLower.includes("how fast") ||
      textLower.includes("duration") ||
      textLower.includes("weeks") ||
      textLower.includes("turnaround") ||
      textLower.includes("schedule") ||
      textLower.includes("deadline")
    ) {
      return "⏱️ Typical custom high-end website builds are completed in 2 to 4 weeks. Our structured process includes: 1) Strategy & Wireframing, 2) Glassmorphic UI/UX Design, 3) Custom Code Engineering, and 4) QA Testing & Zero-Downtime Launch.";
    }

    // 9. AI & Workflow Automations
    if (
      textLower.includes("automation") ||
      textLower.includes("ai tool") ||
      textLower.includes("lead generation") ||
      textLower.includes("outreach") ||
      textLower.includes("bot") ||
      textLower.includes("crm") ||
      textLower.includes("workflow") ||
      textLower.includes("scraper")
    ) {
      return "🤖 We design and deploy custom AI automation pipelines — including automated lead scraper bots, AI customer support widgets, automated email outreach sequences, and CRM integrations that save teams 20+ hours per week!";
    }

    // 10. Contact & Discovery Calls
    if (
      textLower.includes("contact") ||
      textLower.includes("book") ||
      textLower.includes("call") ||
      textLower.includes("schedule") ||
      textLower.includes("ahmad") ||
      textLower.includes("email") ||
      textLower.includes("talk to human") ||
      textLower.includes("hire") ||
      textLower.includes("reach out")
    ) {
      return "📞 You can book a discovery call directly via our Contact page or click 'Book a Call' in the top header menu! Alternatively, reach out directly to Ahmad Jammal at jamhmad51@gmail.com.";
    }

    // 11. Jokes / Humor
    if (
      textLower.includes("joke") ||
      textLower.includes("funny") ||
      textLower.includes("laugh")
    ) {
      return "Why do web developers prefer dark mode? Because light attracts bugs! 🐛 But at EVOLVIA, we write code so clean even light mode wouldn't find any!";
    }

    // 12. Gratitude & Affirmation
    if (
      textLower.includes("thank") ||
      textLower.includes("thanks") ||
      textLower.includes("awesome") ||
      textLower.includes("great") ||
      textLower.includes("cool") ||
      textLower.includes("perfect")
    ) {
      return "You're very welcome! Is there anything else I can clarify for you about our web engineering, AI automations, or booking a call?";
    }

    // 13. Dynamic Organic Open-Ended Response
    return `That's a great question! As Evie, EVOLVIA's AI assistant, I can help you with custom web engineering, UI/UX design, AI workflow automations, and digital agency strategy. Would you like to explore our website packages or book a discovery call with our team?`;
  }

  function handleUserQuery(text) {
    if (!text || text.trim() === '') return;

    // 1. Display user message
    appendMessage(text, 'user');

    // 2. Create AI bubble with jumping dots "..." and "thinking"
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'chat-msg msg-ai';
    thinkingDiv.innerHTML = `
      <span class="thinking-text">thinking</span>
      <span class="jumping-dots">
        <span>.</span><span>.</span><span>.</span>
      </span>
    `;
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const thinkingLabel = thinkingDiv.querySelector('.thinking-text');

    // Phase 1: Change to "answering" after 400ms
    setTimeout(() => {
      if (thinkingLabel) {
        thinkingLabel.textContent = 'answering';
      }
    }, 400);

    // Phase 2: Word-by-word streaming response after 850ms
    setTimeout(() => {
      const fullReply = getEvieOrganicResponse(text);
      thinkingDiv.innerHTML = '';
      streamTextWordByWord(thinkingDiv, fullReply);
    }, 850);
  }

  function streamTextWordByWord(container, fullText) {
    const words = fullText.split(' ');
    container.textContent = '';
    let index = 0;

    const streamInterval = setInterval(() => {
      if (index < words.length) {
        container.textContent += (index === 0 ? '' : ' ') + words[index];
        index++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } else {
        clearInterval(streamInterval);
      }
    }, 28);
  }

  // Handle prompt chips
  chatChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const text = chip.textContent.trim().replace(/^[^\w\s]+\s*/, '');
      handleUserQuery(text);
    });
  });

  // Handle user typed form submit
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value.trim();
      if (query) {
        handleUserQuery(query);
        chatInput.value = '';
      }
    });
  }

  function appendMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg msg-${type}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
