import React, { useEffect, useState } from 'react';
import {
  generateMnemonicAndSeed,
  useHasLockedMnemonicAndSeed,
  loadMnemonicAndSeed,
  mnemonicToSeed,
  storeMnemonicAndSeed,
  normalizeMnemonic,
} from '../utils/wallet-seed';
import {
  getAccountFromSeed,
  DERIVATION_PATH,
} from '../utils/walletProvider/localStorage.js';
import Container from '@material-ui/core/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import { BalanceListItem } from '../components/BalancesList.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useCallAsync } from '../utils/notifications';
import { validateMnemonic } from 'bip39';
import {
  RButton,
  Icon,
  TextInput,
  Alert,
  Message,
 } from '../components/base';

const useStyles = makeStyles((theme) => ({
  walletButtons: {
    display: 'flex',
  },
  button: {
    marginRight: theme.spacing(2),
  }
}));

export default function LoginPage() {
  const [restore, setRestore] = useState(false);
  const [newWallet, setNewWallet] = useState(false);
  const [hasLockedMnemonicAndSeed, loading] = useHasLockedMnemonicAndSeed();
  const classes = useStyles();

  if (loading) {
    return null;
  }
  if (hasLockedMnemonicAndSeed) {
    return (
      <Container maxWidth="sm">
        <LoginForm />;
      </Container>
    );
  }
  if (!restore && !newWallet) {
    return (
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <h1>Remitano Network Wallet</h1>
            <div>Restore existing wallet or create a new one</div>
            <br />
            
            <div className={classes.walletButtons}>
              <div className={classes.button}>
                <RButton 
                  variant="secondary" 
                  size="lg"
                  icon={<Icon icon="wallet" size={24} />}
                  onClick={() => setNewWallet(true)}
                >
                  Create wallet
                </RButton>
              </div>
              <div className={classes.button}>
                <RButton 
                  variant="tertiary" 
                  outline={true} 
                  size="lg"
                  icon={<Icon icon="key" size={24} />}
                  onClick={() => setRestore(true)}
                >
                  Restore wallet
                </RButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      {restore && (
        <RestoreWalletForm goBack={() => setRestore(false)} />
      )}
      {newWallet && (
        <>
          {hasLockedMnemonicAndSeed ? <LoginForm /> : <CreateWalletForm goBack={() => setNewWallet(false)} />}
        </>
      )}
    </Container>
  );
}

function CreateWalletForm({ goBack }) {
  const [mnemonicAndSeed, setMnemonicAndSeed] = useState(null);
  useEffect(() => {
    generateMnemonicAndSeed().then(setMnemonicAndSeed);
  }, []);
  const [savedWords, setSavedWords] = useState(false);
  const callAsync = useCallAsync();

  function submit(password) {
    const { mnemonic, seed } = mnemonicAndSeed;
    callAsync(
      storeMnemonicAndSeed(
        mnemonic,
        seed,
        password,
        DERIVATION_PATH.bip44Change,
      ),
      {
        progressMessage: 'Creating wallet...',
        successMessage: 'Wallet created',
      },
    );
  }

  if (!savedWords) {
    return (
      <SeedWordsForm
        mnemonicAndSeed={mnemonicAndSeed}
        goBack={goBack}
        goForward={() => setSavedWords(true)}
      />
    );
  }

  return (
    <ChoosePasswordForm
      mnemonicAndSeed={mnemonicAndSeed}
      goBack={() => setSavedWords(false)}
      onSubmit={submit}
    />
  );
}

function SeedWordsForm({ mnemonicAndSeed, goBack, goForward }) {
  const [confirmed, setConfirmed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showConfirmMnemonic, setshowConfirmMnemonic] = useState(false);

  const downloadMnemonic = (mnemonic) => {
    const url = window.URL.createObjectURL(new Blob([mnemonic]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'renec.bak');
    document.body.appendChild(link);
    link.click();
  }

  if (showConfirmMnemonic) {
    return (
      <ConfirmMnemonic
        mnemonicAndSeed={mnemonicAndSeed}
        goForward={goForward}
        goBack={() =>setshowConfirmMnemonic(false)}
      />
    );
  }

  return (
    <>
      <div className="mb-8 flex">
        <Icon icon="back" onClick={goBack} />
        <div className="pl-16 pointer" onClick={goBack}>Back</div>
      </div>
      <Card>
        <CardContent>
          <div className="bold text-24 mb-16">Your Mnemonic phrase</div>
          <div className="mb-16">
            <Alert variant="warning">
              Please back up the text below on paper and keep them somewhere secret and safe
            </Alert>
          </div>
          {mnemonicAndSeed ? (
            <TextInput
              label="Seed Words"
              value={mnemonicAndSeed.mnemonic}
              textarea
              onFocus={(e) => e.currentTarget.select()}
            />
          ) : (
            <LoadingIndicator />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                disabled={!mnemonicAndSeed}
                style ={{color: "#9B59B6"}}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
            }
            label="I have saved these words in a safe place."
          />
          <div className="mt-24 mb-16">
            <RButton variant="secondary" onClick={() => {
              downloadMnemonic(mnemonicAndSeed?.mnemonic);
              setDownloaded(true);
            }}>
              Download Backup Mnemonic File (Required)
            </RButton>
          </div>
          <RButton fullWidth variant="primary" disabled={!confirmed || !downloaded} onClick={() => setshowConfirmMnemonic(true)}>
            Continue
          </RButton>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent>
          <Message type="info" title="Note" />
          <p className="text-14">
            Your private keys are only stored on your current computer or device.
            You will need these words to restore your wallet if your browser's
            storage is cleared or your device is damaged or lost.
          </p>
          <p className="text-14">
            By default, RENEC wallet will use <code>m/44'/501'/0'/0'</code> as the
            derivation path for the main wallet. To use an alternative path, try
            restoring an existing wallet.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

const ConfirmMnemonic = ({ mnemonicAndSeed, goBack, goForward }) => {
  const [seedCheck, setSeedCheck] = useState('');

  return (
    <>
      <div className="mb-8 flex">
        <Icon icon="back" onClick={goBack} />
        <div className="pl-16 pointer" onClick={goBack}>Back</div>
      </div>
      <Card>
        <CardContent>
          <div className="bold text-24 mb-16">Verification</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            Please re-enter your seed phrase to confirm that you have saved it.
          </div>
          <div className="mt-24 mb-24">
            <TextInput
              label=""
              onChange={(e) => setSeedCheck(e.target.value)}
              value={seedCheck}
              textarea
            />
          </div>
          <RButton
            variant="primary"
            fullWidth
            disabled={normalizeMnemonic(seedCheck) !== mnemonicAndSeed?.mnemonic}
            onClick={goForward}
          >
            Verify
          </RButton>
        </CardContent>
      </Card>
    </>
  );
}

function ChoosePasswordForm({ goBack, onSubmit }) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <>
      <div className="mb-8 flex">
          <Icon icon="back" onClick={goBack} />
          <div className="pl-16 pointer" onClick={goBack}>Back</div>
        </div>
      <Card>
        <CardContent>
          <div className="bold text-24 mb-16">Choose a Password (Optional)</div>
          <Typography>
            Optionally pick a password to protect your wallet.
          </Typography>
          <br />
          <TextInput
            label="New Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <TextInput
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <br />
          <Message type="info" title="Note" />
          <p className="mb-24">
            If you forget your password you will need to restore your wallet using
            your seed words.
          </p>
          <RButton
            variant="primary"
            fullWidth
            disabled={password !== passwordConfirm}
            onClick={() => onSubmit(password)}
          >
            Create Wallet
          </RButton>
        </CardContent>
      </Card>
    </>
  );
}

function LoginForm() {
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const callAsync = useCallAsync();

  const submit = () => {
    callAsync(loadMnemonicAndSeed(password, stayLoggedIn), {
      progressMessage: 'Unlocking wallet...',
      successMessage: 'Wallet unlocked',
    });
  }
  const submitOnEnter = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      e.stopPropagation();
      submit();
    }
  }
  const setPasswordOnChange = (e) => setPassword(e.target.value);
  const toggleStayLoggedIn = (e) => setStayLoggedIn(e.target.checked);

  return (
    <Card>
      <CardContent>
        <div className="bold text-24 mb-16">Unlock Wallet</div>
        <TextInput
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPasswordOnChange}
          onKeyDown={submitOnEnter}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stayLoggedIn}
              style ={{color: "#9B59B6"}}
              onChange={toggleStayLoggedIn}
            />
          }
          label="Keep wallet unlocked"
          className="mb-16"
        />
        <RButton fullWidth color="primary" onClick={submit}>
          Unlock
        </RButton>
      </CardContent>
    </Card>
  );
}

