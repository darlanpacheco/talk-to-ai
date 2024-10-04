kill $(lsof -i :8080)
cd ./backend/
bun index.ts &

sleep 1
cd ../

cd ./frontend/
bun run dev
