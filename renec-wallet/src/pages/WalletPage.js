import React from 'react';
import Container from '@material-ui/core/Container';
import BalancesList from '../components/BalancesList';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { useIsExtensionWidth } from '../utils/utils';
import { DemonWalletPromoteBanner } from '../components/DemonWalletPromoteBanner';

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
}));

export default function WalletPage() {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  return (
    <Container fixed maxWidth="md" className={classes.container}>
      <Grid container spacing={isExtensionWidth ? 0 : 3}>
        <Grid md={2} />
        <Grid item xs={12} md={8} className={classes.balancesContainer}>
          <BalancesList />
        </Grid>
      </Grid>
      <Grid container spacing={isExtensionWidth ? 0 : 3}>
        <Grid md={2} />
        <Grid item xs={12} md={8} className={classes.balancesContainer}>
          <DemonWalletPromoteBanner />
        </Grid>
      </Grid>
    </Container>
  );
}
