import React, { useEffect, useRef, useState } from 'react';
import {
  generateMnemonicAndSeed,
  useHasLockedMnemonicAndSeed,
  loadMnemonicAndSeed,
  mnemonicToSeed,
  storeMnemonicAndSeed,
  normalizeMnemonic,
  forgetWallet,
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
import { LockOutlined, LockOpenOutlined } from '@material-ui/icons';
import { useCallAsync } from '../utils/notifications';
import { validateMnemonic } from 'bip39';
import { Alert } from '@material-ui/lab';
import { RButton, Icon, TextInput, Message } from '../components/base';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  walletButtons: {
    display: 'flex',
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

export default function LoginPage() {
  const { t } = useTranslation();
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
        <LoginForm />
      </Container>
    );
  }
  if (!restore && !newWallet) {
    return (
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <h1>{t('renec_wallet')}</h1>
            <div>{t('restore_create_wallet')}</div>
            <br />
            <div className={classes.walletButtons}>
              <div className={classes.button}>
                <RButton
                  variant="secondary"
                  size="lg"
                  icon={<Icon icon="wallet" size={24} />}
                  onClick={() => setNewWallet(true)}
                >
                  {t('create_wallet')}
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
                  {t('restore_wallet')}
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
      {restore && <RestoreWalletForm goBack={() => setRestore(false)} />}
      {newWallet && (
        <>
          {hasLockedMnemonicAndSeed ? (
            <LoginForm />
          ) : (
            <CreateWalletForm goBack={() => setNewWallet(false)} />
          )}
        </>
      )}
    </Container>
  );
}

function CreateWalletForm({ goBack }) {
  const [mnemonicAndSeed, setMnemonicAndSeed] = useState(null);
  const [savedWords, setSavedWords] = useState(false);
  const callAsync = useCallAsync();
  const { t } = useTranslation();

  useEffect(() => {
    generateMnemonicAndSeed().then(setMnemonicAndSeed);
  }, []);

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
        progressMessage: t('creating_wallet'),
        successMessage: t('create_wallet_success'),
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
  const { t } = useTranslation();
  const [confirmed, setConfirmed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showConfirmMnemonic, setshowConfirmMnemonic] = useState(false);

  const downloadMnemonic = (mnemonic) => {
    const url = window.URL.createObjectURL(new Blob([mnemonic]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'renec.txt');
    document.body.appendChild(link);
    link.click();
  };

  if (showConfirmMnemonic) {
    return (
      <ConfirmMnemonic
        mnemonicAndSeed={mnemonicAndSeed}
        goForward={goForward}
        goBack={() => setshowConfirmMnemonic(false)}
      />
    );
  }

  return (
    <>
      <div className="mb-16 flex mt-16">
        <Icon icon="back" onClick={goBack} />
        <div className="pl-16 pointer" onClick={goBack}>
          {t('back')}
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="bold text-24 mb-16">{t('your_secret_key')}</div>
          <div className="mb-16">
            <Alert severity="error">{t('secret_key_warning_0')}</Alert>
            <div className="mt-8" />
            <Alert severity="error">{t('secret_key_warning_1')}</Alert>
            <div className="mt-8" />
            <Alert severity="error">{t('secret_key_warning_2')}</Alert>
          </div>
          <div className="mb-8">{t('secret_key')}</div>
          <PassPhrase mnemonicAndSeed={mnemonicAndSeed} />
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                disabled={!mnemonicAndSeed}
                style={{ color: '#9B59B6' }}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
            }
            label={t('confirm_save_secret_key')}
          />
          <div className="mt-24 mb-16">
            <RButton
              variant="secondary"
              onClick={() => {
                downloadMnemonic(mnemonicAndSeed?.mnemonic);
                setDownloaded(true);
              }}
            >
              {t('down_load_secret_key')}
            </RButton>
          </div>
          <RButton
            fullWidth
            variant="primary"
            disabled={!confirmed || !downloaded}
            onClick={() => setshowConfirmMnemonic(true)}
          >
            {t('continue')}
          </RButton>
        </CardContent>
      </Card>
    </>
  );
}

const ConfirmMnemonic = ({ mnemonicAndSeed, goBack, goForward }) => {
  const [seedCheck, setSeedCheck] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-16 mt-16 flex">
        <Icon icon="back" onClick={goBack} />
        <div className="pl-16 pointer" onClick={goBack}>
          {t('back')}
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="bold text-24 mb-16">{t('verification')}</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {t('re_enter_secret_key')}
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
            disabled={
              normalizeMnemonic(seedCheck) !== mnemonicAndSeed?.mnemonic
            }
            onClick={goForward}
          >
            {t('verify')}
          </RButton>
        </CardContent>
      </Card>
    </>
  );
};

