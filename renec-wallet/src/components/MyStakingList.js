import React, { useCallback, useEffect, useMemo, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useWallet } from '../utils/wallet';
import LoadingIndicator from './LoadingIndicator';
import { Button, Chip, Collapse, Link, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Icon } from './base';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useSendTransaction } from '../utils/notifications';
import { useStaking } from '../utils/staking';
import { stakingFormat } from '../utils/utils';
import { useStyles } from './BalancesList';
import { makeStyles } from '@material-ui/styles';
import { useSolanaExplorerUrlSuffix } from '../utils/connection';
import ConfirmDialog from './base/molecules/confirm-dialog';
import { useModalState } from '../utils/custom-hooks';
import { useTranslation } from 'react-i18next';

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export default function MyStakingList() {
  const classes = useStyles();
  const { t } = useTranslation();
  const wallet = useWallet();
  const { setItem } = useStaking();
  const {open, onClose, onOpen} = useModalState();
  const [pendingUndelegate, setPendingUndelegate] = useState(null)
  const [sendTransaction] = useSendTransaction();

  const fetchListStakes = async () => {
    const stakeAccountInfo = await wallet.listStakes();
    const publicKeys = stakeAccountInfo
      ? stakeAccountInfo.map(({ pubkey }) => pubkey)
      : [];
    setItem();
    listStakes(publicKeys);
  };

  const {
    state: { publicKeys },
    listStakes,
  } = useStaking();

  const onClickUndelegate = (publicKey) => {
    onOpen()
    setPendingUndelegate(publicKey)
  }

  const onConfirmUndelegate = async () => {
    setPendingUndelegate(null)
    onClose()
    return sendTransaction(unDelegateStake(pendingUndelegate), {
      onSuccess: fetchListStakes,
    });
  }

  const onClickWithdraw = React.useCallback(async (publicKey) => {
    return sendTransaction(withdrawStake(publicKey), {
      onSuccess: fetchListStakes,
    });
  }, []);

  const unDelegateStake = async (publicKey) => {
    return await wallet.undelegateStake(publicKey);
  };

  const withdrawStake = async (publicKey) => {
    return await wallet.withdrawStake(publicKey);
  };

  const StakingListItemsMemo = useMemo(() => {
    return (publicKeys || []).map((publicKey, index) => {
      return React.memo((props) => {
        return (
          <StakingListItem
            key={publicKey.toString() || index.toString()}
            publicKey={publicKey}
            onClickUndelegate={onClickUndelegate}
            onClickWithdraw={onClickWithdraw}
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
      <div className={classes.textHeader}>{t('my_staking_list')}</div>
      <List data-testid="staking-list" disablePadding>
        {StakingListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
      </List>
      <ConfirmDialog
        title={t('confirm_undelegate')}
        warningMessage={t('confirm_undelegate_warning')}
        open={open}
        testID="confirm-undelegate-dialog"
        onClose={() => {
          setPendingUndelegate(null);
          onClose();
        }}
        onConfirm={onConfirmUndelegate}
      />
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
  linkText: {
    fontSize: 16,
    color: theme.palette.link.main,
  },
}));

export const StakingListItem = ({
  publicKey,
  onClickUndelegate,
  onClickWithdraw,
}) => {
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const classes = useStyles();
  const { t } = useTranslation();
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
    <Card className={`${classes.item} my-staking-item`} onClick={() => setOpen(!open)}>
      <ListItem style={{ padding: 16 }}>
        <div className="flex space-between full-width">
          <div className="flex-1-column">
            <Link
              href={
                `https://explorer.renec.foundation/address/${publicKey}` +
                urlSuffix
              }
              target="_blank"
              rel="noopener"
            >
              <div
                className={`${classes.normalText} ${myStakingClasses.linkText}`}
              >
                {colappsedAddress}
              </div>
            </Link>
            <div className="flex">
              <Typography
                className={`${classes.normalText} ${myStakingClasses.iconText}`}
              >
                {t('click_to_expand')}
              </Typography>
              <Icon icon="down" />
            </div>
          </div>
          <div className="flex-1-column">
            <Typography
              className={`${classes.normalText} ${myStakingClasses.itemTitle}`}
            >
              {t('unknown_validator')}
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
          onClickUndelegate={onClickUndelegate}
          onClickWithdraw={onClickWithdraw}
        />
      </Collapse>
    </Card>
  );
};

const MyStakingListItemDetails = React.memo(
  ({ stakeActivation, publicKey, onClickUndelegate, onClickWithdraw }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const myStakingClasses = myStakingUseStyles();

    const handleClickUndelegate = () => {
      onClickUndelegate(publicKey);
    };

    const handleClickWithdraw = () => {
      onClickWithdraw(publicKey);
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
              onClick={handleClickUndelegate}
            >
              {t('undelegate')}
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
              onClick={handleClickWithdraw}
            >
              {t('withdraw')}
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
              {t('active_stake')}
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
              {t('inactive_stake')}
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
              {t('stake_balance')}
            </Typography>
          </div>
          <div className="flex-05-column"></div>
        </div>
        {renderButton}
      </div>
    );
  },
);
