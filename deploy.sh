#!/usr/bin/env bash
# Commit, push, then rebuild & restart the Docker stack.
#
# Usage:
#   ./deploy.sh "your commit message"
#   ./deploy.sh                      # uses a timestamped default message
#   ./deploy.sh --no-docker "msg"    # git only
#   ./deploy.sh --docker-only        # skip git, just rebuild containers

set -euo pipefail

cd "$(dirname "$0")"

RUN_GIT=true
RUN_DOCKER=true

while [[ "${1:-}" == --* ]]; do
  case "$1" in
    --no-docker)   RUN_DOCKER=false ;;
    --docker-only) RUN_GIT=false ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
  shift
done

MESSAGE="${1:-Update $(date '+%Y-%m-%d %H:%M:%S')}"

if $RUN_GIT; then
  echo ">> git add ."
  git add .

  if git diff --cached --quiet; then
    echo ">> Nothing to commit, skipping commit."
  else
    echo ">> git commit -m \"$MESSAGE\""
    git commit -m "$MESSAGE"
  fi

  echo ">> git push"
  git push
fi

if $RUN_DOCKER; then
  echo ">> docker compose up -d --build"
  docker compose up -d --build

  echo ">> docker compose ps"
  docker compose ps
fi

echo ">> Done."