function RestoreWalletForm({ goBack }) {
  const [rawMnemonic, setRawMnemonic] = useState('');
  const [seed, setSeed] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [next, setNext] = useState(false);

  const mnemonic = normalizeMnemonic(rawMnemonic);
  const isNextBtnEnabled =
    password === passwordConfirm && validateMnemonic(mnemonic);
  const displayInvalidMnemonic = validateMnemonic(mnemonic) === false && mnemonic.length > 0;
  return (
    <>
      {next ? (
        <DerivedAccounts
          goBack={() => setNext(false)}
          mnemonic={mnemonic}
          password={password}
          seed={seed}
        />
      ) : (
        <>
          <div className="mb-8 flex">
            <Icon icon="back" onClick={goBack} />
            <div className="pl-16 pointer" onClick={goBack}>Back</div>
          </div>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Restore Existing Wallet
              </Typography>
              <Typography>
                Restore your wallet using your twelve or twenty-four seed words.
                Note that this will delete any existing wallet on this device.
              </Typography>
              <br />
              {displayInvalidMnemonic && (
                <>
                  <Typography fontWeight="fontWeightBold" style={{ color: 'red' }}>
                    Mnemonic validation failed. Please enter a valid BIP 39 seed phrase.
                  </Typography>
                  <br />
                </>
              )}
              <TextInput
                label="Seed Words"
                onChange={(e) => setRawMnemonic(e.target.value)}
                value={rawMnemonic}
                textarea
              />
              <br />
              <TextInput
                label="New password (Optional)"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <TextInput
                label="Confirm password (Optional"
                type="password"
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <br />
              <RButton 
                variant="primary" 
                disabled={!isNextBtnEnabled}
                onClick={() => {
                  mnemonicToSeed(mnemonic).then((seed) => {
                    setSeed(seed);
                    setNext(true);
                  });
                }}
                fullWidth
              >
                Continue
              </RButton>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}

function DerivedAccounts({ goBack, mnemonic, seed, password }) {
  const callAsync = useCallAsync();
  const [dPathMenuItem, setDPathMenuItem] = useState(
    DerivationPathMenuItem.Bip44Change,
  );
  const accounts = [...Array(10)].map((_, idx) => {
    return getAccountFromSeed(
      Buffer.from(seed, 'hex'),
      idx,
      toDerivationPath(dPathMenuItem),
    );
  });

  function submit() {
    callAsync(
      storeMnemonicAndSeed(
        mnemonic,
        seed,
        password,
        toDerivationPath(dPathMenuItem),
      ),
    );
  }

  return (
    <Card>
      <AccountsSelector
        showDeprecated={true}
        accounts={accounts}
        dPathMenuItem={dPathMenuItem}
        setDPathMenuItem={setDPathMenuItem}
      />
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button onClick={goBack}>Back</Button>
        <Button color="primary" onClick={submit}>
          Restore
        </Button>
      </CardActions>
    </Card>
  );
}

export function AccountsSelector({
  showRoot,
  showDeprecated,
  accounts,
  dPathMenuItem,
  setDPathMenuItem,
  onClick,
}) {
  return (
    <CardContent>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Derivable Accounts
        </Typography>
        <FormControl variant="outlined">
          <Select
            value={dPathMenuItem}
            onChange={(e) => {
              setDPathMenuItem(e.target.value);
            }}
          >
            {showRoot && (
              <MenuItem value={DerivationPathMenuItem.Bip44Root}>
                {`m/44'/501'`}
              </MenuItem>
            )}
            <MenuItem value={DerivationPathMenuItem.Bip44}>
              {`m/44'/501'/0'`}
            </MenuItem>
            <MenuItem value={DerivationPathMenuItem.Bip44Change}>
              {`m/44'/501'/0'/0'`}
            </MenuItem>
            {showDeprecated && (
              <MenuItem value={DerivationPathMenuItem.Deprecated}>
                {`m/501'/0'/0/0 (deprecated)`}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      {accounts.map((acc) => {
        return (
          <div onClick={onClick ? () => onClick(acc) : {}}>
            <BalanceListItem
              key={acc.publicKey.toString()}
              onClick={onClick}
              publicKey={acc.publicKey}
              expandable={false}
            />
          </div>
        );
      })}
    </CardContent>
  );
}

// Material UI's Select doesn't render properly when using an `undefined` value,
// so we define this type and the subsequent `toDerivationPath` translator as a
// workaround.
//
// DERIVATION_PATH.deprecated is always undefined.
export const DerivationPathMenuItem = {
  Deprecated: 0,
  Bip44: 1,
  Bip44Change: 2,
  Bip44Root: 3, // Ledger only.
};

export function toDerivationPath(dPathMenuItem) {
  switch (dPathMenuItem) {
    case DerivationPathMenuItem.Deprecated:
      return DERIVATION_PATH.deprecated;
    case DerivationPathMenuItem.Bip44:
      return DERIVATION_PATH.bip44;
    case DerivationPathMenuItem.Bip44Change:
      return DERIVATION_PATH.bip44Change;
    case DerivationPathMenuItem.Bip44Root:
      return DERIVATION_PATH.bip44Root;
    default:
      throw new Error(`invalid derivation path: ${dPathMenuItem}`);
  }
}
