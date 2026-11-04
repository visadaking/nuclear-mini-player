#!/bin/sh
# Pure-Wayland path for the detached mini player (KDE): the compositor owns
# position and keep-above on Wayland, so a client cannot set those itself.
# KWin Window Rules can, and this script writes one: keep-above forced for the
# detached surfaces (they are titled "Nuclear Mini Player"; the main window,
# titled plain "Nuclear", is not matched).
#
#   ./kwin-mini-rules.sh            write the rule
#   ./kwin-mini-rules.sh --remove   remove it again
#
# GUI equivalent: System Settings -> Window Management -> Window Rules, match
# window title exactly "Nuclear Mini Player", force "Keep above" to Yes.

set -eu

GROUP="NuclearMiniPlayerKeepAbove"
KWINRC="${KWINRC:-kwinrulesrc}"

rule_kv() {
  kwriteconfig6 --file "$KWINRC" --group "$GROUP" --key "$1" "$2"
}

remove_kv() {
  kreadconfig6 --file "$KWINRC" --group "$GROUP" --key "$1" >/dev/null 2>&1 || true
}

add_rule() {
  rule_kv "$GROUP" description "Nuclear detached mini player: keep above"
  rule_kv "$GROUP" enabled true
  rule_kv "$GROUP" types "2,32"
  rule_kv "$GROUP" titlematch 1
  rule_kv "$GROUP" title "Nuclear Mini Player"
  rule_kv "$GROUP" keepAbove true
  rule_kv "$GROUP" keepAboverule 2
  echo "KWin rule written: keep above forced for 'Nuclear Mini Player'."
  echo "Reload the rule set with: qdbus org.kde.KWin /KWin reconfigure"
}

remove_rule() {
  for key in description enabled types titlematch title keepAbove keepAboverule; do
    kwriteconfig6 --file "$KWINRC" --group "$GROUP" --key "$key" --delete 2>/dev/null || true
  done
  echo "KWin rule keys removed for '$GROUP' (an empty group line may remain in"
  echo "kwinrulesrc; the KWin GUI cleans it on its next save)."
  echo "Reload with: qdbus org.kde.KWin /KWin reconfigure"
}

case "${1-}" in
  --remove)
    remove_rule
    exit 0
    ;;
  "")
    add_rule
    exit 0
    ;;
  *)
    echo "usage: $0 [--remove]" >&2
    exit 2
    ;;
esac
