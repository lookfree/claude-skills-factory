#!/usr/bin/env bash
set -euo pipefail

echo "== Host Snapshot =="
echo "Time: $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo "Host: $(hostname)"
echo "OS: $(uname -srm)"
echo

if command -v tmux >/dev/null 2>&1; then
  echo "== tmux sessions =="
  tmux list-sessions 2>/dev/null || echo "No tmux sessions"
  echo
fi

case "$(uname -s)" in
  Linux)
    echo "== uptime =="
    uptime || true
    echo

    echo "== disk =="
    df -h || true
    echo

    echo "== memory =="
    free -h || true
    echo

    echo "== login history =="
    last -n 10 || true
    echo

    echo "== current users =="
    who || true
    echo

    echo "== listening ports =="
    ss -tulpn || true
    echo

    echo "== top cpu processes =="
    ps aux --sort=-%cpu | head -n 15 || true
    echo

    if command -v systemctl >/dev/null 2>&1; then
      echo "== failed services =="
      systemctl --failed || true
      echo
    fi
    ;;
  Darwin)
    echo "== uptime =="
    uptime || true
    echo

    echo "== disk =="
    df -h || true
    echo

    echo "== memory =="
    vm_stat || true
    echo

    echo "== login history =="
    last -10 || true
    echo

    echo "== listening ports =="
    lsof -i -P -n | head -n 50 || true
    echo

    echo "== top cpu processes =="
    ps aux | sort -nrk 3 | head -n 15 || true
    echo
    ;;
  *)
    echo "Unsupported OS: $(uname -s)"
    ;;
esac
