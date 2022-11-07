const endpoint = {
  http: {
    devnet: 'http://api-devnet.renec.foundation:8899',
    testnet: 'http://api-testnet.renec.foundation:8899',
    'mainnet-beta': 'http://api-mainnet-beta.renec.foundation:8899',
  },
  https: {
    devnet: 'https://api-devnet.renec.foundation:8899',
    testnet: 'https://api-testnet.renec.foundation:8899',
    'mainnet-beta': 'https://api-mainnet-beta.renec.foundation:8899',
  },
};

export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';

/**
 * Retrieves the RPC API URL for the specified cluster
 */
export function clusterApiUrl(cluster?: Cluster, tls?: boolean): string {
  const key = tls === false ? 'http' : 'https';

  if (!cluster) {
    return endpoint[key]['devnet'];
  }

  const url = endpoint[key][cluster];
  if (!url) {
    throw new Error(`Unknown ${key} cluster: ${cluster}`);
  }
  return url;
}
