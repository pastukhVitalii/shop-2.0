import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../../app/App.css';
import {CircularProgress, Container, Grid} from "@material-ui/core";
import {Header} from "../../components/Header/Header";
import {NavLink, Route} from 'react-router-dom';
import {Shop} from "../Shop/Shop";
import {ShoppingCart} from "../ShoppingCart/ShoppingCart";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addProductsTC, deleteProductsTC, getProductsTC, ProductType} from "../../app/productsReducer";
import Register from "../Register/Register";
import Login from '../Login/Login';

const App = (React.memo(function () {
console.log('render App Shop')
const products = useSelector<AppRootStateType, Array<ProductType>>(state => state.products)

const dispatch = useDispatch()

useEffect(() => {
    dispatch(getProductsTC());
    setTimeout(() => {
        setLoading(false);
    }, 500)
}, [dispatch]);

const addProduct = useCallback(function (products: ProductType) {
    const thunk = addProductsTC(products);
    dispatch(thunk);
}, [dispatch, products]);

const deleteProducts = useCallback(function (products: ProductType) {
    const thunk = deleteProductsTC(products);
    dispatch(thunk);
}, [dispatch, products]);

let arrPrice = useMemo(() => {
    return products.map(p => p.price * p.count);
}, [products])

let totalPrice = useMemo(() => {
    return arrPrice.reduce((sum, pr) => {
        return sum + pr
    }, 0);
}, [arrPrice]);

let [loading, setLoading] = useState(true);

const productsM = useMemo(() => {
    return products.filter(p => p.count > 0)
}, [products]);

console.log(`loading ${loading}`)
return (
    <div>
        <Header totalPrice={totalPrice}/>
        <Container fixed>
            <Route path='/' render={() => <div>
                <NavLink to={'/login'}> Sign in </NavLink>
                <div>or</div>
                <NavLink to={'/register'}> Sign up </NavLink>
            </div>} exact={true}/>
            <Route path={'/login'} render={() =>
                <Login/>}
            />
            <Route path={'/register'} render={() =>
                <Register/>}
            />
            {loading ? <Grid container justify='center'><CircularProgress/></Grid> :
                <><span className={'log_out'} onClick={() => alert('aa')/*logOutCallback*/}>Log out</span>
                    <Route exact path={'/shop'} render={() =>
                        <Shop products={products}
                              addProducts={addProduct}/>}
                    />
                    <Route exact path={'/shoppingCart'} render={() =>
                        <ShoppingCart products={productsM}
                                      addProducts={addProduct}
                                      deleteProducts={deleteProducts}/>}
                    />
                </>}
        </Container>
    </div>
);
    }
))

export default App;