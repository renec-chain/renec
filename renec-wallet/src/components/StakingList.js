import React, { useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  useBalanceInfo,
  useWalletPublicKeys,
} from '../utils/wallet';
import LoadingIndicator from './LoadingIndicator';
import { Button } from '@material-ui/core';
import { abbreviateAddress } from '../utils/utils';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TokenIcon from './TokenIcon';
import Card from '@material-ui/core/Card';


export default function StakingList() {
  const [publicKeys, loaded] = useWalletPublicKeys();
  const StakingListItemsMemo = useMemo(() => {
    return publicKeys.map((pk) => {
      return React.memo((props) => {
        return (
          <StakingListItem
            key={pk.toString()}
            publicKey={pk}
          />
        );
      });
    });
  }, [publicKeys]);

  return (
    <div>

      <div className="bold text-20 mt-30 mb-16">Validators stakting list</div>
      <List disablePadding>
        {StakingListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
        {loaded ? null : <LoadingIndicator />}
      </List>

    </div>
  );
}

export function StakingListItem({ publicKey }) {
  const balanceInfo = useBalanceInfo(publicKey);

  const colappsedAddress = useMemo(() => {
    const mockAddress = "5t1wercpG3jqFWbo9PnP33UwgQJpSTkcbbfgCb1995tW"
    return `${mockAddress.substring(0, 4)}....${mockAddress.substring(mockAddress.length - 8, mockAddress.length - 1)}`
  }, [])

  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />;
  }

  let {
    mint,
    tokenName,
    tokenSymbol,
    tokenLogoUri,
  } = balanceInfo;
  tokenName = tokenName ?? abbreviateAddress(mint);


  return (
    <Card className="mb-8">
      <ListItem style={{ padding: 16 }}>
        <ListItemIcon>
          <TokenIcon
            mint={mint}
            tokenName={tokenName}
            url={tokenLogoUri}
            size={28}
          />
        </ListItemIcon>
        <div className="flex space-between full-width">
          <div>
            <div>{tokenName ?? tokenSymbol}</div>
            <div>{colappsedAddress}</div>
          </div>
          <div className="mr-24">
            <Button variant="outlined">Stake</Button>
          </div>
        </div>
      </ListItem>
    </Card>
  );
}