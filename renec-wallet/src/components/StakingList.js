import React, { useMemo, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  useBalanceInfo,
  useWalletPublicKeys,
  useWalletVoteAccounts,
} from '../utils/wallet';
import LoadingIndicator from './LoadingIndicator';
import { Button } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CreateStakingDialog from './CreateStakingDialog';
import { usePage } from '../utils/page';
import { useSendTransaction } from '../utils/notifications';

export default function StakingList() {
  const [voteAccounts, loaded] = useWalletVoteAccounts();
  const [page, setPage] = usePage();

  const StakingListItemsMemo = useMemo(() => {
    return (voteAccounts || []).map((vote, index) => {
      return React.memo((props) => {
        return (
          <StakingListItem
            key={vote.votePubkey.toString() || index.toString()}
            voteAccount={vote}
          />
        );
      });
    });
  }, [voteAccounts]);

  return (
    <div>
      <div className="flex space-between align-center mt-30 mb-16">
        <div className="bold text-20">Validators staking list</div>
        <Button
          style={{
            padding: '12px 24px',
            backgroundColor: '#765EBC',
            color: '#FFF',
            borderRadius: '4px',
            height: 48,
          }}
          onClick={() => setPage('mystaking')}
        >
          My Staking
        </Button>
      </div>
      <List disablePadding>
        {StakingListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
        {loaded ? null : <LoadingIndicator />}
      </List>
    </div>
  );
}

export function StakingListItem({ voteAccount }) {
  const { votePubkey, nodePubkey } = voteAccount;
  const [publicKeys] = useWalletPublicKeys();
  const mainPubkey = publicKeys[0];
  const balanceInfo = useBalanceInfo(mainPubkey);
  const colappsedAddress = useMemo(() => {
    return `${votePubkey.substring(0, 4)}....${votePubkey.substring(
      votePubkey.length - 8,
      votePubkey.length - 1,
    )}`;
  }, []);
  const [openStaking, setOpenStaking] = useState(false);
  if (!voteAccount) {
    return <LoadingIndicator delay={0} />;
  }
  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />;
  }
  return (
    <Card className="mb-8">
      <ListItem style={{ padding: 16 }}>
        <ListItemIcon></ListItemIcon>
        <div className="flex space-between full-width">
          <div>
            <div>
              {`NodePubKey:  ${nodePubkey.substring(
                0,
                6,
              )}... ${nodePubkey.substring(
                nodePubkey.length - 6,
                nodePubkey.length - 1,
              )}` || ''}
            </div>
            <div>{colappsedAddress}</div>
          </div>
          <div className="mr-24">
            <Button onClick={() => setOpenStaking(true)} variant="outlined">
              Stake
            </Button>
          </div>
        </div>
      </ListItem>
      <CreateStakingDialog
        open={openStaking}
        onClose={() => setOpenStaking(false)}
        votePubkey={votePubkey}
        balanceInfo={balanceInfo}
      />
    </Card>
  );
}
