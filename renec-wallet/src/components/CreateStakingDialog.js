import { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogForm from './DialogForm';
import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import { useWallet } from '../utils/wallet';
import { Icon, TextInput } from '../components/base';
import { useSnackbar } from 'notistack';
import { useSendTransaction } from '../utils/notifications';

export default function CreateStakingDialog({
  open,
  onClose,
  votePubkey,
  balanceInfo,
}) {
  const wallet = useWallet();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const { amount: balanceAmount, decimals, tokenSymbol } = balanceInfo;
  const [sendTransaction, sending] = useSendTransaction();

  const onSubmit = async () => {
    setLoading(true);
    return sendTransaction(delegateStake(), { onSuccess: onClose });
  };

  const delegateStake = async () => {
    setLoading(true);
    return await wallet.delegateStake(votePubkey, amount * 10 ** decimals);
  };

  const balanceAmountToUserAmount = (balanceAmount, decimals) => {
    return (balanceAmount / Math.pow(10, decimals)).toFixed(decimals);
  };

  return (
    <DialogForm
      open={open}
      onEnter={() => {
        setAmount('');
        setLoading(false);
      }}
      onClose={onClose}
      onSubmit={onSubmit}
      fullWidth
    >
      <DialogTitle>
        <div className="flex space-between mt-8">
          <Typography color="primary" style={{ fontSize: '20px' }}>
            Stake RENEC
          </Typography>
          <Icon icon="close" onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent className="mb-24">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            style={{ flexGrow: 1, fontSize: 16 }}
            component="h2"
          >
            Amount:
          </Typography>
          <TextInput
            fullWidth
            variant="outlined"
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.trim())}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={() =>
                    setAmount(
                      balanceAmountToUserAmount(balanceAmount, decimals),
                    )
                  }
                >
                  MAX
                </Button>
                {tokenSymbol ? tokenSymbol : null}
              </InputAdornment>
            }
          />
        </div>
        <div className="mt-8 mb-24">
          <span>Available: </span>
          <span
            className="bold"
            onClick={() => {
              setAmount(balanceAmountToUserAmount(balanceAmount, decimals));
            }}
          >
            {balanceAmountToUserAmount(balanceAmount, decimals)}
          </span>
          <span> {tokenSymbol || 'RENEC'}</span>
        </div>
        <Button
          style={{ width: '100%' }}
          className="mb-18"
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          disabled={
            Number(amount) <= 0 ||
            Number(amount) > Number(balanceAmountToUserAmount(balanceAmount, decimals)) ||
            loading
          }
        >
          Stake
        </Button>
      </DialogContent>
    </DialogForm>
  );
}
