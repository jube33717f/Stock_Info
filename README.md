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

and

```bash
cd client && npm i && npm start
```

* example dataset in dir '/server/Data'
* use email/password in user.json to log into and try the service
  

# Tech/framework used
Client Side:
* React JS
* SASS

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
- `client`: Starting point for the frontend
- `server`: Starting point for the database
  
client
src/
```
┣ Apis/
┃ ┗ index.js
┣ Asserts/
┃ ┣ bg.png
┃ ┣ galaxy.jpg
┃ ┣ iss.jpg
┃ ┣ moon.jpg
┃ ┗ space.jpg
┣ Components/
┃ ┣ HistoryTable/
┃ ┃ ┣ index.jsx
┃ ┃ ┗ style.module.scss
┃ ┣ LineChart/
┃ ┃ ┗ index.jsx
┃ ┣ Nav/
┃ ┃ ┣ index.jsx
┃ ┃ ┗ style.module.scss
┃ ┗ StockCard/
┃   ┣ index.jsx
┃   ┗ style.module.scss
┣ Containers/
┃ ┣ index.jsx
┃ ┗ style.module.scss
┣ Pages/
┃ ┣ Detail/
┃ ┃ ┣ index.jsx
┃ ┃ ┗ style.module.scss
┃ ┣ Home/
┃ ┃ ┣ index.jsx
┃ ┃ ┗ style.module.scss
┃ ┣ Login/
┃ ┃ ┣ index.jsx
┃ ┃ ┗ style.module.scss
┃ ┣ Result/
┃ ┃ ┣ resultByKeyword.jsx
┃ ┃ ┣ resultBySymbol.jsx
┃ ┃ ┗ style.module.scss
┃ ┣ Stocks/
┃ ┃ ┣ index.jsx
┃ ┃ ┗ style.module.scss
┃ ┗ Subscribe/
┃   ┣ index.jsx
┃   ┗ style.module.scss
┣ Route/
┃ ┣ index.jsx
┃ ┗ style.module.scss
┣ .env
┣ apollo.config.js
┣ cache.js
┣ index.js
┣ reportWebVitals.js
┣ setupTests.js
┗ style.scss
```


server
src/
```
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
