#!/bin/sh
set -e

# When a volume mount (e.g. - ./public/uploads:/app/public/uploads) is mounted from the host,
# it may be owned by root or another UID. Fix permissions so nextjs can always write files.
mkdir -p /app/public/uploads/resumes /app/public/uploads/international-documents 2>/dev/null || true
chown -R nextjs:nodejs /app/public/uploads 2>/dev/null || true
chmod -R 777 /app/public/uploads 2>/dev/null || true

# If the command starts with node or npm, run it as the nextjs user
if [ "$1" = "node" ] || [ "$1" = "npm" ]; then
  exec su-exec nextjs "$@"
fi

exec "$@"
