#!/bin/sh
# The XWayland workaround for the Nuclear flatpak: GTK manages popups and window
# flags normally under XWayland, which is the most reliable fix for detached
# mini-player windows today. The override is user-level, so no sudo is needed.
#
#   ./flatpak-x11-override.sh          turn the override on
#   ./flatpak-x11-override.sh --undo   turn it off again
#   ./flatpak-x11-override.sh --status what is set right now
#
# Flatseal equivalent: Variables -> GIO_MODULE? no: set environment variable
# GDK_BACKEND=x11 on com.nuclearplayer.Nuclear.

set -eu

APP_ID="com.nuclearplayer.Nuclear"

undo() {
  flatpak override --user --remove-env=GDK_BACKEND "$APP_ID"
  echo "GDK_BACKEND override removed from $APP_ID (user level)."
}

status() {
  echo "user overrides for $APP_ID:"
  if [ -f "$HOME/.local/share/flatpak/overrides/$APP_ID" ]; then
    cat "$HOME/.local/share/flatpak/overrides/$APP_ID"
  else
    echo "(none)"
  fi
}

case "${1-}" in
  --undo)
    undo
    exit 0
    ;;
  --status)
    status
    exit 0
    ;;
  "")
    ;;
  *)
    echo "usage: $0 [--undo|--status]" >&2
    exit 2
    ;;
esac

flatpak override --user --env=GDK_BACKEND=x11 "$APP_ID"
echo "GDK_BACKEND=x11 set for $APP_ID at the user level."
echo "Fully quit Nuclear (not just the window) and start it again, then enable"
echo "\"Always pop out\" for the detached player in the plugin settings."
status
