import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.banner.default,
    height: 200,
    minHeight: 200,
    color: 'white',
  },
  mdLogo: {
    width: '180px',
  },
  content: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  menuItemIcon: {
    minWidth: 32,
  },
  badge: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.main,
    height: 16,
    width: 16,
  },
  switch_track: {
    backgroundColor: theme.palette.primary,
  },
  switch_base: {
    color: theme.palette.primary,
    '&.Mui-disabled': {
      color: '#e886a9',
    },
    '&.Mui-checked': {
      color: '#fff',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: theme.palette.banner_info.main,
    },
  },
  switch_primary: {
    '&.Mui-checked': {
      color: theme.palette.primary,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: theme.palette.primary,
    },
  },
}));

export const useFooterStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 56,
    minHeight: 56,
    background: theme.palette.primary,
    alignItems: 'center',
  },
  text: {
    color: theme.palette.text.main,
  },
}));
