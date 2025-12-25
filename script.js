const quoteContentElem = document.getElementById('quoteContent');
const quoteAuthorElem = document.getElementById('quoteAuthor');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('languageSelect');
const bodyElem = document.body;
const loadingIndicator = document.getElementById('loading');

let isDark = true;
let copyTimeoutId = null;
let currentQuote = null;

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark = savedTheme === 'dark';
    bodyElem.classList.toggle('light', !isDark);
    themeToggle.innerText = isDark ? '🌙 Toggle Theme' : '☀️ Toggle Theme';
  } else {
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

const CATEGORY_MAP_EN = {
  all: '',
  inspiration: 'inspirational',
  life: 'life',
  courage: 'courage',
  wisdom: 'wisdom',
  humor: 'humor',
};

function buildQuoteUrl(searchTerm) {
  return 'https://thequoteshub.com/api/random';
}

async function fetchJsonWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timer);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

function selectRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function fetchEnglishQuote(category, searchTerm) {
  const url = 'https://thequoteshub.com/api/random';
  const data = await fetchJsonWithTimeout(url);
  const content = data?.text || data?.quote || data?.content;
  const author = data?.author || 'Unknown';
  if (!content) throw new Error('No English quote');
  return { content, author };
}

async function fetchHindiQuote() {
  const data = await fetchJsonWithTimeout('https://hindi-quotes.vercel.app/random');
  const content = data?.quote || data?.text || data?.content;
  if (!content) throw new Error('No Hindi quote');
  return { content, author: data?.author || '—' };
}

function showQuote(quote) {
  if (!quote) return;
  quoteContentElem.classList.add('fade-quote');
  quoteAuthorElem.classList.add('fade-quote');
  setTimeout(() => {
    quoteContentElem.innerText = quote.content;
    quoteAuthorElem.innerText = quote.author ? `— ${quote.author}` : '';
    quoteContentElem.classList.remove('fade-quote');
    quoteAuthorElem.classList.remove('fade-quote');
  }, 250);
}

async function fetchQuoteData() {
  const language = languageSelect.value;
  loadingIndicator.style.display = 'block';
  try {
    const quote = language === 'hi' ? await fetchHindiQuote() : await fetchEnglishQuote();
    currentQuote = quote;
    showQuote(currentQuote);
  } catch (err) {
    showQuote({ content: 'Could not fetch a quote. Please try again.', author: '' });
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

function getUniqueShareText() {
  const prefixes = [
    '✨ Just discovered: ',
    '💡 This hit me today: ',
    '🌟 Words to live by: ',
    '💪 Found this gem: ',
    '🎯 Needed this today: ',
    '📝 Sharing some wisdom: ',
  ];
  const suffixes = [
    ' #InspireMe #DailyMotivation',
    ' #Mindfulness #Inspire',
    ' #QuoteOfTheDay #Motivation',
    ' #WisdomForLife #Inspire',
    ' #MotivationMonday #DailyInspiration',
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const quote = `"${quoteContentElem.innerText}" ${quoteAuthorElem.innerText}`;
  return prefix + quote + suffix;
}

function copyQuote() {
  const text = getUniqueShareText();
  navigator.clipboard.writeText(text).then(() => {
    copyMsg.classList.add('visible');
    if (copyTimeoutId) clearTimeout(copyTimeoutId);
    copyTimeoutId = setTimeout(() => copyMsg.classList.remove('visible'), 2000);
  });
}

function shareQuote(platform) {
  const text = getUniqueShareText();
  const quoteText = encodeURIComponent(text);
  const url = encodeURIComponent(window.location.href);
  const urls = {
    twitter: `https://twitter.com/intent/tweet?text=${quoteText}&url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quoteText}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${quoteText}`,
    whatsapp: `https://wa.me/?text=${quoteText}`,
  };
  if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400');
}

window.addEventListener('load', () => {
  loadTheme();
  fetchQuoteData();
});

generateBtn.addEventListener('click', () => fetchQuoteData());
copyBtn.addEventListener('click', () => copyQuote());
themeToggle.addEventListener('click', () => toggleTheme());
languageSelect.addEventListener('change', () => fetchQuoteData());
generateBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    generateBtn.click();
  }
});

document.getElementById('shareTwitter').addEventListener('click', () => shareQuote('twitter'));
document.getElementById('shareFacebook').addEventListener('click', () => shareQuote('facebook'));
document.getElementById('shareLinkedIn').addEventListener('click', () => shareQuote('linkedin'));
document.getElementById('shareWhatsApp').addEventListener('click', () => shareQuote('whatsapp'));
