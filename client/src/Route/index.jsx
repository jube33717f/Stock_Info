/**
 * file: Project Router File
 * date: 2021-06-10
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
 import React, { Suspense } from 'react';
 import { Route, HashRouter as Router, Switch } from 'react-router-dom';
 import style from './style.module.scss'


 const HomePage = React.lazy(() => import('../Pages/Home'));
 const DetailPage = React.lazy(() => import('../Pages/Detail'));
 const LoginPage = React.lazy(() => import('../Pages/Login'))
 const SubscribePage = React.lazy(()=>import('../Pages/Subscribe'))
 const SearchBySymbol = React.lazy(()=>import('../Pages/Result/resultBySymbol'))
 const SearchByKeyword = React.lazy(()=>import('../Pages/Result/resultByKeyword'))
 const Stocks = React.lazy(()=>import('../Pages/Stocks'))
 const RootRouter = () =>(
    <Suspense
        fallback={<div>
            loading...
        </div>}
    >
        <Router>
            <Switch>
                <Route path="/" exact component={ HomePage } />
                <Route path='/login' component={ LoginPage } />
                <Route path='/detail' component={ DetailPage  }/>
                <Route path='/subscribe' component={ SubscribePage  }/>
                <Route path='/search-symbol' component={ SearchBySymbol }/>
                <Route path='/search-keyword' component={ SearchByKeyword }/>
                <Route path='/more-stocks' component={Stocks}/>
            </Switch>
        </Router>
    </Suspense>
 )
 
 export default RootRouter;