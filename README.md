# 0G RollPlay

## Multi-Game Play Platform

> **Your Gateway to Web3 Gaming:**
> A unified platform for multiple games with Play-to-Earn mechanics. Currently featuring gaming platform, with plans to expand to a full suite of casino and skill-based games. Built on Web3 infrastructure for transparency, security, and real crypto rewards.
---

## Current Features
- **Texas Hold'em Poker**: Full-featured poker rooms with real-time gameplay
- **Play-to-Earn (P2E)**: Earn real crypto rewards across all games
- **NFT Avatars**: Customizable digital identities
- **Secure Gaming**: On-chain game logic for fair, transparent gameplay
- **Token Integration**: Stake and earn with native tokens
- **Responsive Design**: Optimized for desktop and mobile

## Coming Soon
- **Expanded Game Library**: Blackjack, Roulette, Slots, and more
- **Tournament System**: Competitive events with prize pools
- **Social Features**: Friends, chat, and community features
- **Advanced P2E**: Enhanced reward mechanisms across all games


[![React](https://img.shields.io/badge/React-16.13.1-61dafb?logo=react)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Express-43853d?logo=node.js)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](#)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](#)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-black?logo=socket.io)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-purple?logo=bootstrap)](#)
[![Styled Components](https://img.shields.io/badge/Styled_Components-5.1.1-DB7093?logo=styled-components)](#)
[![Axios](https://img.shields.io/badge/Axios-1.4.0-5A29E4?logo=axios)](#)


## Quick Start

```bash
git clone https://github.com/0gProducts/0gRollplay.git
cd 0gRollplay

# Install root dependencies
npm install

# Go to the client folder and install its dependencies
cd client
npm install

# Start
npm start
```

---

## Config

- **JWT issuance** – `POST /api/auth` in `controllers/auth.js` signs a JWT with `config.JWT_SECRET_KEY` (see `SESSION_EXPIRES_IN`). The payload only contains `user.id` so you can safely extend it.
- **Client storage** – Tokens are pushed into Axios’ default headers via `client/src/helpers/setAuthToken.js`. Persist them in `localStorage`/`sessionStorage` from your auth screen and call `setAuthToken(token)` on boot.
- **Protected routes** – `middleware/auth.js` expects the token in the `x-auth-token` header and injects `req.user`. Use the middleware on any route that needs authenticated identity.

## Contributing Guidelines

### Pre-PR Checklist

- [ ] Branch is updated with `main`  
- [ ] No linting errors
- [ ] No stray console logs or unused variables  
- [ ] UI changes tested on desktop and mobile  
- [ ] Added documentation or comments where needed  
- [ ] Any new `.env` variables are documented  

### Pull Request Rules
- Use clear PR titles:
  - `feat: add tournament lobby UI`
- PR description must include:
  - What changed  
  - Why it changed  
  - How to test  
  - Screenshots for UI updates  
- Tag related issues/tasks.

## Confidentiality
This repository is proprietary to 0G AI.

