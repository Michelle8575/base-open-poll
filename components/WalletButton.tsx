"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address?: string) {
  if (!address) return "Connect Wallet";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const injected = connectors[0];

  if (isConnected) {
    return (
      <button className="wallet-button" type="button" onClick={() => disconnect()}>
        <span className="micro-copy">Connected</span>
        <strong>{shortAddress(address)}</strong>
      </button>
    );
  }

  return (
    <button
      className="wallet-button"
      type="button"
      onClick={() => injected && connect({ connector: injected })}
      disabled={!injected || isPending}
    >
      <span className="micro-copy">Base Wallet</span>
      <strong>{isPending ? "Connecting..." : shortAddress(address)}</strong>
    </button>
  );
}
