import React from 'react';
import {Button, Paper, TextField} from "@material-ui/core";
import {Field, InjectedFormProps, reduxForm, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {ProductType} from "../../app/productsReducer";
import {email, maxLengthCreator, number, required} from "./validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    label: string
    name: string
    input: WrappedFieldProps
}

const renderTextField: React.FC<FormControlPropsType> = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
    <><TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        variant={"filled"}
        helperText={touched && error}
        {...input}
        {...custom}
        style={{'margin': '20px ', 'width': 'calc(100% - 40px)'}}
    />
        {/*{touched && error? alert(error): ''}*/}
    </>
)
const maxLength10 = maxLengthCreator(10);

const Form = React.memo(function (props: any) {
    console.log('render Form')
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div style={{width: '100%', marginTop: '30px',}}>
                <Paper>
                    <Field name="firstName" component={renderTextField} label="First Name"
                           validate={[required, maxLength10]}/>
                    <Field name="lastName" component={renderTextField} label="Last Name"
                           validate={[required, maxLength10]}/>
                    <Field name="email" component={renderTextField} label="Email"
                           validate={[required, email]}/>
                    <Field name="phoneNumber" component={renderTextField} label="Phone Number"
                           validate={[required, maxLength10, number]}/>
                    <Button variant="contained" color="primary" type="submit"
                            style={{'margin': '20px ', 'width': 'calc(100% - 40px)'}}>
                        Send
                    </Button>
                </Paper>
            </div>
        </form>
    );
});

type PropsType = {
    products: Array<ProductType>
}

type ValueType = {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
}

const ReduxForm = reduxForm<ValueType>({form: 'login'})(Form);

export const OrderForm = function (props: PropsType) {

    const onSubmit = (values: ValueType) => {
        if (props.products.length === 0) {
            alert('Cart is empty!')
        } else {
            let customer = JSON.stringify(values, null, 2);
            let products = JSON.stringify(props.products);
            alert(`Order ${customer} ${products}`);
            saveProducts(products);
        }
    }

    const saveProducts = (products: string) => {
        let stateAsString = JSON.stringify(products);
        localStorage.setItem('products', stateAsString);
    };
    return (
        <ReduxForm onSubmit={onSubmit}/>
    )
};

