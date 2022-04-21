import React, { useState, useMemo, useCallback, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  useBalanceInfo,
  useWallet,
  useWalletPublicKeys,
  useWalletSelector,
} from '../utils/wallet';
import { findAssociatedTokenAddress } from '../utils/tokens';
import LoadingIndicator from './LoadingIndicator';
import Collapse from '@material-ui/core/Collapse';
import { Typography } from '@material-ui/core';
import TokenInfoDialog from './TokenInfoDialog';
import FtxPayDialog from './FtxPay/FtxPayDialog';
import Link from '@material-ui/core/Link';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { abbreviateAddress, useIsExtensionWidth } from '../utils/utils';
import AddTokenDialog from './AddTokenDialog';
import ExportAccountDialog from './ExportAccountDialog';
import SendDialog from './SendDialog';
import DepositDialog from './DepositDialog';
import {
  useIsProdNetwork,
  useSolanaExplorerUrlSuffix,
} from '../utils/connection';
import { useRegion } from '../utils/region';
import { serumMarkets, priceStore } from '../utils/markets';
import { swapApiRequest } from '../utils/swap/api';
import { showSwapAddress } from '../utils/config';
import { useAsyncData } from '../utils/fetch-loop';
import { useConnection } from '../utils/connection';
import CloseTokenAccountDialog from './CloseTokenAccountButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TokenIcon from './TokenIcon';
import EditAccountNameDialog from './EditAccountNameDialog';
import MergeAccountsDialog from './MergeAccountsDialog';
import {
  RButton,
  Icon,
 } from './base';
import Card from '@material-ui/core/Card';

const balanceFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
  useGrouping: true,
});

const SortAccounts = {
  None: 0,
  Ascending: 1,
  Descending: 2,
};

// Aggregated $USD values of all child BalanceListItems child components.
//
// Values:
// * undefined => loading.
// * null => no market exists.
// * float => done.
//
// For a given set of publicKeys, we know all the USD values have been loaded when
// all of their values in this object are not `undefined`.
const usdValues = {};

// Calculating associated token addresses is an asynchronous operation, so we cache
// the values so that we can quickly render components using them. This prevents
// flickering for the associated token fingerprint icon.
const associatedTokensCache = {};

const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function fairsIsLoaded(publicKeys) {
  return (
    publicKeys.filter((pk) => usdValues[pk.toString()] !== undefined).length ===
    publicKeys.length
  );
}

