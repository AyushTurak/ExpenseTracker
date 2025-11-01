# Progressive Web App (PWA) Setup Guide

## Overview

ExpenseTracker is now a full Progressive Web App with offline functionality, app installation support, and intelligent caching strategies.

## Features Implemented

### 1. App Installation Prompts

#### Automatic Popup
- Appears automatically 2 seconds after first meaningful page load
- Shows a friendly installation card at the bottom of the screen
- Users can install, dismiss, or close the prompt
- Dismissal is remembered (not shown again for 30 days)

#### Dashboard Install Button
- "Install App" button on the Dashboard (right side of header)
- Only visible when the app is installable and not already installed
- Provides persistent access to installation prompt

### 2. Offline Support

#### Service Worker
- Automatically installed and activated on first visit
- Handles all fetch requests with intelligent strategies:
  - **Network First (API Calls)**: Tries network first, falls back to cache
  - **Cache First (Static Assets)**: Uses cache, fetches fresh in background
  - **Stale While Revalidate (Pages)**: Serves cache immediately, updates in background

#### Offline Fallback Page
- Users see `/public/offline.html` when completely offline
- Shows what features are available offline
- Provides helpful actions and status updates

#### Local Data Access
- Cached data is available offline for:
  - Transaction history
  - Account balances
  - Analytics and reports
  - Categories
  - Past page views

### 3. PWA Assets

#### Manifest File
- **Location**: `/public/manifest.json`
- **Contains**:
  - App name and short name
  - App description
  - Theme colors
  - Icons (192x512px, maskable icons)
  - App shortcuts
  - Display mode (standalone)

#### Icons
- `icon-192.png`: 192x192 app icon (small devices)
- `icon-512.png`: 512x512 app icon (large devices)
- `icon-maskable-192.png`: Maskable icon for adaptive display
- `icon-maskable-512.png`: Maskable icon for adaptive display
- `apple-touch-icon.png`: iOS home screen icon

#### Caching Strategy
```
Service Worker Cache Structure:
├── expense-tracker-v1 (Main/HTML cache)
├── expense-tracker-assets-v1 (Fonts, images, static files)
└── expense-tracker-api-v1 (API responses)
```

## Browser Support

### Full PWA Support
- Chrome/Edge 39+ (Desktop & Mobile)
- Firefox 92+
- Samsung Internet 4+
- Opera 26+

### Partial Support
- Safari 11.1+ (Limited)
- iOS Safari (Add to Home Screen only)

## Installation Methods

### Desktop
1. **Chrome/Edge**:
   - Click the install button in address bar
   - Or use dashboard "Install App" button
   - Or right-click → "Install app"

2. **Firefox**:
   - Click the install button when prompted
   - Or install from "Add-ons and themes"

### Mobile
1. **Android**:
   - Chrome: "Install app" or "Add to Home screen"
   - Firefox: "Install" button
   - Samsung Internet: "Add to Home screen"

2. **iOS**:
   - Tap Share → "Add to Home Screen"
   - App will show in standalone mode
   - Uses apple-touch-icon.png

## Configuration Files

### manifest.json
```json
{
  "name": "ExpenseTracker - Smart Personal Finance Management",
  "short_name": "ExpenseTracker",
  "display": "standalone",
  "start_url": "/",
  "scope": "/",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "icons": [...],
  "shortcuts": [...]
}
```

### vite.config.ts
Uses `vite-plugin-pwa` with:
- Auto-update service worker
- Workbox configuration
- Smart caching rules
- Manifest auto-generation

### Service Worker (`public/sw.js`)
Handles:
- Asset caching
- API response caching
- Offline fallback
- Cache cleanup
- Update notifications

## Offline Capabilities

When offline, users can:
- View cached transactions
- Check account balance
- Review analytics
- Browse categories
- Access previously loaded pages

### Data Sync on Reconnect
- Service worker automatically attempts network requests
- Updates cache when connection restored
- Stale data is refreshed in background

## Customization

