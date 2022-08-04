import React, { useState, useMemo, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useConnectionConfig } from '../utils/connection';
import {
  clusterForEndpoint,
  getClusters,
  addCustomCluster,
  customClusterExists,
} from '../utils/clusters';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useWalletSelector } from '../utils/wallet';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountIcon from '@material-ui/icons/AccountCircle';
import UsbIcon from '@material-ui/icons/Usb';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SolanaIcon from './SolanaIcon';
import LightIcon from '@material-ui/icons/WbSunny';
import DarkIcon from '@material-ui/icons/NightsStayOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AddAccountDialog from './AddAccountDialog';
import DeleteMnemonicDialog from './DeleteMnemonicDialog';
import AddHardwareWalletDialog from './AddHarwareWalletDialog';
import { ExportMnemonicDialog } from './ExportAccountDialog.js';
import {
  isExtension,
  isExtensionPopup,
  useIsExtensionWidth,
} from '../utils/utils';
import ConnectionIcon from './ConnectionIcon';
import { Badge, Switch, Tab, Tabs } from '@material-ui/core';
import { useConnectedWallets } from '../utils/connected-wallets';
import { usePage } from '../utils/page';
import { shortenAddress } from '../utils/utils';
import { MonetizationOn, OpenInNew } from '@material-ui/icons';
import Link from '@material-ui/core/Link';
import AddCustomClusterDialog from './AddCustomClusterDialog';
import logo from '../img/logo.svg';
import { useSnackbar } from 'notistack';
import { COLORS_PALETTE } from './base/variables';
import { ColorModeContext } from '../App';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.banner.default,
    height: 200,
    minHeight: 200,
    color: 'white',
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

export default function NavigationFrame({ children }) {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  const [page, setPage] = usePage();
  const { accounts } = useWalletSelector();
  const [isCopied, setIsCopied] = useState(false);
  const selectedAccount = accounts.find((a) => a.isSelected);
  const { enqueueSnackbar } = useSnackbar();
  const onCopyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address.toBase58());
    enqueueSnackbar(`Copied address`, {
      variant: 'info',
      autoHideDuration: 2500,
    });
  };
  const handleChange = (event, newValue) => {
    setPage(newValue);
  };
  return (
    <>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={logo} alt="Remitano logo" />
            <Tabs
              value={page}
              onChange={handleChange}
              textColor={COLORS_PALETTE.white}
              indicatorColor="transparent"
            >
              <Tab label="Wallet" value="wallet" />
              <Tab label="Staking" value="staking" />
            </Tabs>

            <NavigationButtons />
          </Toolbar>
        </Container>
      </AppBar>

      {selectedAccount && page === 'wallet' && (
        <div className={classes.header}>
          <Container fixed maxWidth="md">
            <div className="bold text-32 mt-48">Main account</div>
            {isExtensionWidth
              ? shortenAddress(selectedAccount.address.toBase58())
              : selectedAccount.address.toBase58()}
            <span
              className="pointer color-primary ml-8"
              onClick={onCopyAddress}
            >
              [copy]
            </span>
          </Container>
        </div>
      )}
      <main className={classes.content}>{children}</main>
      {!isExtensionWidth && <Footer />}
    </>
  );
}

function NavigationButtons() {
  const classes = useStyles();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isExtensionWidth = useIsExtensionWidth();
  const [page] = usePage();
  if (isExtensionPopup) {
    return null;
  }
  let elements = [
    <Switch
      onClick={colorMode.toggleColorMode}
      classes={{
        track: classes.switch_track,
        switchBase: classes.switch_base,
        colorPrimary: classes.switch_primary,
      }}
      icon={<LightIcon />}
      checkedIcon={<DarkIcon />}
      checked={theme.palette.mode === 'dark'}
    />,
  ];
  if (page === 'wallet') {
    elements = elements.concat([
      isExtension && <ConnectionsButton />,
      <WalletSelector />,
      <NetworkSelector />,
    ]);
  } else if (page === 'connections') {
    elements.push(<WalletButton />);
  } else if (page === 'staking' || page === 'mystaking') {
    elements.push(<NetworkSelector />);
  }

  if (isExtension && isExtensionWidth) {
    elements.push(<ExpandButton />);
  }

  return <div>{elements}</div>;
}

function ExpandButton() {
  const onClick = () => {
    window.open(chrome.runtime.getURL('index.html'), '_blank');
  };

  return (
    <Tooltip title="Expand View">
      <IconButton color="inherit" onClick={onClick}>
        <OpenInNew />
      </IconButton>
    </Tooltip>
  );
}

function WalletButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('wallet');

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Wallet Balances">
          <IconButton color="inherit" onClick={onClick}>
            <MonetizationOn />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Button color="inherit" onClick={onClick} className={classes.button}>
          Wallet
        </Button>
      </Hidden>
    </>
  );
}

function ConnectionsButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('connections');
  const connectedWallets = useConnectedWallets();

  const connectionAmount = Object.keys(connectedWallets).length;

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Manage Connections">
          <IconButton color="inherit" onClick={onClick}>
            <Badge
              badgeContent={connectionAmount}
              classes={{ badge: classes.badge }}
            >
              <ConnectionIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Badge
          badgeContent={connectionAmount}
          classes={{ badge: classes.badge }}
        >
          <Button color="inherit" onClick={onClick} className={classes.button}>
            Connections
          </Button>
        </Badge>
      </Hidden>
    </>
  );
}

