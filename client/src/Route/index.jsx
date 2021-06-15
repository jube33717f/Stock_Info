/**
 * file: Project Router File
 * date: 2021-06-10
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
 import React, { Suspense } from 'react';
 import { Route, HashRouter as Router, Switch } from 'react-router-dom';
 import style from './style.module.scss'
 import { Row, Col } from 'antd';

 const HomePage = React.lazy(() => import('../Pages/Home'));
 const DetailPage = React.lazy(() => import('../Pages/Detail'));
 const LoginPage = React.lazy(() => import('../Pages/Login'))
 const SubscribePage = React.lazy(()=>import('../Pages/Subscribe'))
 const SearchBySymbol = React.lazy(()=>import('../Pages/Result/resultBySymbol'))
 const SearchByKeyword = React.lazy(()=>import('../Pages/Result/resultByKeyword'))
 const Stocks = React.lazy(()=>import('../Pages/Stocks'))
 const RootRouter = (): JSX.Element  =>(
    <Suspense
        fallback={
        /* <------------------------------------ **** Loading Animation START **** ------------------------------------ */
        <div>
        <div>
            <Row className={style.loadingWrapper} align="middle">
                <Col className={style.loadingFormCol}>
                    <div className={style.loadingPageWrapper}>
                        <div className={style.loadingPageTitle}>STOCK INFO</div>
                        <div className={style.loadingAnimation}>
                            <div className={style.cubeGrid}>
                                <div className={style.loadingCube1} />
                                <div className={style.loadingCube2} />
                                <div className={style.loadingCube3} />
                                <div className={style.loadingCube4} />
                                <div className={style.loadingCube5} />
                                <div className={style.loadingCube6} />
                                <div className={style.loadingCube7} />
                                <div className={style.loadingCube8} />
                                <div className={style.loadingCube9} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
    /* <------------------------------------ **** Loading Animation END **** ------------------------------------ */
        }
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