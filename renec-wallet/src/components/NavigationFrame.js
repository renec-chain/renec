import React, { useState, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Hidden,
  IconButton,
  Tooltip,
  Container,
  Box,
  Badge,
  Switch,
  Tab,
  Tabs,
  Link,
  SvgIcon,
} from '@material-ui/core';
import {
  Check as CheckIcon,
  Add as AddIcon,
  ExitToApp,
  AccountCircle as AccountIcon,
  Usb as UsbIcon,
  WbSunny as LightIcon,
  NightsStayOutlined as DarkIcon,
  ImportExport as ImportExportIcon,
  Menu as MenuIcon,
  MonetizationOn,
  OpenInNew,
} from '@material-ui/icons';

import { useConnectionConfig } from '../utils/connection';
import {
  clusterForEndpoint,
  getClusters,
  addCustomCluster,
  customClusterExists,
} from '../utils/clusters';
import { useWalletSelector } from '../utils/wallet';
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
import { useConnectedWallets } from '../utils/connected-wallets';
import { usePage } from '../utils/page';
import { shortenAddress } from '../utils/utils';
import AddCustomClusterDialog from './AddCustomClusterDialog';
import logo from '../img/logo.svg';
import { useSnackbar } from 'notistack';
import { COLORS_PALETTE } from './base/variables';
import { ColorModeContext } from '../App';

import { ReactComponent as RenecFavicon } from '../img/svgs/logo.svg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: 24,
  },
  header: {
    backgroundColor: theme.palette.banner.default,
    height: 200,
    minHeight: 200,
    color: 'white',
  },
  lgPagesMenu: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mdPagesMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  lgLogo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  mdLogo: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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

const pages = [
  {
    label: 'Wallet',
    value: 'wallet',
  },
  {
    label: 'Staking',
    value: 'staking',
  },
];

const HeaderBar = () => {
  const classes = useStyles();
  const [page, setPage] = usePage();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  const handleMenuPageClick = (pageValue) => {
    setAnchorElNav(null);
    setPage(pageValue);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="primary">
      <Container>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
          }}
        >
          <img
            className={classes.lgLogo}
            src={logo}
            alt="Remitano logo"
          />
          <Tabs
            className={classes.lgPagesMenu}
            value={page}
            onChange={handleChange}
            textColor={COLORS_PALETTE.white}
            indicatorColor="transparent"
          >
            {pages.map((page) => (
              <Tab value={page.value} label={page.label} />
            ))}
          </Tabs>
          <Box className={classes.mdPagesMenu}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.value}
                  onClick={() => handleMenuPageClick(page.value)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img className={classes.mdLogo} src={logo} alt="Remitano logo" />
          <NavigationButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default function NavigationFrame({ children }) {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  const [page] = usePage();
  const { accounts } = useWalletSelector();
  const selectedAccount = accounts.find((a) => a.isSelected);
  const { enqueueSnackbar } = useSnackbar();

  const onCopyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address.toBase58());
    enqueueSnackbar(`Copied address`, {
      variant: 'info',
      autoHideDuration: 2500,
    });
  };

  return (
    <>
      <HeaderBar />
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
            <SvgIcon>
              <RenecFavicon />
            </SvgIcon>
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
