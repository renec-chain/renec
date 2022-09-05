import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: '64px',
    left: '-100%',
    width: '100vw',
    zIndex: 9999,
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
    transition: 'all 0.5s ease',
    backgroundColor: theme.palette.banner.default,
    borderTop: '1px solid white',

    [theme.breakpoints.down('xs')]: {
      top: '56px',
      height: 'calc(100vh - 56px)',
    },
  },
  active: {
    left: 0,
  },
  navigateButtons: {
    borderTop: '1px solid white',
  },
}));
