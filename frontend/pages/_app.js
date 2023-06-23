import "@rainbow-me/rainbowkit/styles.css";
// import "@/styles/globals.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "viem/chains";
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains([sepolia], [publicProvider()])

const { connectors } = getDefaultWallets({
    appName: "CryptoDevs DAO",
    projectId: "5e69030c3dc7890a548d824b889573c6",
    chains
})

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

export default function App({ Component, pageProps }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}