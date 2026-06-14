#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8899
cd "$DIR"

if ! python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/science-review-server.log 2>&1 & then
  echo "启动失败，请查看 /tmp/science-review-server.log"
  exit 1
fi
SERVER_PID=$!
sleep 0.5

if kill -0 "$SERVER_PID" 2>/dev/null; then
  echo "复习网站已启动：http://127.0.0.1:$PORT/"
  echo "进程 PID: $SERVER_PID"
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://127.0.0.1:$PORT/"
  elif command -v sensible-browser >/dev/null 2>&1; then
    sensible-browser "http://127.0.0.1:$PORT/"
  fi
else
  echo "端口 $PORT 可能被占用。请直接双击打开："
  echo "$DIR/五年级科学复习-双击打开.html"
fi
