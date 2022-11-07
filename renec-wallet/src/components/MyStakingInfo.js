import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { usePage } from '../utils/page';
import { useStaking } from '../utils/staking';
import { stakingFormat, useIsExtensionWidth } from '../utils/utils';
import { Icon } from './base';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down(theme.ext)]: {
      padding: 0,
    },
    [theme.breakpoints.up(theme.ext)]: {
      maxWidth: 'md',
    },
  },
  balancesContainer: {
    [theme.breakpoints.down(theme.ext)]: {
      marginBottom: 24,
    },
  },
  header: {
    backgroundColor: theme.palette.banner.default,
    color: 'white',
    paddingTop: 24,
    paddingBottom: 34,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '8px 16px',
    borderRadius: '4px',
    marginTop: 24,
    backgroundColor: theme.palette.banner.box,
    marginRight: 24,
  },
}));
export default function MyStakingInfo() {
  const isExtensionWidth = useIsExtensionWidth();
  const [page, setPage] = usePage();
  const classes = useStyles();
  const staking = useStaking();
  const { t } = useTranslation();

  return (
    <div className={classes.header}>
      <Container fixed maxWidth="lg">
        <Grid container spacing={isExtensionWidth ? 0 : 3}>
          <Grid md={2} />
          <Grid item xs={12} md={8} className={classes.balancesContainer}>
            <div className="mb-16 flex">
              <Icon icon="back" onClick={() => setPage('staking')} />
              <div className="pl-16 pointer" onClick={() => setPage('staking')}>
                {t('back')}
              </div>
            </div>
            <div className="bold text-32">{t("my_staking")}</div>
            <div className="flex align-end">
              <div className={classes.box}>
                <Typography style={{ fontSize: 16 }}>Total stake</Typography>
                <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {stakingFormat.format(
                    staking?.state?.totalStaked / LAMPORTS_PER_SOL,
                  )}{' '}
                  RENEC
                </Typography>
              </div>
              <div className={classes.box}>
                <Typography style={{ fontSize: 16 }}>Active stake</Typography>
                <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {stakingFormat.format(
                    staking?.state?.activeStake / LAMPORTS_PER_SOL,
                  )}{' '}
                  RENEC
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
