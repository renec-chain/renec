import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';
import Icon from '../atoms/icon';

const ConfirmDialog = ({ title, warningMessage, open, onClose, onConfirm, testID }) => {
  return (
    <Dialog data-testid={testID} open={open}>
      <DialogTitle>
        <div className="flex space-between">
          <span>{title}</span>
          <Icon icon="close" onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <span>{warningMessage}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
