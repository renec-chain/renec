import React, { useEffect, useMemo, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useWallet } from '../utils/wallet';
import LoadingIndicator from './LoadingIndicator';
import { Button, Chip, Collapse, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Icon } from './base';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useSendTransaction } from '../utils/notifications';
import { useStaking } from '../utils/staking';
import { stakingFormat } from '../utils/utils';
import { useStyles } from './BalancesList';
import { makeStyles } from '@material-ui/styles';

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export default function MyStakingList() {
  const classes = useStyles();
  const wallet = useWallet();
  const {
    state: { publicKeys },
    listStakes,
  } = useStaking();
  const StakingListItemsMemo = useMemo(() => {
    return (publicKeys || []).map((publicKey, index) => {
      return React.memo((props) => {
        return (
          <StakingListItem
            key={publicKey.toString() || index.toString()}
            publicKey={publicKey}
          />
        );
      });
    });
  }, [publicKeys]);

  useEffect(() => {
    const fetchListStakes = async () => {
      const stakeAccountInfo = await wallet.listStakes();
      const publicKeys = stakeAccountInfo
        ? stakeAccountInfo.map(({ pubkey }) => pubkey)
        : [];
      listStakes(publicKeys);
    };

    fetchListStakes();
  }, []);

  return (
    <div>
      <div className={classes.textHeader}>My staking list</div>
      <List disablePadding>
        {StakingListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
      </List>
    </div>
  );
}

const myStakingUseStyles = makeStyles((theme) => ({
  itemTitle: {
    fontSize: 16,
    color: theme.palette.my_staking_text.main,
  },
  itemSubTitle: {
    fontSize: 14,
    color: theme.palette.my_staking_text.main,
  },
  iconText: {
    fontSize: 12,
    color: theme.palette.my_staking_text.main,
  },
}));

export function StakingListItem({ publicKey }) {
  const classes = useStyles();
  const myStakingClasses = myStakingUseStyles();
  const [open, setOpen] = useState(false);
  const wallet = useWallet();
  const { addItem } = useStaking();
  const colappsedAddress = useMemo(() => {
    return `${publicKey
      ?.toString()
      .substring(0, 4)}....${publicKey
      ?.toString()
      .substring(
        publicKey?.toString().length - 5,
        publicKey?.toString().length - 1,
      )}`;
  }, [publicKey]);
  const [stakeActivation, setStakeActivation] = useState(null);

  useEffect(() => {
    const getStakeActivation = async () => {
      const data = await wallet.getStakeActivation(publicKey);
      setStakeActivation(data);
      addItem(data);
    };
    getStakeActivation();
  }, []);

  if (!publicKey) {
    return <LoadingIndicator delay={0} />;
  }

  return (
    <Card className={classes.item} onClick={() => setOpen(!open)}>
      <ListItem style={{ padding: 16 }}>
        <div className="flex space-between full-width">
          <div className="flex-1-column">
            <div
              className={`${classes.normalText} ${myStakingClasses.itemTitle}`}
            >
              {colappsedAddress}
            </div>
            <div className="flex">
              <Typography
                className={`${classes.normalText} ${myStakingClasses.iconText}`}
              >
                Click to expand
              </Typography>
              <Icon icon="down" />
            </div>
          </div>
          <div className="flex-1-column">
            <Typography
              className={`${classes.normalText} ${myStakingClasses.itemTitle}`}
            >
              Unknown validator
            </Typography>
          </div>
          <div className="flex-1-column">
            <Typography
              className={`${classes.normalText} ${myStakingClasses.itemSubTitle}`}
            >
              {stakingFormat.format(
                (stakeActivation?.active + stakeActivation?.inactive) /
                  LAMPORTS_PER_SOL,
              )}{' '}
              RENEC
            </Typography>
          </div>
          <div className="flex-05-column">
            <Chip
              label={capitalize(stakeActivation?.state)}
              style={{
                backgroundColor:
                  stakeActivation?.state === 'active' ? '#417562' : '#977155',
                color: '#FFF',
                borderRadius: 4,
              }}
              size="small"
            />
          </div>
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MyStakingListItemDetails
          stakeActivation={stakeActivation}
          publicKey={publicKey}
        />
      </Collapse>
    </Card>
  );
}

const MyStakingListItemDetails = React.memo(
  ({ stakeActivation, publicKey }) => {
    const classes = useStyles();
    const myStakingClasses = myStakingUseStyles();
    const wallet = useWallet();
    const { listStakes, setItem } = useStaking();
    const [sendTransaction] = useSendTransaction();
    const fetchListStakes = async () => {
      const stakeAccountInfo = await wallet.listStakes();
      const publicKeys = stakeAccountInfo
        ? stakeAccountInfo.map(({ pubkey }) => pubkey)
        : [];
      setItem();
      listStakes(publicKeys);
    };
    const onClickUndelegate = React.useCallback(async () => {
      return sendTransaction(unDelegateStake(), {
        onSuccess: fetchListStakes,
      });
    }, []);

    const onClickWithdraw = React.useCallback(async () => {
      return sendTransaction(withdrawStake(), {
        onSuccess: fetchListStakes,
      });
    }, []);

    const unDelegateStake = async () => {
      return await wallet.undelegateStake(publicKey);
    };

    const withdrawStake = async () => {
      return await wallet.withdrawStake(publicKey);
    };

    const renderButton = React.useMemo(() => {
      switch (stakeActivation?.state) {
        case 'active':
        case 'activating':
          return (
            <Button
              className="mt-24"
              style={{
                padding: '8px 15px',
                backgroundColor: '#765EBC',
                color: '#FFF',
                borderRadius: '4px',
              }}
              onClick={onClickUndelegate}
            >
              Undelegate
            </Button>
          );
        case 'inactive':
          return (
            <Button
              className="mt-24"
              style={{
                padding: '8px 15px',
                backgroundColor: '#765EBC',
                color: '#FFF',
                borderRadius: '4px',
              }}
              onClick={onClickWithdraw}
            >
              Withdraw
            </Button>
          );
        default:
          break;
      }
    }, [stakeActivation?.state, onClickWithdraw, onClickUndelegate]);

    if (!stakeActivation) {
      return <LoadingIndicator delay={0} />;
    }

    if (!publicKey) {
      return <LoadingIndicator delay={0} />;
    }

    return (
      <div className="px-16 py-16">
        <div className="flex space-between">
          <div className="flex-1-column">
            <Typography
              className={`${classes.normalText} ${myStakingClasses.itemTitle}`}
            >
              {stakingFormat.format(stakeActivation?.active / LAMPORTS_PER_SOL)}
            </Typography>
            <Typography
              className={`${classes.normalText} ${myStakingClasses.iconText}`}
            >
              Active stake
            </Typography>
          </div>
          <div className="flex-1-column">
            <Typography
              className={`${classes.normalText} ${myStakingClasses.itemTitle}`}
            >
              {stakingFormat.format(
                stakeActivation?.inactive / LAMPORTS_PER_SOL,
              )}
            </Typography>
            <Typography
              className={`${classes.normalText} ${myStakingClasses.iconText}`}
            >
              Inactive stake
            </Typography>
          </div>
          <div className="flex-1-column">
            <Typography
              className={`${classes.normalText} ${myStakingClasses.itemTitle}`}
            >
              {stakingFormat.format(
                (stakeActivation?.active + stakeActivation?.inactive) /
                  LAMPORTS_PER_SOL,
              )}{' '}
              RENEC
            </Typography>
            <Typography
              className={`${classes.normalText} ${myStakingClasses.iconText}`}
            >
              Stake Balance
            </Typography>
          </div>
          <div className="flex-05-column"></div>
        </div>
        {renderButton}
      </div>
    );
  },
);
