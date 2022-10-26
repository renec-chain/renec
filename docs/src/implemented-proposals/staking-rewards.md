---
title: Staking Rewards
---

A Proof of Stake \(PoS\), \(i.e. using in-protocol asset, RENEC, to provide secure consensus\) design is outlined here. Renec implements a proof of stake reward/security scheme for validator nodes in the cluster. The purpose is threefold:

- Align validator incentives with that of the greater cluster through skin-in-the-game deposits at risk

- Avoid 'nothing at stake' fork voting issues by implementing slashing rules aimed at promoting fork convergence

- Provide an avenue for validator rewards provided as a function of validator participation in the cluster.

While many of the details of the specific implementation are currently under consideration and are expected to come into focus through specific modeling studies and parameter exploration on the Renec testnet, we outline here our current thinking on the main components of the PoS system. Much of this thinking is based on the current status of Casper FFG, with optimizations and specific attributes to be modified as is allowed by Renec's Proof of History \(PoH\) blockchain data structure.

### Staking Yield [%]

Inflation rate is the Renec protocol will automatically create new tokens on a predetermined inflation schedule (discussed below). The _Inflation Rate [%]_ is the annualized growth rate of the _Total Current Supply_ at any point in time. **In RENEC blockchain inflation rate is fixed at 4.5% a year.**

The rate of return (aka _interest_) earned on RENEC staked on the network. It is often quoted as an annualized rate (e.g. "the network _staking yield_ is currently $4.5\%$ per year").

- _Staking yield_ is of great interest to validators and token holders who wish to delegate their tokens to avoid token dilution due to inflation (the extent of which is discussed below).
- $100\%$ of inflationary issuances are to be distributed to staked token-holders in proportion to their staked RENEC and to validators who charge a commission on the rewards earned by their delegated RENEC.
- _Staking yield_ can be calculated from the _Inflation Schedule_ along with the fraction of the _Total Current Supply_ that is staked at any given time. The explicit relationship is given by:

$$
\begin{aligned}
\text{Staking Yield} =~&\text{Inflation Rate(4.5\%)}\times\text{Validator Uptime}~\times \\
&\left( 1 - \text{Validator Fee} \right) \times \left( \frac{1}{\%~\text{RENEC Staked}} \right) \\
\text{where:}\\
\%~\text{RENEC Staked} &= \frac{\text{Total RENEC Staked}}{\text{Total Current Supply}}
\end{aligned}
$$
## General Overview

Renec's ledger validation design is based on a rotating, stake-weighted selected leader broadcasting transactions in a PoH data structure to validating nodes. These nodes, upon receiving the leader's broadcast, have the opportunity to vote on the current state and PoH height by signing a transaction into the PoH stream.

To become a Renec validator, one must deposit/lock-up some amount of RENEC in a contract. This RENEC will not be accessible for a specific time period. The precise duration of the staking lockup period has not been determined. However we can consider three phases of this time for which specific parameters will be necessary:

- _Warm-up period_: which RENEC is deposited and inaccessible to the node, however PoH transaction validation has not begun. Most likely on the order of days to weeks

- _Validation period_: a minimum duration for which the deposited RENEC will be inaccessible, at risk of slashing \(see slashing rules below\) and earning rewards for the validator participation. Likely duration of months to a year.

- _Cool-down period_: a duration of time following the submission of a 'withdrawal' transaction. During this period validation responsibilities have been removed and the funds continue to be inaccessible. Accumulated rewards should be delivered at the end of this period, along with the return of the initial deposit.

Renec's trustless sense of time and ordering provided by its PoH data structure, along with its [turbine](https://www.youtube.com/watch?v=qt_gDRXHrHQ&t=1s) data broadcast and transmission design, should provide sub-second transaction confirmation times that scale with the log of the number of nodes in the cluster. This means we shouldn't have to restrict the number of validating nodes with a prohibitive 'minimum deposits' and expect nodes to be able to become validators with nominal amounts of RENEC staked. At the same time, Renec's focus on high-throughput should create incentive for validation clients to provide high-performant and reliable hardware. Combined with potential a minimum network speed threshold to join as a validation-client, we expect a healthy validation delegation market to emerge.

## Penalties

As discussed in the [Economic Design](ed_overview/ed_overview.md) section, annual validator interest rates are to be specified as a function of total percentage of circulating supply that has been staked. The cluster rewards validators who are online and actively participating in the validation process throughout the entirety of their _validation period_. For validators that go offline/fail to validate transactions during this period, their annual reward is effectively reduced.

Similarly, we may consider an algorithmic reduction in a validator's active amount staked amount in the case that they are offline. I.e. if a validator is inactive for some amount of time, either due to a partition or otherwise, the amount of their stake that is considered ‘active’ \(eligible to earn rewards\) may be reduced. This design would be structured to help long-lived partitions to eventually reach finality on their respective chains as the % of non-voting total stake is reduced over time until a supermajority can be achieved by the active validators in each partition. Similarly, upon re-engaging, the ‘active’ amount staked will come back online at some defined rate. Different rates of stake reduction may be considered depending on the size of the partition/active set.
