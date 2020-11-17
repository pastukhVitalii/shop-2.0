import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    createStyles,
    Grid,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {ProductType} from '../../app/productsReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
    }),
);

export type PropsType = {
    products: ProductType,
    addProducts: (products: ProductType) => void
}
export type CardType = {
    onAddItem?: () => void,
    onDeleteItem?: () => void,
}

export const MyCard = React.memo(function (props: PropsType & CardType) {
        console.log('render Card')
        const inCart = props.products.count > 0;
        const color = inCart ? 'secondary' : 'primary';
        const disable = inCart;
        const classes = useStyles();

        let onAddItem = () => {
            props.addProducts(props.products);
        }
        return (
            <Card className={classes.root}>
                <CardHeader
                    title={props.products.title}
                    // subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title={props.products.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.ddsdsdsdddd
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify={"space-between"} alignItems={"center"}>
                        <Button variant={"contained"} onClick={onAddItem} color={color} disabled={disable}
                                startIcon={<AddShoppingCartIcon/>} size={"large"}>
                            {inCart ? 'In cart' : 'Buy'}
                        </Button>
                        <span>{props.products.price} $</span>
                    </Grid>
                </CardActions>
            </Card>
        );
    }
);