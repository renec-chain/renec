import { clusterApiUrl } from '@solana/web3.js';

export const CLUSTERS = [
  {
    name: 'mainnet-beta',
    apiUrl: "https://api-mainnet-beta.renec.foundation:8899",
    label: 'Mainnet Beta',
    clusterSlug: 'mainnet-beta',
  },
  {
    name: 'testnet',
    apiUrl: "https://api-testnet.renec.foundation:8899",
    label: 'Testnet',
    clusterSlug: 'testnet',
  },
];

export function clusterForEndpoint(endpoint) {
  return getClusters().find(({ apiUrl }) => apiUrl === endpoint);
}

const customClusterConfigKey = "customClusterConfig";

export function addCustomCluster(name, apiUrl) {
  const stringifiedConfig = JSON.stringify({name: name, label: name, apiUrl: apiUrl, clusterSlug: null});
  localStorage.setItem(customClusterConfigKey, stringifiedConfig);
}

export function customClusterExists() {
  return !!localStorage.getItem(customClusterConfigKey)
}

export function getClusters() {
  const stringifiedConfig = localStorage.getItem(customClusterConfigKey);
  const config = stringifiedConfig ? JSON.parse(stringifiedConfig) : null;
  return  config ? [...CLUSTERS, config] : CLUSTERS;
}
