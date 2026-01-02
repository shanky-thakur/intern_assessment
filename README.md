react vite frontend
to start: cd frontend -> npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


express backend
to start: cd backend -> node index.js

backend has dependency over these variables as environment
PORT = {choose your port}
MONGODB_URI = {your mongo db uri}
JWT_SECRET = {choose your secret}
HASH_INT = {your value}

the suite for api endpoints 

-------------------------------------------- server health -----------------------------------------

curl --request GET \
  --url http://localhost:3000/ \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Connection: keep-alive' \
  --header 'User-Agent: EchoapiRuntime/1.1.0'

--------------------------------------------- add User ----------------------------------------------

curl --request POST \
  --url http://localhost:3000/user/register \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Connection: keep-alive' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: EchoapiRuntime/1.1.0' \
  --data '{
  "username": "testuser",
  "password": "test123"
}'

---------------------------------------------- login user -----------------------------------------------

curl --request POST \
  --url http://localhost:3000/user/login \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Connection: keep-alive' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: EchoapiRuntime/1.1.0' \
  --data '{
  "username": "testuser",
  "password": "test123"
}'

----------------------------------------------- get all items ---------------------------------------------

curl --request GET \
  --url http://localhost:3000/user/items \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTU3YjkzM2M2Njg4YWMzZDc0YWNjOWMiLCJ1c2VybmFtZSI6InNoYW5reSIsImlhdCI6MTc2NzM1Njc0NSwiZXhwIjoxNzY3MzU4NTQ1fQ.E5_EUpcjBCkJ2HyzITq42fxcS1lPMDR3YFwnZjW0b9c' \
  --header 'Connection: keep-alive' \
  --header 'User-Agent: EchoapiRuntime/1.1.0'

----------------------------------------------- add item --------------------------------------------------

curl --request POST \
  --url http://localhost:3000/user/items \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTU3YjkzM2M2Njg4YWMzZDc0YWNjOWMiLCJ1c2VybmFtZSI6InNoYW5reSIsImlhdCI6MTc2NzM1Njc0NSwiZXhwIjoxNzY3MzU4NTQ1fQ.E5_EUpcjBCkJ2HyzITq42fxcS1lPMDR3YFwnZjW0b9c' \
  --header 'Connection: keep-alive' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: EchoapiRuntime/1.1.0' \
  --data '{
  "name": "harinder",
  "company" : "HP",
  "phone": 9999998888,
  "description": "Gaming Laptop"
}'

----------------------------------------------- update item -----------------------------------------------

curl --request PUT \
  --url http://localhost:3000/user/items/69402173ea368f536883a751 \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTU3YjkzM2M2Njg4YWMzZDc0YWNjOWMiLCJ1c2VybmFtZSI6InNoYW5reSIsImlhdCI6MTc2NzM1Njc0NSwiZXhwIjoxNzY3MzU4NTQ1fQ.E5_EUpcjBCkJ2HyzITq42fxcS1lPMDR3YFwnZjW0b9c' \
  --header 'Connection: keep-alive' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: EchoapiRuntime/1.1.0' \
  --data '{
  "price": 47000,
  "description": "Updated Gaming Laptop"
}'

----------------------------------------------- delete item -----------------------------------------------

curl --request DELETE \
  --url http://localhost:3000/user/items/6940221dea368f536883a756 \
  --header 'Accept: */*' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTU3YjkzM2M2Njg4YWMzZDc0YWNjOWMiLCJ1c2VybmFtZSI6InNoYW5reSIsImlhdCI6MTc2NzM1Njc0NSwiZXhwIjoxNzY3MzU4NTQ1fQ.E5_EUpcjBCkJ2HyzITq42fxcS1lPMDR3YFwnZjW0b9c' \
  --header 'Connection: keep-alive' \
  --header 'User-Agent: EchoapiRuntime/1.1.0'