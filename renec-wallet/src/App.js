import React, { Suspense, useState } from 'react';
import { makeStyles, List, ListItem } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogForm from './components/DialogForm';
import NavigationFrame from './components/NavigationFrame';
import { ConnectionProvider } from './utils/connection';
import WalletPage from './pages/WalletPage';
import { useWallet, WalletProvider } from './utils/wallet';
import { ConnectedWalletsProvider } from './utils/connected-wallets';
import { TokenRegistryProvider } from './utils/tokens/names';
import LoadingIndicator from './components/LoadingIndicator';
import { SnackbarProvider } from 'notistack';
import PopupPage from './pages/PopupPage';
import LoginPage from './pages/LoginPage';
import ConnectionsPage from './pages/ConnectionsPage';
import { isExtension } from './utils/utils';
import { PageProvider, usePage } from './utils/page';
import StakingPage from './pages/StakingPage';
import MyStaking from './pages/MyStaking';
import './i18n'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: { main: '#210C34' },
          background: { default: '#FBFBFC', secondary: '#F3F3F5' },
          banner: { default: '#27133A', box: '#3F2D4F' },
          text: { main: '#000' },
          banner_info: { main: '#3F2D4F' },
          my_staking_text: { main: '#000' },
          item_list: '#FFF',
          link: { main: '#9B59B6' },
        }
      : {
          // palette values for dark mode
          primary: { main: '#1A1B23' },
          background: { default: '#1A1B23', secondary: '#F3F3F5' },
          banner: { default: '#12131A', box: '#323240' },
          text: { main: '#fff' },
          banner_info: { main: '#39394F' },
          item_list: '#2A2A36',
          my_staking_text: { main: '#DDD9E9' },
          link: { main: '#9B59B6' },
        }),
  },
});
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function App() {
  const [mode, setMode] = React.useState(() => {
    const currentMode = localStorage.getItem('mode');
    return currentMode || 'light';
  });
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        const currentMode = localStorage.getItem('mode');
        localStorage.setItem(
          'mode',
          currentMode ? (currentMode === 'light' ? 'dark' : 'light') : 'dark',
        );
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createMuiTheme(getDesignTokens(mode)), [
    mode,
  ]);

  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null;
  }

  let appElement = (
    <NavigationFrame>
      <Suspense fallback={<LoadingIndicator />}>
        <PageContents />
      </Suspense>
    </NavigationFrame>
  );

  if (isExtension) {
    appElement = (
      <ConnectedWalletsProvider>
        <PageProvider>{appElement}</PageProvider>
      </ConnectedWalletsProvider>
    );
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ConnectionProvider>
            <PageProvider>
              <TokenRegistryProvider>
                <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
                  <WalletProvider>{appElement}</WalletProvider>
                </SnackbarProvider>
              </TokenRegistryProvider>
            </PageProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Suspense>
  );
}

function PageContents() {
  const wallet = useWallet();
  const [page] = usePage();
  const [showWalletSuggestion, setShowWalletSuggestion] = useState(true);
  const suggestionKey = 'private-irgnore-wallet-suggestion';
  const ignoreSuggestion = window.localStorage.getItem(suggestionKey);
  if (!wallet) {
    return (
      <>
        <LoginPage />
      </>
    );
  }
  if (window.opener) {
    return <PopupPage opener={window.opener} />;
  }
  if (page === 'wallet') {
    return <WalletPage />;
  } else if (page === 'staking') {
    return <StakingPage />;
  } else if (page === 'mystaking') {
    return <MyStaking />;
  }
  if (page === 'wallet') {
    return <WalletPage />;
  } else if (page === 'connections') {
    return <ConnectionsPage />;
  }
}

const useStyles = makeStyles(() => ({
  walletButton: {
    width: '100%',
    padding: '16px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

function WalletSuggestionDialog({ open, onClose, onIgnore }) {
  const classes = useStyles();
  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>Looking for a Wallet?</DialogTitle>
      <DialogContent>
        <Typography>
          Sollet is an{' '}
          <a
            style={{ color: 'inherit' }}
            href="https://github.com/project-serum/spl-token-wallet"
            target="__blank"
          >
            {' '}
            open source
          </a>{' '}
          wallet for advanced users and developers. For the best Remitano
          Network experience and user support, it is recommended to use{' '}
          <b>Phantom</b> or <b>Solflare</b>.
        </Typography>
        <List disablePadding style={{ marginTop: '16px' }}>
          <ListItem button disablePadding style={{ padding: 0 }}>
            <div
              className={classes.walletButton}
              style={{ display: 'flex' }}
              onClick={() => {
                window.location = 'https://phantom.app/';
              }}
            >
              <div>
                <img
                  alt=""
                  style={{ height: '39px' }}
                  src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.svg"
                />
              </div>
              <div>
                <Typography
                  style={{
                    marginLeft: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '39px',
                    fontWeight: 'bold',
                  }}
                >
                  Phantom
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem button disablePadding style={{ padding: 0 }}>
            <div
              onClick={() => {
                window.location = 'https://solflare.com/';
              }}
              className={classes.walletButton}
              style={{ display: 'flex' }}
            >
              <div>
                <img
                  alt=""
                  style={{ height: '39px' }}
                  src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg"
                />
              </div>
              <div>
                <Typography
                  style={{
                    marginLeft: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '39px',
                    fontWeight: 'bold',
                  }}
                >
                  Solflare
                </Typography>
              </div>
            </div>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" onClick={onIgnore}>
          Ignore Future Dialog
        </Button>
        <Button type="submit" color="primary" onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </DialogForm>
  );
}
