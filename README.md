# InspireMe

A simple, elegant random quote generator that fetches inspirational quotes in English and Hindi. Share quotes with unique, personalized formatting across social media platforms.

## Features

✨ **Random Quote Generation** - Fetch inspiring quotes in English or Hindi with a single click

🌍 **Bilingual Support** - Toggle between English (via TheQuotesHub API) and Hindi (via hindi-quotes.vercel.app)

📋 **Copy & Share** - Copy quotes to clipboard with unique prefixes and hashtags, or share directly on Twitter, Facebook, LinkedIn, and WhatsApp

🎨 **Dark/Light Theme** - Toggle between dark and light modes with persistent local storage

✏️ **Smooth Animations** - Fade-in animations for quote transitions

📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript** - No dependencies, lightweight and fast
- **APIs Used**:
  - TheQuotesHub (`https://thequoteshub.com/api/random`) - English quotes
  - Hindi Quotes (`https://hindi-quotes.vercel.app/random`) - Hindi quotes

## How to Use

1. **Open the App** - Open `index.html` in your web browser
2. **Generate Quote** - Click the "New Quote" button to fetch a random quote
3. **Switch Language** - Use the language dropdown to switch between English and Hindi
4. **Copy Quote** - Click "Copy" to copy the quote to clipboard (includes unique prefix and hashtags)
5. **Share on Social Media** - Click any social media icon to share with custom formatting
6. **Toggle Theme** - Click the theme button (🌙/☀️) in the top-right to switch between dark and light modes

## File Structure

```
InspireME/
├── index.html      # Main HTML structure
├── script.js       # JavaScript functionality (138 lines)
├── styles.css      # Styling and animations
└── README.md       # This file
```

## Customization

### Add More Share Prefixes
Edit the `prefixes` array in `getUniqueShareText()` function in `script.js`:
```javascript
const prefixes = [
  '✨ Just discovered: ',
  '💡 This hit me today: ',
  // Add more prefixes here
];
```

### Add More Hashtags
Edit the `suffixes` array in `getUniqueShareText()` function in `script.js`:
```javascript
const suffixes = [
  ' #InspireMe #DailyMotivation',
  ' #Mindfulness #Inspire',
  // Add more hashtags here
];
```
### Change Color Scheme
Modify the gradient and color variables in `styles.css`:
- Dark mode gradient: Lines ~10-11
- Light mode colors: `.light` class styling

## API Details

### TheQuotesHub
- **Endpoint**: `https://thequoteshub.com/api/random`
- **Response**: Single quote object with `text` and `author` fields
- **Rate Limit**: Free tier available

### Hindi Quotes
- **Endpoint**: `https://hindi-quotes.vercel.app/random`
- **Response**: Single quote object with `quote` and `author` fields
- **Rate Limit**: No authentication required


## Performance

- **Total Bundle Size**: ~6KB (HTML + CSS + JS combined)
- **Load Time**: < 1 second on average connection
- **No Dependencies**: Pure vanilla JavaScript

## Future Enhancements

- [ ] Local quote database fallback
- [ ] Quote history/favorites
- [ ] Multiple quote APIs with fallback chain
- [ ] PWA support for offline access
- [ ] Custom quote categories
- [ ] Export quotes as image

## License

Open source - free to use and modify



---

Made with vanilla JavaScript, HTML5, and CSS3.
