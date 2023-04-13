import {expect} from 'chai';

import {clusterApiUrl} from '../src/util/cluster';

describe('Cluster Util', () => {
  it('invalid', () => {
    expect(() => {
      clusterApiUrl('abc123' as any);
    }).to.throw();
  });

  it('devnet', () => {
    expect(clusterApiUrl()).to.eq('https://api-devnet.renec.foundation:8899');
    expect(clusterApiUrl('devnet')).to.eq(
      'https://api-devnet.renec.foundation:8899',
    );
    expect(clusterApiUrl('devnet', true)).to.eq(
      'https://api-devnet.renec.foundation:8899',
    );
    expect(clusterApiUrl('devnet', false)).to.eq(
      'http://api-devnet.renec.foundation:8899',
    );
  });
});
