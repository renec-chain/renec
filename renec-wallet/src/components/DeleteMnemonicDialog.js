import React, { useState } from 'react';
import DialogForm from './DialogForm';
import { forgetWallet, normalizeMnemonic, useUnlockedMnemonicAndSeed } from '../utils/wallet-seed';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

export default function DeleteMnemonicDialog({ open, onClose }) {
  const [seedCheck, setSeedCheck] = useState('');
  const [mnemKey] = useUnlockedMnemonicAndSeed();
  const { t } = useTranslation();

  return (
    <>
      <DialogForm
        open={open}
        onClose={onClose}
        onSubmit={() => {
          forgetWallet();
          onClose();
        }}
        fullWidth
      >
        <DialogTitle>{t('delete_mnemonic_and_log_out')}</DialogTitle>
        <DialogContentText style={{ margin: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {t('delete_mnemonic_warn_0')}
            <br />
            <br />
            <strong>
              {t('delete_mnemonic_warn_1')}
            </strong>
          </div>
          <TextField
            label={t('please_type_your_secret_key')}
            fullWidth
            variant="outlined"
            margin="normal"
            value={seedCheck}
            onChange={(e) => setSeedCheck(e.target.value)}
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>{t('close')}</Button>
          <Button
            type="submit"
            color="secondary"
            disabled={normalizeMnemonic(seedCheck) !== mnemKey.mnemonic}
          >
            {t('delete')}
          </Button>
        </DialogActions>
      </DialogForm>
    </>
  );
}
