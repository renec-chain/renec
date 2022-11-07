import React, { useMemo, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  useBalanceInfo,
  useWalletFetchSupply,
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
import {calculateEstimatedApr, computeHash} from '../utils/utils';
import { stakingFormat } from '../utils/utils';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { useTranslation } from 'react-i18next';
const DEFAULT_ICONS_COUNT = 17;

export default function StakingList() {
  const classes = useStyles();
  const [voteAccountsData, loaded] = useWalletVoteAccounts();
  const [page, setPage] = usePage();
  const { t } = useTranslation();

  const [supplyData] = useWalletFetchSupply()
  const totalSupply = supplyData?.value?.total

  const voteAccounts = React.useMemo(
    () => voteAccountsData?.current || [],
    [voteAccountsData]
  );

  const totalActiveStake = React.useMemo(() => {
    const delinquent = voteAccountsData?.delinquent || [];
    const delinquentStake = delinquent?.reduce((prev, current) => prev + current.activatedStake, 0);
    const totalActiveInVoteAccounts = voteAccounts?.reduce((prev, current) => prev + current.activatedStake, 0)

    return delinquentStake + totalActiveInVoteAccounts
  }, [voteAccounts, voteAccountsData?.delinquent]);

  return (
    <div>
      <div className="flex space-between align-center mt-30 mb-16">
        <div className={classes.stakingHeader}>{t('validator_staking_list')}</div>
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
          {t('my_staking')}
        </Button>
      </div>
      <List disablePadding>
        {voteAccounts.map((voteAccount) => (
          <StakingListItem
            key={voteAccount.votePubkey.toString()}
            voteAccount={voteAccount}
            totalSupply={totalSupply}
            totalActiveStake={totalActiveStake}
          />
        ))}
        {loaded ? null : <LoadingIndicator />}
      </List>
    </div>
  );
}

export const StakingListItem = ({ voteAccount, totalSupply, totalActiveStake }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { votePubkey, nodePubkey, commission } = voteAccount;
  const [publicKeys] = useWalletPublicKeys();
  const mainPubkey = publicKeys[0];
  const balanceInfo = useBalanceInfo(mainPubkey);
  const computeImageIndex = (computeHash(votePubkey) % DEFAULT_ICONS_COUNT) + 1;

  const colappsedAddress = useMemo(() => {
    return `${votePubkey.substring(0, 4)}....${votePubkey.substring(
      votePubkey.length - 8,
      votePubkey.length - 1,
    )}`;
  }, [votePubkey]);

  const estimatedAPR = useMemo(
    () => {
      return calculateEstimatedApr({totalSupply, totalActiveStake, commission})
    },
    [totalSupply, totalActiveStake, commission],
  )

  const [openStaking, setOpenStaking] = useState(false);
  if (!voteAccount) {
    return <LoadingIndicator delay={0} />;
  }
  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />;
  }

  return (
    <Card data-testid="staking-item" className={classes.item}>
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
          <div className={classes.stakingItem}>
            <div className={`${classes.text} flex align-center`}>
              {t("apr_estimated")}
            </div>
            <div className={classes.normalText}>{estimatedAPR.toFixed(2)}%</div>
          </div>
          <Button
            onClick={() => setOpenStaking(true)}
            variant="outlined"
            className={classes.text}
          >
            {t('stake')}
          </Button>
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
