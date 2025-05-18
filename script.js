/*ELEMENT REFERENCES*/

const quoteContentElem = document.getElementById('quoteContent');
const quoteAuthorElem = document.getElementById('quoteAuthor');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const bodyElem = document.body;
const loadingIndicator = document.getElementById('loading');
const confettiWrapper = document.querySelector('.confetti-wrapper');

/*APPLICATION STATE*/

let isDark = true;
let quotes = [];
let filteredQuotes = [];
let currentQuoteIndex = 0;
let copyTimeoutId = null;

/* QUOTES DATA
   Expanded sets, categorized and with authors*/

const englishQuotes = [
  {
    content: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "inspiration",
  },
  {
    content: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    category: "life",
  },
  {
    content: "Dream big and dare to fail.",
    author: "Norman Vaughan",
    category: "courage",
  },
  {
    content: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
    category: "inspiration",
  },
  {
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "wisdom",
  },
  {
    content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "courage",
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
  },
  {
    content: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "humor",
  },
  {
    content: "That which does not kill us makes us stronger.",
    author: "Friedrich Nietzsche",
    category: "courage",
  },
  {
    content: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: "wisdom",
  }
];

const hindiQuotes = [
  {
    content: "सफलता कभी अंतिम नहीं होती, असफलता घातक नहीं होती। यह साहस जारी रखने का महत्व है।",
    author: "विन्स्टन चर्चिल",
    category: "courage",
  },
  {
    content: "आप जो हैं, उससे खुश रहें।",
    author: "डेल कार्नेगी",
    category: "life",
  },
  {
    content: "बड़ा सोचो और असफल होने का साहस रखो।",
    author: "नॉर्मन वॉन",
    category: "courage",
  },
  {
    content: "जो तुम्हें मार नहीं डालता, वह तुम्हें मजबूत बनाता है।",
    author: "नीत्शे",
    category: "courage",
  },
  {
    content: "जीवन में सबसे बड़ा रहस्य खुशी पाने का तरीका है।",
    author: "अज्ञात",
    category: "happiness",
  },
  {
    content: "ज्ञान में ही शक्ति है।",
    author: "फ़्रांसिस बेकन",
    category: "wisdom",
  },
  {
    content: "अपने सपनों को मत छोड़ो।",
    author: "वॉल्ट डिज़्नी",
    category: "inspiration",
  },
  {
    content: "सपने सच होने का इंतजार नहीं करते।",
    author: "नेल्सन मंडेला",
    category: "inspiration",
  },
  {
    content: "आत्मविश्वास सफलता की पहली कुंजी है।",
    author: "राल्फ वाल्डो इमर्सन",
    category: "courage",
  },
  {
    content: "जहाँ इच्छा वहाँ राह।",
    author: "अनामिक",
    category: "life",
  }
];

/*UTILITIES*/

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*THEME MANAGEMENT*/

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark = savedTheme === 'dark';
    bodyElem.classList.toggle('light', !isDark);
    themeToggle.innerText = isDark ? '🌙 Toggle Theme' : '☀️ Toggle Theme';
  } else {
    // Default to dark mode
    isDark = true;
    bodyElem.classList.remove('light');
    themeToggle.innerText = '🌙 Toggle Theme';
  }
}

