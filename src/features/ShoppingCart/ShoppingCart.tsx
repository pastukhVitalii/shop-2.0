import React from 'react';
import './ShoppingCart.css';
import {Grid} from "@material-ui/core";
import {ShoppingBlank} from "../../components/ShoppingBlank/ShoppingBlank";
import {ProductType} from "../../app/productsReducer";
import {OrderForm} from "../../components/Form/Form";

type PropsType = {
    products: Array<ProductType>
    addProducts: (products: ProductType) => void
    deleteProducts: (products: ProductType) => void
}

export const ShoppingCart = React.memo(function (props: PropsType) {
    console.log('render Shopping Cart')
    const products = props.products.map(p => <ShoppingBlank key={p.id} products={p}
                                                            addProducts={props.addProducts}
                                                            deleteProducts={props.deleteProducts}/>)

    return (
        <Grid container spacing={4}>
            <Grid item xs={8}>
                {products}
            </Grid>
            <Grid item xs={4}>
                <OrderForm products={props.products}/>
            </Grid>
        </Grid>
    );
})