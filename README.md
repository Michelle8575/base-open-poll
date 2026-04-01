# base-open-poll

Open public voting mini app for Base.

## Production

- Site: `https://base-open-poll.vercel.app`
- GitHub: `https://github.com/Michelle8575/base-open-poll`
- Contract: `0x348cb3a013e92bfa6be3dda090f449886c9edd1e`
- Base app id: `69cc85f697b57b22030486e9`
- Builder code: `bc_cx2d8s32`
- ERC-8021 suffix: `0x62635f63783264387333320b0080218021802180218021802180218021`

## Routes

- `/`
- `/vote`
- `/poll/base-open-poll`
- `/my`
- `/leaderboard`

## Attribution Notes

- Wagmi app-level `dataSuffix` is configured in `lib/wagmi.ts`
- Shared app identity constants are in `lib/app-config.ts`
- Transaction dashboard tracking is sent from `components/CastVoteButton.tsx`
- Base app verification meta tags are rendered in `app/layout.tsx`
