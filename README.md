# Shine Bright, Tal ✨💎

A birthday web app for Tal's 24th birthday (March 25th).

## Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

### Option 1: Manual deploy

```bash
npm run build
npm run deploy
```

### Option 2: GitHub Actions (automatic on push to main)

1. Create a repo on GitHub: `Shine-Bright-Tal`
2. Push the code:
   ```bash
   git remote add origin git@github.com:avi-alima/Shine-Bright-Tal.git
   git push -u origin main
   ```
3. Go to repo **Settings > Pages** and set Source to **GitHub Actions**
4. Every push to `main` will auto-deploy

## Features

- **Pre-Birthday:** Animated countdown to March 25th
- **Birthday Mode:** Confetti, photo memories, affection vouchers, diamond section
- **Dev Tools:** Toggle between modes (bottom-right corner)

## TODO

- [ ] Add actual photos to the photo grid
- [ ] Implement the "Big Surprise" feature
- [ ] Integrate a specific song into the Diamond section
- [ ] Add diamond earrings reveal animation
