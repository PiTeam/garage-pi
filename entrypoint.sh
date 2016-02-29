#!/bin/sh


[ -f data/users.db ] || npm run manage add user data/initial-admin-user.json
[ -f data/doors.db ] || npm run manage add door data/initial-door.json
[ -f dist/server.js ] || npm run build

NODE_ENV=production node dist/server.js
