import React, { useRef } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import RButton from './base/molecules/button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'baseline',
    width: '100%',
  },
  textArea: {
    marginTop: 6,
  },
}));

export default function CopyableDisplay({
  value,
  label,
  autoFocus,
  qrCode,
  helperText,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const textareaRef = useRef();
  const classes = useStyles();
  const copyLink = () => {
    let textArea = textareaRef.current;
    if (textArea) {
      textArea.select();
      document.execCommand('copy');
      enqueueSnackbar(`Copied ${label}`, {
        variant: 'info',
        autoHideDuration: 2500,
      });
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        inputRef={(ref) => (textareaRef.current = ref)}
        multiline
        autoFocus={autoFocus}
        value={value}
        readOnly
        onFocus={(e) => e.currentTarget.select()}
        className={classes.textArea}
        fullWidth
        helperText={helperText}
        spellCheck={false}
      />
      <RButton
        onClick={copyLink}
      >
        Copy
      </RButton>
    </div>
  );
}
