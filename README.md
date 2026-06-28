# base-open-poll

Open public voting mini app for Base.

`base-open-poll` provides a simple public polling experience with routes for voting, viewing a poll, checking personal activity, and browsing a leaderboard.

## Overview

This project is designed as a lightweight polling app for the Base ecosystem.

It includes a deployed site, a linked smart contract address, and configuration details for app identity and verification.

The application is organized around a small set of routes and shared configuration files.

## Production

- Site: `https://base-open-poll.vercel.app`
- GitHub: `https://github.com/Michelle8575/base-open-poll`
- Contract: `0x348cb3a013e92bfa6be3dda090f449886c9edd1e`
- Base app id: `69cc85f697b57b22030486e9`
- Builder code: `bc_cx2d8s32`
- ERC-8021 suffix: `0x62635f63783264387333320b0080218021802180218021802180218021`

## Features

- Public poll landing page
- Dedicated voting page
- Poll detail route for `base-open-poll`
- Personal activity page
- Leaderboard page
- Shared app identity configuration
- App verification metadata in the root layout
- Transaction dashboard tracking from the vote button component

## Routes

The app exposes the following routes:

- `/`
- `/vote`
- `/poll/base-open-poll`
- `/my`
- `/leaderboard`

## Project Structure Notes

Important implementation details are located in the following files:

- `lib/wagmi.ts`
  - Contains the app-level `dataSuffix` configuration.
- `lib/app-config.ts`
  - Contains shared app identity constants.
- `components/CastVoteButton.tsx`
  - Sends transaction dashboard tracking when a vote is cast.
- `app/layout.tsx`
  - Renders Base app verification meta tags.

## Setup

Clone the repository:

```bash
git clone https://github.com/Michelle8575/base-open-poll.git
```

Change into the project directory:

```bash
cd base-open-poll
```

Install dependencies using the package manager configured for the project:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open the local site in your browser:

```text
http://localhost:3000
```

## Usage

Visit the home page to enter the app.

Use `/vote` to access the voting flow.

Use `/poll/base-open-poll` to view the main poll route.

Use `/my` to view personal poll-related activity.

Use `/leaderboard` to view the leaderboard.

## Configuration

Before making production changes, review the shared app configuration in:

```text
lib/app-config.ts
```

Also review the Wagmi configuration in:

```text
lib/wagmi.ts
```

If the contract address, app identity, builder code, or ERC-8021 suffix changes, update the relevant configuration carefully.

## Deployment

The production deployment is available at:

```text
https://base-open-poll.vercel.app
