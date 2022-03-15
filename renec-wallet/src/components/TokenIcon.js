import React, { useState } from 'react';

export default function TokenIcon({ mint, url, tokenName, size = 20, ...props }) {
  const [hasError, setHasError] = useState(false);

  if (!url && mint === null) {
    url = 'logo192.png';
  }

  if (hasError || !url) {
    return null;
  }

  return (
    <img
      src={url}
      title={tokenName}
      alt={tokenName}
      style={{
        width: size,
        height: size,
        backgroundColor: 'white',
        borderRadius: size / 2,
      }}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
