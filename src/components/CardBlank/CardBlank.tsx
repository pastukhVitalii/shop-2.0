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
import {ProductType} from '../../BLL-redux/productsReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            width: '60%',
            margin: '0 auto',
            height: '170px',
        },
    }),
);

export type PropsType = {
    products: ProductType,
    addProducts: (products: ProductType) => void
    setAlert: (alert: boolean) => void
}
export type CardType = {
    onAddItem?: () => void,
    onDeleteItem?: () => void,
}

export const CardBlank = React.memo(function (props: PropsType & CardType) {
        console.log('render Card')
        const inCart = props.products.count > 0;
        const color = inCart ? 'secondary' : 'primary';
        const disable = inCart;
        const classes = useStyles();

        let onAddItem = () => {
            props.addProducts(props.products);
            props.setAlert(true);
            setTimeout(() => {
                props.setAlert(false);
            }, 1500);
        }
        return (
            <Card className={classes.root}>
                <CardHeader
                    title={props.products.title}
                />
                <CardMedia
                    className={classes.media}
                    image={props.products.urlImg}
                    title={props.products.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        We is passionate about technology and driven by innovation.
                        We dream, we dare and we strive to create an effortless and joyful digital life for everyone.
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