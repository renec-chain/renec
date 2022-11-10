import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Tab,
  Tabs,
  Link,
  Hidden,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  HowToVote,
  AccountBalanceWalletOutlined,
} from '@material-ui/icons';
import { useWalletSelector } from '../../utils/wallet';
import { useIsExtensionWidth } from '../../utils/utils';
import { usePage } from '../../utils/page';
import { shortenAddress } from '../../utils/utils';
import logo from '../../img/logo.svg';
import { useSnackbar } from 'notistack';
import { COLORS_PALETTE } from '../base/variables';
import MobileNavMenu from '../MobileNavMenu';
import { useStyles, useFooterStyles } from './styles';
import NavigationButtons, { ThemeSwitcher } from './NavigationButtons';
import ToggleLanguage from '../base/molecules/toggle-language';
import { useTranslation } from 'react-i18next';

export const usePagesMenu = () => {
  const {t} = useTranslation()
  return [
    {
      label: t('wallet'),
      value: 'wallet',
      icon: AccountBalanceWalletOutlined,
    },
    {
      label: t('staking'),
      value: 'staking',
      icon: HowToVote,
    },
  ]
}

const HeaderBar = () => {
  const classes = useStyles();
  const [page, setPage] = usePage();
  const [menuOpen, setMenuOpen] = React.useState();
  const pages = usePagesMenu()

  const handleCloseNavMenu = () => {
    setMenuOpen(false);
  };

  const handleToggleNavMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
          }}
        >
          <Hidden smDown>
            <img src={logo} alt="Remitano logo" />
            <Tabs
              value={page}
              onChange={handleChange}
              textColor={COLORS_PALETTE.white}
              indicatorColor="transparent"
            >
              {pages.map((page) => (
                <Tab value={page.value} label={page.label} />
              ))}
            </Tabs>
            <ToggleLanguage />
          </Hidden>
          <Hidden mdUp>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleToggleNavMenu}
              color="inherit"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <MobileNavMenu onClose={handleCloseNavMenu} open={menuOpen} />
            <img className={classes.mdLogo} src={logo} alt="Remitano logo" />
            <ToggleLanguage />
          </Hidden>
          <Hidden smDown>
            <NavigationButtons />
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default function Index({ children }) {
  const classes = useStyles();
  const { t } = useTranslation()
  const isExtensionWidth = useIsExtensionWidth();
  const [page] = usePage();
  const { accounts } = useWalletSelector();
  const selectedAccount = accounts.find((a) => a.isSelected);
  const { enqueueSnackbar } = useSnackbar();

  const onCopyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address.toBase58());
    enqueueSnackbar(t('copied_address'), {
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
            <div className="bold text-32 mt-48">{t('main_account')}</div>
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
