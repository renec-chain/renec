import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { usePage } from '../utils/page';
import { useStaking } from '../utils/staking';
import { stakingFormat, useIsExtensionWidth } from '../utils/utils';
import { Icon } from './base';
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
    backgroundColor: '#27133A',
    color: 'white',
    paddingTop: 24,
    paddingBottom: 34
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '8px 16px',
    borderRadius: '4px',
    marginTop: 24,
    backgroundColor: '#3F2D4F',
    marginRight: 24,
  },
}));
export default function MyStakingInfo() {
  const isExtensionWidth = useIsExtensionWidth();
  const [page, setPage] = usePage();
  const classes = useStyles();
  const staking = useStaking();
  return (
    <div className={classes.header}>
      <Container fixed maxWidth="md">
        <Grid container spacing={isExtensionWidth ? 0 : 3}>
          <Grid md={2} />
          <Grid item xs={12} md={8} className={classes.balancesContainer}>
            <div className="mb-16 flex">
              <Icon icon="back" onClick={() => setPage('staking')} />
              <div className="pl-16 pointer" onClick={() => setPage('staking')}>
                Back
              </div>
            </div>
            <div className="bold text-32">My Staking</div>
            <div className="flex align-end">
              <div className={classes.box}>
                <Typography style={{ fontSize: 16 }}>Total staked</Typography>
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
                  {staking?.state.activeStake}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
