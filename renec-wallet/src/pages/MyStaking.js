import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { useIsExtensionWidth } from '../utils/utils';
import MyStakingList from '../components/MyStakingList';
import { StakingProvider } from '../utils/staking';
import MyStakingInfo from '../components/MyStakingInfo';

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
    paddingTop: 22,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '8px 16px',
    borderRadius: '4px',
    marginTop: 24,
    backgroundColor: theme.palette.banner.default,
    marginRight: 24,
  },
}));

export default function MyStaking() {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  return (
    <StakingProvider>
      <MyStakingInfo />
      <Container fixed maxWidth="lg" className={classes.container}>
        <Grid container spacing={isExtensionWidth ? 0 : 3}>
          <Grid md={2} />
          <Grid item xs={12} md={8} className={classes.balancesContainer}>
            <MyStakingList />
          </Grid>
        </Grid>
      </Container>
    </StakingProvider>
  );
}
