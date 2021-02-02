import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {CircularProgress, Container, Grid} from "@material-ui/core";
import {Header} from "../components/Header/Header";
import {Route} from 'react-router-dom';
import {Shop} from "../features/Shop/Shop";
import {ShoppingCart} from "../features/ShoppingCart/ShoppingCart";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {addProductsTC, deleteProductsTC, getProductsTC, ProductType} from "./productsReducer";

function App() {
    console.log('render App')
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

    let arrPrice = useMemo( () => {
        return products.map(p => p.price * p.count);
    }, [products])

    let totalPrice = useMemo( () => {
        return arrPrice.reduce((sum, pr) => {
            return sum + pr
        }, 0);
    }, [arrPrice]);

    let [loading, setLoading] = useState(true);

    const productsM = useMemo( () => {
        return products.filter(p => p.count > 0)
    }, [products]);

    console.log(`loading ${loading}`)
    return (
        <div>
            <Header totalPrice={totalPrice}/>
            <Container fixed>
                {loading ? <Grid container justify='center'><CircularProgress/></Grid> :
                    <>
                        <Route exact path={'/'} render={() =>
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

export default App;