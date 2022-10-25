---
title: Staking on Renec
---

_Note before reading: All references to increases in values are in absolute
terms with regards to balance of RENEC.
This document makes no suggestion as to the monetary value of RENEC at any time._

By staking your RENEC tokens, you help secure the network and
[earn rewards](implemented-proposals/staking-rewards.md) while doing so.

You can stake by delegating your tokens to validators who process transactions and run the network.

Delegating stake is a shared-risk shared-reward financial model that may provide
returns to holders of tokens delegated for a long period.
This is achieved by aligning the financial incentives of the token-holders
(delegators) and the validators to whom they delegate.

The more stake delegated to a validator, the more often this validator
is chosen to write new transactions to the ledger. The more transactions
the validator writes, the more rewards the validator and its delegators earn.
Validators who configure their systems to be able to process more transactions
earn proportionally more rewards and
because they keep the network running as fast and as smoothly as possible.

Validators incur costs by running and maintaining their systems, and this is
passed on to delegators in the form of a fee collected as a percentage of
rewards earned. This fee is known as a _commission_. Since validators earn more
rewards the more stake is delegated to them, they may compete with one another
to offer the lowest commission for their services.

You risk losing tokens when staking through a process known as
_slashing_. Slashing involves the removal and destruction of a portion of a
validator's delegated stake in response to intentional malicious behavior,
such as creating invalid transactions or censoring certain types of transactions
or network participants.

When a validator is slashed, all token holders who have delegated stake to that
validator lose a portion of their delegation. While this means an immediate
loss for the token holder, it also is a loss of future rewards for the validator
due to their reduced total delegation. More details on the slashing roadmap can
be found
[here](proposals/optimistic-confirmation-and-slashing.md#slashing-roadmap).

Rewards and slashing align validator and token holder interests which helps keep the network
secure, robust and performant.


## How do I stake my RENEC tokens?

You can stake RENEC by moving your tokens
into RENEC wallet web https://wallet.renec.foundation or RENEC wallet extension on Chrome or stake by using Renec command line tool.

### Stake RENEC on RENEC wallet
#### Select the Staking menu

![](https://img-portal-prod.s3.amazonaws.com/uploads/image/attachment/54379/3.png)

#### Select your validator that you trust the most

![](https://img-portal-prod.s3.amazonaws.com/uploads/image/attachment/73327/Screen_Shot_2022-10-23_at_13.10.55.png)

#### Select the amount of RENEC you want to stake and press the "Stake" button.

![](https://img-portal-prod.s3.amazonaws.com/uploads/image/attachment/54381/5.png)

### Stake RENEC using command line tool
Renec command line tools can perform all stake operations in conjunction
  with a CLI-generated keypair file wallet, a paper wallet, or with a connected
  Ledger Nano.
  [Staking commands using the Renec Command Line Tools](cli/delegate-stake.md).

#### Create a Stake Account

Follow the wallet's instructions for creating a staking account.  This account
will be of a different type than one used to simply send and receive tokens.

#### Select a Validator

Follow the wallet's instructions for selecting a validator.  You can get
information about potentially performant validators from the links below.
The Renec Foundation does not recommend any particular validator.

To view block production statistics, use the Renec command-line tools:

- `renec validators`
- `renec block-production`

The Renec team does not make recommendations on how to interpret this
information. Do your own due diligence.

#### Delegate your Stake

Follow the wallet's instructions for delegating your to your chosen validator.

## Stake Account Details

For more information about the operations and permissions associated with a
stake account, please see [Stake Accounts](staking/stake-accounts.md)
