# Vanilla Gambling App

A simple red/black gambling simulator built with vanilla HTML, CSS, and JavaScript. 'Fairer' version of stardew (the game) gambling wheel, since apparently green is 75% probability vs orange.

## Overview

This project was created to experiment with Amazon Q Developer's Claude Sonnet 4 agent mode capabilities. The entire application was developed through conversational AI assistance, demonstrating how modern AI tools can help build functional web applications.

## Features

- **Token System**: Start with 100 tokens
- **Multiple Betting Strategies**:
  - **Bet Half**: Bets half of current tokens
  - **Martingale**: Bets 1/15 of current tokens, doubles on loss (max 3 consecutive losses)
  - **Custom Amount**: Bet any amount you specify
  - **Auto Bet**: Automated betting until +1000 tokens gained
- **Live Updates**: Real-time token display with 300ms intervals during auto-betting
- **Bet History**: Sidebar showing all previous bets with win/loss tracking
- **Game Over**: "You Lose" screen when tokens ≤ 1

## Files

- `index.html` - Main HTML structure and styling
- `script.js` - All game logic and functionality

## How to Play

1. Open `index.html` in a web browser
2. Choose your betting strategy
3. Watch your tokens change with each 50/50 bet
4. Reset when you lose or want to start over

## Betting Logic

- **50/50 odds** for all bets (red/black simulation)
- **Martingale protection**: Disabled after 3 consecutive losses, re-enabled on any win
- **Auto-bet intelligence**: Uses martingale when tokens ≥ 100, otherwise bet half
- **Stop conditions**: Auto-bet stops at +1000 tokens or game over

## Development Notes

This project showcases the capabilities of AI-assisted development using Amazon Q Developer's agent mode. The entire codebase was created through iterative conversations, demonstrating how AI can help translate requirements into functional code while maintaining clean, readable implementations.
