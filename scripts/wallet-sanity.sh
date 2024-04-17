#!/usr/bin/env bash
#
# renec-cli integration sanity test
#
set -e

cd "$(dirname "$0")"/..

# shellcheck source=multinode-demo/common.sh
source multinode-demo/common.sh

if [[ -z $1 ]]; then # no network argument, use localhost by default
  args=(--url http://127.0.0.1:8899)
else
  args=("$@")
fi

args+=(--keypair "$SOLANA_CONFIG_DIR"/faucet.json)

node_readiness=false
timeout=60
while [[ $timeout -gt 0 ]]; do
  set +e
  output=$($renec_cli "${args[@]}" transaction-count --commitment finalized)
  rc=$?
  set -e
  if [[ $rc -eq 0 && -n $output ]]; then
    node_readiness=true
    break
  fi
  sleep 2
  (( timeout=timeout-2 ))
done
if ! "$node_readiness"; then
  echo "Timed out waiting for cluster to start"
  exit 1
fi

(
  set -x
  $renec_cli "${args[@]}" address
  $renec_cli "${args[@]}" balance
  $renec_cli "${args[@]}" ping --count 5 --interval 0
  $renec_cli "${args[@]}" balance
)

echo PASS
exit 0