function ChoosePasswordForm({ goBack, onSubmit }) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-16 mb-16 flex">
        <Icon icon="back" onClick={goBack} />
        <div className="pl-16 pointer" onClick={goBack}>
          {t('back')}
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="bold text-24 mb-16">{t('choose_a_password')}</div>
          <Typography>{t('choose_a_password_description')}</Typography>
          <br />
          <TextInput
            label={t('new_password')}
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <TextInput
            label={t('confirm_password')}
            type="password"
            name="password-confirm"
            autoComplete="new-password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <br />
          <Message type="info" title={t('note')} />
          <p className="mb-24">{t('forget_password_note')}</p>
          <RButton
            variant="primary"
            fullWidth
            disabled={password !== passwordConfirm}
            onClick={() => onSubmit(password)}
          >
            {t('create_wallet')}
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
  const { t } = useTranslation();

  const submit = () => {
    callAsync(loadMnemonicAndSeed(password, stayLoggedIn), {
      progressMessage: t('unlocking_wallet'),
      successMessage: t('unlock_wallet_success'),
    });
  };
  const submitOnEnter = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      e.stopPropagation();
      submit();
    }
  };
  const setPasswordOnChange = (e) => setPassword(e.target.value);
  const toggleStayLoggedIn = (e) => setStayLoggedIn(e.target.checked);

  return (
    <Card>
      <CardContent>
        <div className="bold text-24 mb-16">{t('unlock_wallet')}</div>
        <TextInput
          label={t('password')}
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={setPasswordOnChange}
          onKeyDown={submitOnEnter}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stayLoggedIn}
              style={{ color: '#9B59B6' }}
              onChange={toggleStayLoggedIn}
            />
          }
          label={t('keep_wallet_unlock')}
          className="mb-16"
        />
        <RButton fullWidth color="primary" onClick={submit}>
          {t('unlock')}
        </RButton>
        <Typography onClick={forgetWallet} className="mt-16">
          {t('forget_password_unlock')}
        </Typography>
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
  const { t } = useTranslation();
  const mnemonic = normalizeMnemonic(rawMnemonic);
  const isNextBtnEnabled =
    password === passwordConfirm && validateMnemonic(mnemonic);
  const displayInvalidMnemonic =
    validateMnemonic(mnemonic) === false && mnemonic.length > 0;

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
          <div className="mb-16 mt-16 flex">
            <Icon icon="back" onClick={goBack} />
            <div className="pl-16 pointer" onClick={goBack}>
              {t('back')}
            </div>
          </div>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t('restore_existing_wallet')}
              </Typography>
              <Typography>
                {t('restore_existing_wallet_description')}
              </Typography>
              <br />
              {displayInvalidMnemonic && (
                <>
                  <Typography
                    fontWeight="fontWeightBold"
                    style={{ color: 'red' }}
                  >
                    {t('invalid_secret_key_format')}
                  </Typography>
                  <br />
                </>
              )}
              <TextInput
                label={t('secret_key')}
                onChange={(e) => setRawMnemonic(e.target.value)}
                value={rawMnemonic}
                textarea
              />
              <br />
              <TextInput
                label={t('new_password_optional')}
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <TextInput
                label={t('confirm_password_optional')}
                type="password"
                name="password-confirm"
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
                {t('continue')}
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
  const { t } = useTranslation();
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
        <Button onClick={goBack}>{t('back')}</Button>
        <Button color="primary" onClick={submit}>
          {t('restore')}
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
  const { t } = useTranslation();

  return (
    <CardContent>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {t('derivable_account')}
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
                {`m/501'/0'/0/0 (${t('deprecated')})`}
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

const PassPhrase = ({ mnemonicAndSeed }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const timer = useRef(null);

  if (!mnemonicAndSeed) {
    return <LoadingIndicator />;
  }

  const handleOpen = () => {
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(false);
    }, 8000);
  };

  const handleHide = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };

  return (
    <div className="passphrase mb-8">
      {!visible && (
        <div className="passphrase__overlay">
          <span data-testid="show-secret" onClick={handleOpen}>
            <LockOpenOutlined
              titleAccess="Show your secret key"
              color="disabled"
            />
            {t('click_view_secret_key')}
          </span>
        </div>
      )}
      {visible && (
        <span data-testid="hide-secret" onClick={handleHide} className='passphrase__quick-hide'>
          <LockOutlined titleAccess='Hide your secret key' color="disabled" />
        </span>
      )}
      <div data-testid="secret-key" className='passphrase__value'>
        {mnemonicAndSeed.mnemonic}
      </div>
    </div>
  );
};
