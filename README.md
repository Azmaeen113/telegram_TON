# TON Tapper - Telegram Mini App Game

A tap-to-earn game built as a Telegram Mini App that allows users to earn TON cryptocurrency by tapping targets.

## Project info

**URL**: https://telegramton.netlify.app

## How to run this project locally

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/Azmaeen113/telegram_TON.git

# Step 2: Navigate to the project directory
cd telegram_TON

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

You can also edit files directly in GitHub or use GitHub Codespaces for development.

## Features

- **High Performance Game Engine**: Maintains 60 FPS with optimized animations and rendering
- **Telegram Mini Apps Integration**: Uses the latest Telegram Mini Apps SDK (v6.0+)
- **Responsive Design**: Works on all mobile devices with screens from 320px to 1080px
- **Theme Adaptation**: Automatically adapts to Telegram's light and dark themes
- **Haptic Feedback**: Provides tactile feedback for a better gaming experience
- **Combo System**: Rewards quick tapping with combo multipliers
- **TON Integration**: Convert in-game points to TON cryptocurrency

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Telegram Mini Apps SDK
- Zustand for state management

## How to deploy this project

## Testing in Telegram

### Local Testing

1. Create a bot using [@BotFather](https://t.me/BotFather) in Telegram
2. Set up your bot's web app URL to point to your local development server
3. Use ngrok or a similar tool to expose your local server:
```bash
ngrok http 8080
```
4. Update your bot's web app URL with the ngrok URL

### Production Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the contents of the `dist` folder to your hosting provider
3. Update your bot's web app URL to point to your production URL

## Performance Optimizations

- **Hardware Acceleration**: Uses CSS transforms and opacity for smooth animations
- **requestAnimationFrame**: Implements game loop with delta time for consistent performance
- **Touch Handling**: Optimized touch events to prevent scrolling and improve responsiveness
- **Asset Optimization**: Minimizes asset sizes and uses inline SVGs where possible
- **Memory Management**: Implements proper cleanup for event listeners and animations

## Current Deployment

This app is currently deployed at [telegramton.netlify.app](https://telegramton.netlify.app) and is accessible as a Telegram Mini App.