function NetworkSelector() {
  const { endpoint, setEndpoint } = useConnectionConfig();
  const cluster = useMemo(() => clusterForEndpoint(endpoint), [endpoint]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addCustomNetworkOpen, setCustomNetworkOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <AddCustomClusterDialog
        open={addCustomNetworkOpen}
        onClose={() => setCustomNetworkOpen(false)}
        onAdd={({ name, apiUrl }) => {
          addCustomCluster(name, apiUrl);
          setCustomNetworkOpen(false);
        }}
      />
      <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          {cluster?.label ?? 'Network'}
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Network" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <SolanaIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {getClusters().map((cluster) => (
          <MenuItem
            key={cluster.apiUrl}
            onClick={() => {
              setAnchorEl(null);
              setEndpoint(cluster.apiUrl);
            }}
            selected={cluster.apiUrl === endpoint}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {cluster.apiUrl === endpoint ? (
                <CheckIcon fontSize="small" />
              ) : null}
            </ListItemIcon>
            {cluster.name === 'mainnet-beta-backup'
              ? 'Mainnet Beta Backup'
              : cluster.apiUrl}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            setCustomNetworkOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
          {customClusterExists()
            ? 'Edit Custom Endpoint'
            : 'Add Custom Endpoint'}
        </MenuItem>
      </Menu>
    </>
  );
}

function WalletSelector() {
  const {
    accounts,
    derivedAccounts,
    hardwareWalletAccount,
    setHardwareWalletAccount,
    setWalletSelector,
    addAccount,
  } = useWalletSelector();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [
    addHardwareWalletDialogOpen,
    setAddHardwareWalletDialogOpen,
  ] = useState(false);
  const [deleteMnemonicOpen, setDeleteMnemonicOpen] = useState(false);
  const [exportMnemonicOpen, setExportMnemonicOpen] = useState(false);
  const classes = useStyles();

  if (accounts.length === 0) {
    return null;
  }
  return (
    <>
      <AddHardwareWalletDialog
        open={addHardwareWalletDialogOpen}
        onClose={() => setAddHardwareWalletDialogOpen(false)}
        onAdd={({ publicKey, derivationPath, account, change }) => {
          setHardwareWalletAccount({
            name: 'Hardware wallet',
            publicKey,
            importedAccount: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
          setWalletSelector({
            walletIndex: undefined,
            importedPubkey: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
        }}
      />
      <AddAccountDialog
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        onAdd={({ name, importedAccount }) => {
          addAccount({ name, importedAccount });
          setWalletSelector({
            walletIndex: importedAccount ? undefined : derivedAccounts.length,
            importedPubkey: importedAccount
              ? importedAccount.publicKey.toString()
              : undefined,
            ledger: false,
          });
          setAddAccountOpen(false);
        }}
      />
      <ExportMnemonicDialog
        open={exportMnemonicOpen}
        onClose={() => setExportMnemonicOpen(false)}
      />
      <DeleteMnemonicDialog
        open={deleteMnemonicOpen}
        onClose={() => setDeleteMnemonicOpen(false)}
      />
      <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          Account
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Account" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {accounts.map((account) => (
          <AccountListItem
            account={account}
            classes={classes}
            setAnchorEl={setAnchorEl}
            setWalletSelector={setWalletSelector}
          />
        ))}
        {hardwareWalletAccount && (
          <>
            <Divider />
            <AccountListItem
              account={hardwareWalletAccount}
              classes={classes}
              setAnchorEl={setAnchorEl}
              setWalletSelector={setWalletSelector}
            />
          </>
        )}
        <Divider />
        <MenuItem onClick={() => setAddHardwareWalletDialogOpen(true)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <UsbIcon fontSize="small" />
          </ListItemIcon>
          Import Hardware Wallet
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setAddAccountOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setExportMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ImportExportIcon fontSize="small" />
          </ListItemIcon>
          Export Mnemonic
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          {'Delete Mnemonic & Log Out'}
        </MenuItem>
      </Menu>
    </>
  );
}

const useFooterStyles = makeStyles((theme) => ({
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

function Footer() {
  const classes = useFooterStyles();
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.text}>
          <span>© 2022 </span>
          <Link href="https://remitano.com" target="_blank" rel="noopener">
            <span className="color-primary">Remitano</span>
          </Link>
          <span>. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}

function AccountListItem({ account, classes, setAnchorEl, setWalletSelector }) {
  return (
    <MenuItem
      key={account.address.toBase58()}
      onClick={() => {
        setAnchorEl(null);
        setWalletSelector(account.selector);
      }}
      selected={account.isSelected}
      component="div"
    >
      <ListItemIcon className={classes.menuItemIcon}>
        {account.isSelected ? <CheckIcon fontSize="small" /> : null}
      </ListItemIcon>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>{account.name}</Typography>
        <Typography color="textSecondary">
          {account.address.toBase58()}
        </Typography>
      </div>
    </MenuItem>
  );
}