### Change App Colors
1. Update `theme_color` in `public/manifest.json`
2. Update `theme_color` in `vite.config.ts`
3. Update meta tag in `index.html`:
   ```html
   <meta name="theme-color" content="#2563eb" />
   ```
4. Regenerate icons to match

### Update Icons
1. Replace icon files in `/public`:
   - `icon-192.png`
   - `icon-512.png`
   - `icon-maskable-192.png`
   - `icon-maskable-512.png`
   - `apple-touch-icon.png`

2. Update manifest shortcuts if needed

### Modify Cache Strategy
Edit `public/sw.js` to change:
- Cache retention time
- URL patterns for different strategies
- Cache size limits

### Update Offline Page
Edit `/public/offline.html` to customize:
- Offline experience
- Feature list
- Support information

## Implementation Details

### Install Prompt Hook
**File**: `src/hooks/useInstallPrompt.ts`

```typescript
const { isInstallable, isInstalled, showPrompt, deferredPrompt } = useInstallPrompt();

// Check if app can be installed
if (isInstallable) {
  // Show install button
}

// Trigger install when user clicks
await showPrompt();
```

### Install Prompt Component
**File**: `src/components/pwa/InstallPrompt.tsx`

- Auto-shows after 2 seconds on first load
- Dismissible with localStorage flag
- Shows installation success toast
- Responds to installation outcome

### Dashboard Integration
**File**: `src/pages/Dashboard.tsx`

- Install button added to header
- Shows only when installable
- Calls install prompt on click

## Testing PWA Locally

### Using Vite Dev Server
```bash
npm run dev
```
Service worker enabled in dev mode with hot reload.

### Production Build
```bash
npm run build
```
Creates optimized PWA bundle with:
- Minified assets
- Compressed caches
- Hashed filenames
- Service worker manifest

### Testing Tools
1. **Chrome DevTools**:
   - Application → Manifest
   - Application → Service Workers
   - Lighthouse (PWA audit)

2. **Firefox Developer Tools**:
   - Storage → Service Workers
   - Accessibility → Manifest

3. **Online Tools**:
   - https://www.pwabuilder.com/
   - https://web.dev/measure/

## Deployment

### Vercel
PWA should work out of the box:
1. Build creates `dist/` with all PWA files
2. Service worker (`sw.js`) is cached
3. Manifest and icons are served

### Netlify
Ensure proper cache headers:
```toml
[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "max-age=0, no-cache, no-store, must-revalidate"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Cache-Control = "max-age=3600"

[[headers]]
  for = "/icon-*.png"
  [headers.values]
    Cache-Control = "max-age=31536000"
```

### Other Platforms
1. Serve with HTTPS (PWA requirement)
2. Serve manifest.json with correct MIME type
3. Set correct cache headers for service worker
4. Ensure icons are accessible

## Performance

### Build Output
- Service worker: ~2KB gzipped
- Manifest: <1KB
- Icons: Variable per size
- Total PWA overhead: ~5-10KB

### Runtime Performance
- Service worker processes fetch events
- Cache lookups are fast (<100ms)
- Network requests use background updates
- Offline pages load instantly from cache

## Troubleshooting

### Service Worker Not Registering
1. Check HTTPS is enabled
2. Verify `/sw.js` is accessible
3. Check browser console for errors
4. Clear browser cache and reload

### Install Prompt Not Showing
1. Must be HTTPS
2. Must have manifest.json
3. Must have icons
4. Must not be already installed
5. Check browser requirements

### Offline Page Not Showing
1. Verify `/offline.html` exists
2. Check service worker status
3. Ensure offline.html is cached
4. Check network in DevTools

### Cache Not Updating
1. Check service worker is active
2. Verify cache version hasn't changed
3. Force reload (Ctrl+Shift+R or Cmd+Shift+R)
4. Clear site data and reinstall

## Security

### Service Worker Safety
- Only fetches from same origin
- Validates all responses
- Handles errors gracefully
- No sensitive data in cache

### PWA Permissions
- No special permissions required
- Users explicitly install
- Can be uninstalled anytime
- Works offline securely

## References

- [MDN PWA Documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