const useStyles = makeStyles((theme) => ({
  mainWallet: {
    height: 108,
    backgroundColor: "#3F2D4F",
    marginTop: -80,
    borderRadius: 4,
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  address: {
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
  },
  itemDetails: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F5',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  viewDetails: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function BalancesList() {
  const [publicKeys, loaded] = useWalletPublicKeys();
  const [showAddTokenDialog, setShowAddTokenDialog] = useState(false);
  const [showEditAccountNameDialog, setShowEditAccountNameDialog] = useState(
    false,
  );
  const [showMergeAccounts, setShowMergeAccounts] = useState(false);
  const [showFtxPayDialog, setShowFtxPayDialog] = useState(false);
  const [sortAccounts, setSortAccounts] = useState(SortAccounts.None);
  const { accounts, setAccountName } = useWalletSelector();
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const isExtensionWidth = useIsExtensionWidth();
  // Dummy var to force rerenders on demand.
  const [, setForceUpdate] = useState(false);
  const selectedAccount = accounts.find((a) => a.isSelected);
  const allTokensLoaded = loaded && fairsIsLoaded(publicKeys);
  let sortedPublicKeys = publicKeys;
  if (allTokensLoaded && sortAccounts !== SortAccounts.None) {
    sortedPublicKeys = [...publicKeys];
    sortedPublicKeys.sort((a, b) => {
      const aVal = usdValues[a.toString()];
      const bVal = usdValues[b.toString()];

      a = aVal === undefined || aVal === null ? -1 : aVal;
      b = bVal === undefined || bVal === null ? -1 : bVal;
      if (sortAccounts === SortAccounts.Descending) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (b < a) {
          return -1;
        } else if (b > a) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
  const totalUsdValue = publicKeys
    .filter((pk) => usdValues[pk.toString()])
    .map((pk) => usdValues[pk.toString()])
    .reduce((a, b) => a + b, 0.0);

  // Memoized callback and component for the `BalanceListItems`.
  //
  // The `BalancesList` fetches data, e.g., fairs for tokens using React hooks
  // in each of the child `BalanceListItem` components. However, we want the
  // parent component, to aggregate all of this data together, for example,
  // to show the cumulative USD amount in the wallet.
  //
  // To achieve this, we need to pass a callback from the parent to the chlid,
  // so that the parent can collect the results of all the async network requests.
  // However, this can cause a render loop, since invoking the callback can cause
  // the parent to rerender, which causese the child to rerender, which causes
  // the callback to be invoked.
  //
  // To solve this, we memoize all the `BalanceListItem` children components.
  const setUsdValuesCallback = useCallback(
    (publicKey, usdValue) => {
      if (usdValues[publicKey.toString()] !== usdValue) {
        usdValues[publicKey.toString()] = usdValue;
        if (fairsIsLoaded(publicKeys)) {
          setForceUpdate((forceUpdate) => !forceUpdate);
        }
      }
    },
    [publicKeys],
  );
  const balanceListItemsMemo = useMemo(() => {
    return sortedPublicKeys.map((pk) => {
      return React.memo((props) => {
        return (
          <BalanceListItem
            key={pk.toString()}
            publicKey={pk}
            setUsdValue={setUsdValuesCallback}
          />
        );
      });
    });
  }, [sortedPublicKeys, setUsdValuesCallback]);

  const classes = useStyles();
  const mainPubkey = publicKeys[0];
  const balanceInfo = useBalanceInfo(mainPubkey);
  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />;
  }

  return (
    <div>
      <div className={classes.mainWallet}>
        <div>
          <div className="mb-8">
            {allTokensLoaded && (
              <>
                <span className="bold text-20">{totalUsdValue.toFixed(2)}</span>
                <span>{" USD"}</span>
              </>
            )}
          </div>
          <div className="text-14">
            TOTAL BALANCE
          </div>
        </div>
        <div className="flex">
          <div className="mr-16">
            <RButton
              variant="primary"
              icon={<Icon icon="send" />}
              onClick={() => setSendDialogOpen(true)}
            >
              Send
            </RButton>
          </div>
          <div>
            <RButton
              variant="transparent"
              color="white"
              icon={<Icon icon="receive" />}
              onClick={() => setDepositDialogOpen(true)}
            >
              Receive
            </RButton>
          </div>
          <DepositDialog
            open={depositDialogOpen}
            onClose={() => setDepositDialogOpen(false)}
            balanceInfo={balanceInfo}
            publicKey={mainPubkey}
            isAssociatedToken={false}
          />
          <SendDialog
            open={sendDialogOpen}
            onClose={() => setSendDialogOpen(false)}
            balanceInfo={balanceInfo}
            publicKey={mainPubkey}
          />
        </div>
      </div>
      <div className="bold text-20 mt-30 mb-16">Assets</div>
      <List disablePadding>
        {balanceListItemsMemo.map((Memoized) => (
          <Memoized />
        ))}
        {loaded ? null : <LoadingIndicator />}
      </List>
      <AddTokenDialog
        open={showAddTokenDialog}
        onClose={() => setShowAddTokenDialog(false)}
      />
      <FtxPayDialog
        open={showFtxPayDialog}
        publicKeys={publicKeys}
        onClose={() => setShowFtxPayDialog(false)}
      />
      <EditAccountNameDialog
        open={showEditAccountNameDialog}
        onClose={() => setShowEditAccountNameDialog(false)}
        oldName={selectedAccount ? selectedAccount.name : ''}
        onEdit={(name) => {
          setAccountName(selectedAccount.selector, name);
          setShowEditAccountNameDialog(false);
        }}
      />
      <MergeAccountsDialog
        open={showMergeAccounts}
        onClose={() => setShowMergeAccounts(false)}
      />
    </div>
  );
}

export function BalanceListItem({ publicKey, expandable, setUsdValue }) {
  const wallet = useWallet();
  const balanceInfo = useBalanceInfo(publicKey);
  const classes = useStyles();
  const connection = useConnection();
  const [open, setOpen] = useState(false);
  const isExtensionWidth = useIsExtensionWidth();
  const [, setForceUpdate] = useState(false);
  // Valid states:
  //   * undefined => loading.
  //   * null => not found.
  //   * else => price is loaded.
  const [price, setPrice] = useState(undefined);
  useEffect(() => {
    if (balanceInfo) {
      if (balanceInfo.tokenSymbol) {
        const coin = balanceInfo.tokenSymbol.toUpperCase();
        // Don't fetch USD stable coins. Mark to 1 USD.
        if (coin === 'USDT' || coin === 'USDC') {
          setPrice(1);
        }
        // A Serum market exists. Fetch the price.
        else if (serumMarkets[coin]) {
          let m = serumMarkets[coin];
          priceStore
            .getPrice(connection, m.name)
            .then((price) => {
              setPrice(price);
            })
            .catch((err) => {
              console.error(err);
              setPrice(null);
            });
        }
        // No Serum market exists.
        else {
          setPrice(null);
        }
      }
      // No token symbol so don't fetch market data.
      else {
        setPrice(null);
      }
    }
  }, [price, balanceInfo, connection]);

  expandable = expandable === undefined ? true : expandable;

  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />;
  }

  let {
    amount,
    decimals,
    mint,
    tokenName,
    tokenSymbol,
    tokenLogoUri,
  } = balanceInfo;
  tokenName = tokenName ?? abbreviateAddress(mint);
  let displayName;
  if (isExtensionWidth) {
    displayName = tokenSymbol ?? tokenName;
  } else {
    displayName = tokenName + (tokenSymbol ? ` (${tokenSymbol})` : '');
  }

  // Fetch and cache the associated token address.
  if (wallet && wallet.publicKey && mint) {
    if (
      associatedTokensCache[wallet.publicKey.toString()] === undefined ||
      associatedTokensCache[wallet.publicKey.toString()][mint.toString()] ===
        undefined
    ) {
      findAssociatedTokenAddress(wallet.publicKey, mint).then((assocTok) => {
        let walletAccounts = Object.assign(
          {},
          associatedTokensCache[wallet.publicKey.toString()],
        );
        walletAccounts[mint.toString()] = assocTok;
        associatedTokensCache[wallet.publicKey.toString()] = walletAccounts;
        if (assocTok.equals(publicKey)) {
          // Force a rerender now that we've cached the value.
          setForceUpdate((forceUpdate) => !forceUpdate);
        }
      });
    }
  }

  // undefined => not loaded.
  let isAssociatedToken = mint ? undefined : false;
  if (
    wallet &&
    wallet.publicKey &&
    mint &&
    associatedTokensCache[wallet.publicKey.toString()]
  ) {
    let acc =
      associatedTokensCache[wallet.publicKey.toString()][mint.toString()];
    if (acc) {
      if (acc.equals(publicKey)) {
        isAssociatedToken = true;
      } else {
        isAssociatedToken = false;
      }
    }
  }

  const subtitle =
    isExtensionWidth || !publicKey.equals(balanceInfo.owner) ? undefined : (
      <div style={{ display: 'flex', height: '20px', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {publicKey.toBase58()}
        </div>
      </div>
    );

  const usdValue =
    price === undefined // Not yet loaded.
      ? undefined
      : price === null // Loaded and empty.
      ? null
      : ((amount / Math.pow(10, decimals)) * price).toFixed(2); // Loaded.
  if (setUsdValue && usdValue !== undefined) {
    setUsdValue(publicKey, usdValue === null ? null : parseFloat(usdValue));
  }

  return (
    <Card className="mb-8">
      <ListItem style={{padding: 16}} button onClick={() => expandable && setOpen((open) => !open)}>
        <ListItemIcon>
          <TokenIcon
            mint={mint}
            tokenName={tokenName}
            url={tokenLogoUri}
            size={28}
          />
        </ListItemIcon>
        <div className="flex space-between full-width">
          <div>
            <div>{tokenName ?? tokenSymbol}</div>
            <div>{tokenSymbol}</div>
          </div>
          <div className="mr-24">
            <div>
              <span className="bold">{balanceFormat.format(amount / Math.pow(10, decimals))}</span>
              <span>{tokenSymbol && ` ${tokenSymbol}`}</span>
            </div>
            <div>{numberFormat.format(usdValue)}</div>
          </div>
        </div>
        {expandable ? open ? <ExpandLess /> : <ExpandMore /> : <></>}
      </ListItem>
      {expandable && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <BalanceListItemDetails
            isAssociatedToken={isAssociatedToken}
            publicKey={publicKey}
            serumMarkets={serumMarkets}
            balanceInfo={balanceInfo}
          />
        </Collapse>
      )}
    </Card>
  );
}

function BalanceListItemDetails({
  publicKey,
  serumMarkets,
  balanceInfo,
  isAssociatedToken,
}) {
  const urlSuffix = useSolanaExplorerUrlSuffix();
  const classes = useStyles();
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [tokenInfoDialogOpen, setTokenInfoDialogOpen] = useState(false);
  const [exportAccDialogOpen, setExportAccDialogOpen] = useState(false);
  const [
    closeTokenAccountDialogOpen,
    setCloseTokenAccountDialogOpen,
  ] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const wallet = useWallet();
  const isProdNetwork = useIsProdNetwork();
  const [swapInfo] = useAsyncData(async () => {
    if (!showSwapAddress || !isProdNetwork) {
      return null;
    }
    return await swapApiRequest(
      'POST',
      'swap_to',
      {
        blockchain: 'sol',
        coin: balanceInfo.mint?.toBase58(),
        address: publicKey.toBase58(),
      },
      { ignoreUserErrors: true },
    );
  }, [
    'swapInfo',
    isProdNetwork,
    balanceInfo.mint?.toBase58(),
    publicKey.toBase58(),
  ]);
  const isExtensionWidth = useIsExtensionWidth();

  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />;
  }

  let { mint, tokenName, tokenSymbol, owner, amount } = balanceInfo;

  // Only show the export UI for the native RENEC coin.
  const exportNeedsDisplay =
    mint === null && tokenName === 'RENEC' && tokenSymbol === 'RENEC';

  const market = tokenSymbol
    ? serumMarkets[tokenSymbol.toUpperCase()]
      ? serumMarkets[tokenSymbol.toUpperCase()].publicKey
      : undefined
    : undefined;
  const isSolAddress = publicKey.equals(owner);
  
  return (
    <>
      {wallet.allowsExport && (
        <ExportAccountDialog
          onClose={() => setExportAccDialogOpen(false)}
          open={exportAccDialogOpen}
        />
      )}
      <div className={classes.itemDetails}>
        <div className={classes.buttonContainer}>
          <div className="mr-16">
            <RButton
              variant="primary"
              icon={<Icon icon="send" />}
              onClick={() => setSendDialogOpen(true)}
            >
              Send
            </RButton>
          </div>
          <div>
            <RButton
              variant="transparent"
              color="gray-darkest"
              icon={<Icon icon="receive-black" />}
              onClick={() => setDepositDialogOpen(true)}
            >
              Receive
            </RButton>
          </div>
        </div>
        <Typography variant="body2">
          <Link
            href={
              `https://explorer.renec.foundation/address/${publicKey.toBase58()}` + urlSuffix
            }
            target="_blank"
            rel="noopener"
          >
            <div className="flex">
              <Icon icon="external-link" />
              <span className="ml-8 color-primary">View on explorer</span>
            </div>
          </Link>
        </Typography>
      </div>
      <SendDialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        balanceInfo={balanceInfo}
        publicKey={publicKey}
      />
      <DepositDialog
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
        balanceInfo={balanceInfo}
        publicKey={publicKey}
        swapInfo={swapInfo}
        isAssociatedToken={isAssociatedToken}
      />
      <TokenInfoDialog
        open={tokenInfoDialogOpen}
        onClose={() => setTokenInfoDialogOpen(false)}
        balanceInfo={balanceInfo}
        publicKey={publicKey}
      />
      <CloseTokenAccountDialog
        open={closeTokenAccountDialogOpen}
        onClose={() => setCloseTokenAccountDialogOpen(false)}
        balanceInfo={balanceInfo}
        publicKey={publicKey}
      />
    </>
  );
}
