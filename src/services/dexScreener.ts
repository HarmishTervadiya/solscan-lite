import { DexScreenerResponse } from "@/types";

export const getPairFromDexScreener = async (mint: string) => {
  try {
    // dexscreener api - free, no auth required
    const url = `https://api.dexscreener.com/latest/dex/tokens/${mint}`;
    console.log("[TokenDetail] API URL:", url);

    const res = await fetch(url);
    console.log("[TokenDetail] Response status:", res.status);

    if (!res.ok) {
      console.log("[TokenDetail] Response not OK:", res.status, res.statusText);
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data: DexScreenerResponse = await res.json();
    console.log("[TokenDetail] Response data:", JSON.stringify(data, null, 2));
    console.log("[TokenDetail] Pairs count:", data.pairs?.length || 0);

    return data;
  } catch (error: any) {
    console.log("[TokenDetail] Error:", error.message);
  }
};
