import { createConfig, http, injected } from "wagmi";
import { base } from "wagmi/chains";
import { BUILDER_CODE, BUILDER_CODE_DATA_SUFFIX } from "@/lib/app-config";

// Base Builder Code attribution for ERC-8021 / dataSuffix tracking.
// Builder code: bc_cx2d8s32
// Data suffix provided by Base.dev and appended automatically to all transactions.
export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
  },
  dataSuffix: BUILDER_CODE_DATA_SUFFIX,
  ssr: true,
});

export { BUILDER_CODE, BUILDER_CODE_DATA_SUFFIX };
