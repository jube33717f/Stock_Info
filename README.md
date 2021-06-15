<h1 align="center">
  Stock Info
  <br>
  <img src="https://img.onl/9T2MYo" alt="stock info logo" title="Stock Info logo" width="70">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">Search and Subscribe Stocks Info </p>

> Author: Jubi
> 
> Last edit date: 2021.6.13
>
> Description: Stock Info
>
> Link on [here](https://stock-info-six.vercel.app/)

# Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd server && npm i && npm start
```

and(

```bash
cd client && npm i && npm start
```

or 
```bash
cd client_ts && npm i && npm start
```
)

* example dataset in dir '/server/Data'
* use email/password in '/server/Data/user.json' to log into and try the service
  

# Tech/framework used
Client Side:
* React JS
* Typescript
* SASS
* Material-UI

Server Side:
* Apollo graphql
  

# Feature

- Top 500 stock lists(database)
    * search by symbol
    * search by keyword
    * login to subscribe
- Login (database)
- Subscribe (database) 
  * remove subscribed stock
- Stock half year history price(third party api)
  * table and line chart
- Responsive  Design


# File structure
The app is split out into two folders:

- `client_ts`: Starting point for the frontend<ts version>     (- `client`: Starting point for the frontend<js version>)
- `server`: Starting point for the database
  
client_ts
```
src/
┣ Apis/
┃ ┗ index.ts
┣ Asserts/
┃ ┗ bg.png
┣ Components/
┃ ┣ HistoryTable/
┃ ┃ ┣ index.tsx
┃ ┃ ┗ style.module.scss
┃ ┣ LineChart/
┃ ┃ ┗ index.jsx
┃ ┣ Nav/
┃ ┃ ┣ index.tsx
┃ ┃ ┗ style.module.scss
┃ ┗ StockCard/
┃   ┣ index.tsx
┃   ┗ style.module.scss
┣ Containers/
┃ ┣ index.tsx
┃ ┗ style.module.scss
┣ Pages/
┃ ┣ Detail/
┃ ┃ ┣ __generated__/
┃ ┃ ┃ ┣ booking.ts
┃ ┃ ┃ ┣ getStocksBySymbol.ts
┃ ┃ ┃ ┗ isStockBookedByUser.ts
┃ ┃ ┣ index.tsx
┃ ┃ ┗ style.module.scss
┃ ┣ Home/
┃ ┃ ┣ __generated__/
┃ ┃ ┃ ┗ getStocksBySector.ts
┃ ┃ ┣ index.tsx
┃ ┃ ┗ style.module.scss
┃ ┣ Login/
┃ ┃ ┣ __generated__/
┃ ┃ ┃ ┗ LOGIN.ts
┃ ┃ ┣ index.tsx
┃ ┃ ┗ style.module.scss
┃ ┣ Result/
┃ ┃ ┣ __generated__/
┃ ┃ ┃ ┗ searchStockByName.ts
┃ ┃ ┣ resultByKeyword.tsx
┃ ┃ ┣ resultBySymbol.tsx
┃ ┃ ┗ style.module.scss
┃ ┣ Stocks/
┃ ┃ ┣ __generated__/
┃ ┃ ┃ ┗ getStocks.ts
┃ ┃ ┣ index.tsx
┃ ┃ ┗ style.module.scss
┃ ┗ Subscribe/
┃   ┣ __generated__/
┃ ┃ ┃ ┣ cancelSubscribe.ts
┃ ┃ ┃ ┗ getSubscribes.ts
┃   ┣ index.tsx
┃   ┗ style.module.scss
┣ Route/
┃ ┣ index.tsx
┃ ┗ style.module.scss
┣ cache.ts
┣ index.tsx
┣ logo.svg
┣ react-app-env.d.ts
┣ reportWebVitals.js
┣ setupTests.js
┗ style.scss
```


server
```
src/
┣ datasources/
┃ ┣ stock.js
┃ ┗ user.js
┣ engine-demo.js
┣ index.js
┣ resolvers.js
┣ schema.js
┗ utils.js
```

# View
![Home](https://imgur.com/JsvifII.jpg)
![Home](https://imgur.com/z5qaYMw.jpg)
![Login](https://imgur.com/KVLuLss.jpg)
![Detail](https://imgur.com/l6kJp8M.jpg)
![Detail](https://imgur.com/aPBbfcA.jpg)
![Subscribe](https://imgur.com/vcFnshi.jpg)
![More](https://imgur.com/9wQej0T.jpg)
