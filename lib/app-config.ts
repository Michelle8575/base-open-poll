import { Attribution } from "ox/erc8021";

export const APP_NAME = "base-open-poll";
export const SITE_URL = "https://base-open-poll.vercel.app";
export const BASE_APP_ID = "69cc85f697b57b22030486e9";
export const TALENT_VERIFICATION =
  "c72e1997b2a5f7c751001aaf5fe9122349136a041df6c64c06cd757abb94722c9ac31eeb56c47c32b9d1df209346c1e29836d4403d9167139361adee2266fc4e";

export const BUILDER_CODE = "bc_cx2d8s32";
export const BUILDER_CODE_DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE],
});

// Using the Base app id here keeps the custom dashboard tracking aligned with
// the registered app identity that Base.dev verifies against.
export const TRACKING_APP_ID = BASE_APP_ID;
