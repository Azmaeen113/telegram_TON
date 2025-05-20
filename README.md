# TON Tapper - Telegram Mini App Game

A tap-to-earn game built as a Telegram Mini App that allows users to earn TON cryptocurrency by tapping targets.

## Project info

**URL**: https://lovable.dev/projects/0a6ba840-e421-44de-84ba-679a0b9cd1f1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0a6ba840-e421-44de-84ba-679a0b9cd1f1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0a6ba840-e421-44de-84ba-679a0b9cd1f1) and click on Share -> Publish.

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

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
