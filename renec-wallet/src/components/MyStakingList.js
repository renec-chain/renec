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

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export default function MyStakingList() {
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
      <div className="bold text-20 mt-30 mb-16">Staking list</div>
      <List disablePadding>
        {StakingListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
      </List>
    </div>
  );
}

export function StakingListItem({ publicKey }) {
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
    <Card className="mb-8" onClick={() => setOpen(!open)}>
      <ListItem style={{ padding: 16 }}>
        <div className="flex space-between full-width">
          <div className='flex-1-column'>
            <div>{colappsedAddress}</div>
            <div className="flex">
              <Typography style={{ fontSize: 12 }}>Click to expand</Typography>
              <Icon icon="down" />
            </div>
          </div>
          <div className='flex-1-column'>
            <Typography style={{ fontSize: 14 }}>Unknown validator</Typography>
          </div>
          <div className='flex-1-column'>
            <Typography style={{ fontSize: 14 }}>
              {stakingFormat.format(
                (stakeActivation?.active + stakeActivation?.inactive) /
                  LAMPORTS_PER_SOL,
              )}{' '}
              RENEC
            </Typography>
          </div>
          <div>
            <Chip
              label={capitalize(stakeActivation?.state)}
              style={{
                backgroundColor:
                  stakeActivation?.state === 'active'
                    ? '#417562'
                    : '#977155',
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
    const onClick = async () => {
      return sendTransaction(unDelegateStake(), {
        onSuccess: fetchListStakes,
      });
    };

    const unDelegateStake = async () => {
      return await wallet.undelegateStake(publicKey);
    };

    if (!stakeActivation) {
      return <LoadingIndicator delay={0} />;
    }

    if (!publicKey) {
      return <LoadingIndicator delay={0} />;
    }
    return (
      <div className="px-16 py-16">
        <div className="flex space-between">
          <div className='flex-1-column'>
            <Typography style={{ fontSize: 16 }}>
              {stakingFormat.format(stakeActivation?.active / LAMPORTS_PER_SOL)}
            </Typography>
            <Typography style={{ fontSize: 12 }}>Active stake</Typography>
          </div>
          <div className='flex-1-column'>
            <Typography style={{ fontSize: 16 }}>
              {stakingFormat.format(
                stakeActivation?.inactive / LAMPORTS_PER_SOL,
              )}
            </Typography>
            <Typography style={{ fontSize: 12 }}>Inactive stake</Typography>
          </div>
          <div className='flex-1-column'>
            <Typography style={{ fontSize: 16 }}>
              {stakingFormat.format(
                (stakeActivation?.active + stakeActivation?.inactive) /
                  LAMPORTS_PER_SOL,
              )}{' '}
              RENEC
            </Typography>
            <Typography style={{ fontSize: 12 }}>Stake Balance</Typography>
          </div>
          <div>
            <Chip
              label={capitalize(stakeActivation?.state)}
              style={{
                backgroundColor:
                  stakeActivation?.state === 'active'
                    ? '#417562'
                    : '#977155',
                color: '#FFF',
                borderRadius: 4,
              }}
              size="small"
            />
          </div>
        </div>
        <Button
          className="mt-24"
          style={{
            padding: '8px 15px',
            backgroundColor: '#765EBC',
            color: '#FFF',
            borderRadius: '4px',
          }}
          onClick={onClick}
        >
          Undelegate
        </Button>
      </div>
    );
  },
);
