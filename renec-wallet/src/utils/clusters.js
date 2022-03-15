import { clusterApiUrl } from '@solana/web3.js';
import { MAINNET_URL, MAINNET_BACKUP_URL } from '../utils/connection';

export const CLUSTERS = [
  // {
  //   name: 'mainnet-beta',
  //   apiUrl: MAINNET_URL,
  //   label: 'Mainnet Beta',
  //   clusterSlug: 'mainnet-beta',
  // },
  {
    name: 'testnet',
    apiUrl: "http://54.163.176.84:8899",
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
