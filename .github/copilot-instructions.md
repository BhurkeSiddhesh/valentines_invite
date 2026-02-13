# Copilot Instructions for Valentine's Invite

## Project Overview
This is an interactive Valentine's Day invitation website with playful UI animations. The site features a fun "runaway" No button and celebration animations when the Yes button is clicked, along with an animated duck character that reacts to user interactions.

**Live Site**: https://BhurkeSiddhesh.github.io/valentines_invite/

## Tech Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern animations, gradients, and transitions
- **Vanilla JavaScript**: No frameworks - pure DOM manipulation
- **Fonts**: 
  - Poppins (from Google Fonts) for UI elements
- **Hosting**: GitHub Pages with automated deployment via GitHub Actions

## Project Structure
```
├── index.html          # Main HTML file with duck and valentine UI
├── style.css           # All styles including animations
├── script.js           # Interactive behavior and animations
└── .github/
    └── workflows/
        └── pages.yml   # GitHub Pages deployment workflow
```

## Coding Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper meta tags for viewport and charset
- Keep structure simple and accessible
- Use meaningful IDs and class names (e.g., `duck-container`, `btn-yes`)

### CSS
- **Naming Convention**: Use kebab-case for class names (e.g., `duck-container`, `btn-yes`)
- **Animations**: Define all animations with `@keyframes` for smooth transitions
- **Colors**: 
  - Primary pink: `#ff1493` (DeepPink)
  - Gold for duck: `#ffd700`
  - Gradient backgrounds with pastel pinks
- **Responsive Design**: Use relative units (%, vh, vw) and flexible layouts
- **Box Model**: Always use `box-sizing: border-box`
- **Imports**: Use `@import` at the top of CSS files for external fonts

### JavaScript
- **No Frameworks**: Use vanilla JavaScript only
- **DOM Selection**: Use `getElementById` for unique elements
- **Event Handling**: Use `addEventListener` for all event bindings
- **Naming**: Use camelCase for variables and functions (e.g., `noBtnClickCount`, `createFallingHearts`)
- **Comments**: Add descriptive comments for complex logic or fun features
- **Animation Cleanup**: Always remove dynamically created elements after animations complete to prevent memory leaks
- **Timing**: Use `setTimeout` for delayed actions and animation sequences

### Animations
- Use CSS animations for visual effects (floating, falling, bouncing)
- JavaScript should only trigger animations by adding/removing classes
- Animation durations should be coordinated between CSS and JavaScript timeouts
- Clean up animated elements after they finish to prevent memory leaks

### Accessibility
- Decorative icons and emojis should have `aria-hidden="true"` when used purely for decoration
- Interactive elements should have proper focus states
- Ensure sufficient color contrast for text

### Code Organization
- Keep all JavaScript in `script.js`
- Keep all styles in `style.css`
- Avoid inline styles in HTML (use classes instead)
- Group related CSS rules together (e.g., all duck-related styles in one section)

## Interactive Features
- **Yes Button**: Triggers celebration, creates floating hearts, makes duck happy
- **No Button**: Uses `mouseenter` event to run away from cursor, grows Yes button progressively, changes text at counts 3, 5, and 7
- **Duck Animation**: Reacts to user choices with happy/sad states

## Development Workflow

### Local Development
To run the project locally:
```bash
# Open index.html directly in browser, or use a local server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Testing
- Test all interactive elements manually in a browser
- Verify animations work smoothly across different browsers
- Check responsive design on mobile devices
- Ensure duck animations trigger correctly

### Deployment
- Automatically deployed to GitHub Pages on push to main branch
- Deployment handled by `.github/workflows/pages.yml`
- No build step required - static files deployed directly

## Best Practices
- Keep the code simple and maintainable
- Use meaningful variable and function names
- Add comments to explain interactive behaviors
- Test interactive features thoroughly before committing
- Maintain the playful, romantic theme throughout
- Ensure animations are smooth and don't impact performance
- Always clean up dynamically created elements

## Common Patterns

### Creating Animated Elements
```javascript
const element = document.createElement('div');
element.className = 'animated-class';
element.textContent = '❤️';
element.style.left = Math.random() * 100 + 'vw';
document.body.appendChild(element);

// Clean up after animation
setTimeout(() => {
    element.remove();
}, animationDuration);
```

### Triggering Duck Reactions
```javascript
duck.classList.add('happy'); // or 'sad'
setTimeout(() => {
    duck.classList.remove('happy');
}, duration);
```

## Important Notes
- No build tools or dependencies needed
- Keep the project lightweight and fast
- Prioritize fun and interactivity
- Maintain cross-browser compatibility
- Use web-safe fonts or Google Fonts
