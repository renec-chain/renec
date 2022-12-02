---
title: Validator Automation Deployment
---

## Deployment
Those are bunch of script to deploy RENEC validator automatically. You don't need to care about install RENEC tool suite, create executable files for renec and renec-sys-tuner. All you need to do is clone [RENEC validator repo](https://github.com/renec-chain/renec-validator) and do exactly 4 steps:
1. Install ruby on your local machine https://www.ruby-lang.org/en/documentation/installation/
2. Run `bundle install` to install needed gems
3. Add/update server on `config/deploy/renec.rb`
4. Run `bin/deploy` to start deploying

## Setup vote account
After deploying successfully, your node can work as a RPC node but not validator, to make your node become a validator, you need to do some steps:
1. Deposit some RENEC to `~/renec-cluster/keypairs/validator-identity.json` for voting fee and execution fee.
2. Set validator-identity as execution keypair
```bash
renec config set --keypair ~/renec-cluster/keypairs/validator-identity.json
```
3. Create vote account
```bash
renec create-vote-account ~/renec-cluster/keypairs/validator-vote-account.json ~/renec-cluster/keypairs/validator-identity.json ~/renec-cluster/keypairs/validator-withdrawer.json
```

Tada, your validator is up, you can see your validator by command:
```bash
renec validators
```

### Note: 
If you have finished those above steps, you dont' need to care about `Install RENEC Tool Suite`, `Starting validator`, `Vote Account Management` sections below.