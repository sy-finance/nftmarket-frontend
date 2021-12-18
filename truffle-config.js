const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider({
  privateKeys: [''], // your privkey for deployment
  providerOrUrl: 'https://rpc.ftm.tools/'
});

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    ftmscan: "" // ftmscan api key
  },
  networks: {
    mainnet: {
      provider: () => provider,
      network_id: "250"
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.7", 
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
