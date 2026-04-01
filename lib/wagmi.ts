import { createConfig, http, injected } from "wagmi";
import { base } from "wagmi/chains";

// TODO: Replace this placeholder with the actual builder code data suffix
// once the encoded builder code value is provided for production attribution.
const BUILDER_CODE_DATA_SUFFIX = undefined;

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
  },
  ssr: true,
});

export { BUILDER_CODE_DATA_SUFFIX };
