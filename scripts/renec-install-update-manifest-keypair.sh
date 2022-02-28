#!/usr/bin/env bash
#
# Creates update_manifest_keypair.json based on the current platform and
# environment
#
set -e

OS=${1:-linux}

case "$OS" in
osx)
  TARGET=$(uname -m)-apple-darwin
  ;;
linux)
  TARGET=x86_64-unknown-linux-gnu
  ;;
windows)
  TARGET=x86_64-pc-windows-msvc
  ;;
*)
  TARGET=unknown-unknown-unknown
  ;;
esac

RENEC_INSTALL_UPDATE_MANIFEST_KEYPAIR="RENEC_INSTALL_UPDATE_MANIFEST_KEYPAIR_${TARGET//-/_}"

# shellcheck disable=2154 # is referenced but not assigned
if [[ -z ${!RENEC_INSTALL_UPDATE_MANIFEST_KEYPAIR} ]]; then
  echo "$RENEC_INSTALL_UPDATE_MANIFEST_KEYPAIR not defined"
  exit 1
fi

echo "${!RENEC_INSTALL_UPDATE_MANIFEST_KEYPAIR}" > update_manifest_keypair.json
ls -l update_manifest_keypair.json
