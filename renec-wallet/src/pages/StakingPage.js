import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { useIsExtensionWidth } from '../utils/utils';
import StakingList from '../components/StakingList';
import {useAsyncData} from "../utils/fetch-loop";
import {useConnection} from "../utils/connection";

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
    height: 200,
    minHeight: 200,
    color: 'white',
    paddingTop: 24,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '8px 16px',
    borderRadius: '4px',
    marginTop: 24,
    backgroundColor: '#210C34',
  },
}));

export default function StakingPage() {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();

  return (
    <>
      <div className={classes.header}>
        <Container fixed maxWidth="lg">
          <Grid container spacing={isExtensionWidth ? 0 : 3}>
            <Grid md={2} />
            <Grid item xs={12} md={8} className={classes.balancesContainer}>
              <div className="bold text-32">Staking</div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container fixed maxWidth="lg" className={classes.container}>
        <Grid container spacing={isExtensionWidth ? 0 : 3}>
          <Grid md={2} />
          <Grid item xs={12} md={8} className={classes.balancesContainer}>
            <StakingList  />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
