// EVOLVIA Main JS - Scroll reveals, accordion, mobile menu, notifications

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initial view check

  // 1b. Video Speed Controller & 3s Delayed Hero Pop & Character blurInUp Entrance
  const bgVideo = document.querySelector('.video-bg-video');
  const heroItems = document.querySelectorAll('.hero-animate-item');

  // Function to split text nodes into character spans for MagicUI blurInUp effect
  function splitTextToChars(element) {
    if (!element) return;
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const span = document.createElement('span');
          span.className = 'char-span';
          span.textContent = char;
          fragment.appendChild(span);
        }
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT') {
        Array.from(node.childNodes).forEach(processNode);
      }
    };
    Array.from(element.childNodes).forEach(processNode);

    // Index all char spans
    const chars = element.querySelectorAll('.char-span');
    chars.forEach((c, idx) => {
      c.style.setProperty('--char-index', idx);
    });
  }

  // Split hero titles/subtitles into character spans
  const animateCharTitles = document.querySelectorAll('.text-animate-chars');
  animateCharTitles.forEach((el) => splitTextToChars(el));

  if (bgVideo) {
    bgVideo.playbackRate = 1.0;
    
    // After 1s: speed up video to 2.0x for 2 seconds
    setTimeout(() => {
      bgVideo.playbackRate = 2.0;
      
      // After 2 seconds (at 3s total): return back to normal 1.0x speed
      setTimeout(() => {
        bgVideo.playbackRate = 1.0;
      }, 2000);
    }, 1000);
  }

  // After 3s: trigger character-by-character blurInUp fade-in
  setTimeout(() => {
    heroItems.forEach((item) => {
      item.classList.add('hero-animated');
    });

    const allCharSpans = document.querySelectorAll('.char-span');
    allCharSpans.forEach((span) => {
      span.classList.add('animate-char');
    });
  }, 3000);

  // 2. FAQ Accordion Toggle
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      accordionItems.forEach((other) => other.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // 4. Form Submission Handling & Toast
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show custom toast notification
      showToast('Thank you! Your submission has been received successfully.');
      form.reset();
    });
  });

  // Task Manager Checkboxes Toggle
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checked');
      const item = checkbox.closest('.task-item');
      if (item) {
        item.style.opacity = checkbox.classList.contains('checked') ? '0.6' : '1';
      }
    });
  });
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('evolvia-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'evolvia-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #814ac8 0%, #df7afe 100%);
      color: #ffffff;
      padding: 14px 24px;
      border-radius: 9999px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 9999;
      transition: all 0.4s ease;
      opacity: 0;
      transform: translateY(20px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4000);
}
