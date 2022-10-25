import React, { useMemo, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  useBalanceInfo,
  useWalletPublicKeys,
  useWalletVoteAccounts,
} from '../utils/wallet';
import LoadingIndicator from './LoadingIndicator';
import { Button, Tooltip } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CreateStakingDialog from './CreateStakingDialog';
import { usePage } from '../utils/page';
import { useStyles } from './BalancesList';
import { computeHash } from '../utils/utils';
import { stakingFormat } from '../utils/utils';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
const DEFAULT_ICONS_COUNT = 17;

export default function StakingList() {
  const classes = useStyles();
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
        <div className={classes.stakingHeader}>Validators staking list</div>
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
        {StakingListItemsMemo.map((Memoized, index) => (
          <Memoized key={index.toString()} />
        ))}
        {loaded ? null : <LoadingIndicator />}
      </List>
    </div>
  );
}

export function StakingListItem({ voteAccount }) {
  const classes = useStyles();
  const { votePubkey, nodePubkey } = voteAccount;
  const [publicKeys] = useWalletPublicKeys();
  const mainPubkey = publicKeys[0];
  const balanceInfo = useBalanceInfo(mainPubkey);
  const computeImageIndex = (computeHash(votePubkey) % DEFAULT_ICONS_COUNT) + 1;
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
    <Card className={classes.item}>
      <ListItem style={{ padding: 16 }}>
        <ListItemIcon>
          <img
            alt=""
            style={{ height: '32px' }}
            src={require(`../img/svgs/${computeImageIndex}.svg`)?.default}
          />
        </ListItemIcon>
        <div className={classes.stakingItemContainer}>
          <div className={classes.stakingItem}>
            <div className={classes.text}>
              {`NodePubKey:  ${nodePubkey.substring(
                0,
                6,
              )}... ${nodePubkey.substring(
                nodePubkey.length - 6,
                nodePubkey.length - 1,
              )}` || ''}
            </div>
            <div className={classes.normalText}>{colappsedAddress}</div>
          </div>
          <div className={classes.stakingItem}>
            <div className={classes.text}>Active Stake</div>
            <div className={classes.normalText}>
              {stakingFormat.format(
                voteAccount.activatedStake / LAMPORTS_PER_SOL,
              )}
            </div>
          </div>
          <div className={classes.stakingItem}>
            <div className={`${classes.text} flex align-center`}>
              Fee
              <Tooltip
                title="The percentage fee paid to validators"
                placement="top-start"
              >
                <ErrorOutline fontSize="small" className={`ml-4`} />
              </Tooltip>
            </div>
            <div className={classes.normalText}>{voteAccount.commission}%</div>
          </div>
          <div className="mr-24">
            <Button
              onClick={() => setOpenStaking(true)}
              variant="outlined"
              className={classes.text}
            >
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
