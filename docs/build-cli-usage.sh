#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"
cargo=../cargo

# shellcheck source=ci/rust-version.sh
source ../ci/rust-version.sh stable

: "${rust_stable:=}" # Pacify shellcheck

# pre-build with output enabled to appease Travis CI's hang check
"$cargo" build -p renec-cli

usage=$("$cargo" stable -q run -p renec-cli -- -C ~/.foo --help | sed -e 's|'"$HOME"'|~|g' -e 's/[[:space:]]\+$//')

out=${1:-src/cli/usage.md}

cat src/cli/.usage.md.header > "$out"

section() {
  declare mark=${2:-"###"}
  declare section=$1
  read -r name rest <<<"$section"

  printf '%s %s
' "$mark" "$name"
  printf '```text
%s
```

' "$section"
}

section "$usage" >> "$out"

usage=$(sed -e '/^ \{5,\}/d' <<<"$usage")

in_subcommands=0
while read -r subcommand rest; do
  [[ $subcommand == "SUBCOMMANDS:" ]] && in_subcommands=1 && continue
  if ((in_subcommands)); then
      section "$("$cargo" stable -q run -p renec-cli -- help "$subcommand" | sed -e 's|'"$HOME"'|~|g' -e 's/[[:space:]]\+$//')" "####" >> "$out"
  fi
done <<<"$usage">>"$out"