function toggleTheme() {
  isDark = !isDark;
  bodyElem.classList.toggle('light', !isDark);
  themeToggle.innerText = isDark ? '🌙 Toggle Theme' : '☀️ Toggle Theme';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* FILTER & SEARCH MANAGEMENT */
function filterQuotes() {
  const language = languageSelect.value;
  const category = categorySelect.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Select quotes based on language
  quotes = language === 'en' ? englishQuotes : hindiQuotes;

  // Filter by category and search term
  filteredQuotes = quotes.filter(q => {
    const matchesCat = category === 'all' || q.category === category;
    const matchesSearch =
      q.content.toLowerCase().includes(searchTerm) ||
      q.author.toLowerCase().includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  if (filteredQuotes.length === 0) {
    filteredQuotes = [{
      content: "No quotes found. Try a different filter or search term.",
      author: "",
      category: "info"
    }];
  }

  currentQuoteIndex = 0;
}

/* QUOTE DISPLAY MANAGEMENT*/
function showQuote(index) {
  if (!filteredQuotes.length) return;

  const quote = filteredQuotes[index % filteredQuotes.length];
  
  // Animate fade out, change text, fade in
  quoteContentElem.classList.add('fade-quote');
  quoteAuthorElem.classList.add('fade-quote');
  setTimeout(() => {
    quoteContentElem.innerText = quote.content;
    quoteAuthorElem.innerText = quote.author ? `— ${quote.author}` : '';
    quoteContentElem.classList.remove('fade-quote');
    quoteAuthorElem.classList.remove('fade-quote');
  }, 250);

  currentQuoteIndex = (index + 1) % filteredQuotes.length;
}

/* FETCH QUOTES (simulated)
   with loading indicator */
async function fetchQuoteData() {
  loadingIndicator.style.display = 'block';
  loadingIndicator.setAttribute('aria-hidden', 'false');
  // Simulate loading delay
  await delay(700);

  filterQuotes();

  loadingIndicator.style.display = 'none';
  loadingIndicator.setAttribute('aria-hidden', 'true');

  showQuote(currentQuoteIndex);
}

/* COPY QUOTE TO CLIPBOARD */
function copyQuote() {
  const textToCopy = `"${quoteContentElem.innerText}" ${quoteAuthorElem.innerText}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    copyMsg.classList.add('visible');
    if (copyTimeoutId) clearTimeout(copyTimeoutId);
    copyTimeoutId = setTimeout(() => {
      copyMsg.classList.remove('visible');
    }, 2000);
  });
}

/* SHARE QUOTE ON SOCIAL MEDIA */
function shareQuote(platform) {
  const quoteText = encodeURIComponent(`"${quoteContentElem.innerText}" ${quoteAuthorElem.innerText}`);
  const url = encodeURIComponent(window.location.href);

  let shareUrl = '';
  switch(platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${quoteText}&url=${url}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quoteText}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${quoteText}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${quoteText}`;
      break;
  }
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

/* CONFETTI ANIMATION
   Fires confetti effect bursts when new quote is generated */
function createConfettiPiece(x, y, color) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.backgroundColor = color;
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;
  confetti.style.opacity = '1';

  const fallDuration = 2000 + Math.random() * 1500;
  const rotationStart = Math.random() * 360;
  const rotationEnd = rotationStart + (Math.random() > 0.5 ? 360 : -360);

  confetti.style.animationDuration = `${fallDuration}ms`;
  confetti.style.transform = `rotate(${rotationStart}deg)`;

  confettiWrapper.appendChild(confetti);

  confetti.animate(
    [
      { transform: `translateY(0) rotate(${rotationStart}deg)`, opacity: 1 },
      { transform: `translateY(100vh) rotate(${rotationEnd}deg)`, opacity: 0 },
    ],
    {
      duration: fallDuration,
      easing: 'linear',
      iterations: 1,
    }
  );

  setTimeout(() => {
    confetti.remove();
  }, fallDuration);
}

function launchConfetti() {
  const colors = ['#10b981','#3b82f6','#fbbf24','#ef4444','#8b5cf6'];
  const count = 25; // Pieces of confetti
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * vw;
    const y = Math.random() * -20;
    const color = colors[Math.floor(Math.random() * colors.length)];
    createConfettiPiece(x, y, color);
  }
}

/* ==============================
   SOUND SPECIAL EFFECT ON NEW QUOTE
=============================== * /
function playSoundEffect() {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(520, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.15);

    oscillator.onended = () => {
      context.close();
    };
  } catch (e) {
    // AudioContext not supported or user gesture required
    // Silently ignore
  }
}

/* ==============================
   INITIALIZATION & EVENT BINDINGS
=============================== */
window.addEventListener('load', async () => {
  loadTheme();
  await fetchQuoteData();
});

generateBtn.addEventListener('click', () => {
  showQuote(currentQuoteIndex);
  launchConfetti();
  playSoundEffect();
});

copyBtn.addEventListener('click', () => {
  copyQuote();
});

themeToggle.addEventListener('click', () => {
  toggleTheme();
});

languageSelect.addEventListener('change', async () => {
  await fetchQuoteData();
});

categorySelect.addEventListener('change', async () => {
  await fetchQuoteData();
});

searchInput.addEventListener('input', async () => {
  await fetchQuoteData();
});

generateBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    generateBtn.click();
  }
});

// Share buttons
document.getElementById('shareTwitter').addEventListener('click', () => {
  shareQuote('twitter');
});
document.getElementById('shareFacebook').addEventListener('click', () => {
  shareQuote('facebook');
});
document.getElementById('shareLinkedIn').addEventListener('click', () => {
  shareQuote('linkedin');
});
document.getElementById('shareWhatsApp').addEventListener('click', () => {
  shareQuote('whatsapp');
});
