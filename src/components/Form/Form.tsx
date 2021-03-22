import { Button, Paper } from '@material-ui/core';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { ProductType } from '../../BLL-redux/productsReducer';
import { renderTextField } from './RenderTextField';
import { email, maxLengthCreator, number, required } from './validators';

const maxLength10 = maxLengthCreator(10);

const Form = React.memo(function (props: any) {
  console.log('render Form');
  const { handleSubmit } = props;

  const handleScroll = (e: any) => {
    alert(e.target);
  };

  return (
    <form onSubmit={handleSubmit} onScroll={handleScroll}>
      <div style={{ width: '100%', marginTop: '30px' }}>
        <Paper onScroll={() => alert('j')}>
          <Field
            name="firstName"
            component={renderTextField}
            label="First Name"
            validate={[required, maxLength10]}
          />
          <Field
            name="lastName"
            component={renderTextField}
            label="Last Name"
            validate={[required, maxLength10]}
          />
          <Field
            name="email"
            component={renderTextField}
            label="Email"
            validate={[required, email]}
          />
          <Field
            name="phoneNumber"
            component={renderTextField}
            label="Phone Number"
            validate={[required, maxLength10, number]}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: '20px ', width: 'calc(100% - 40px)' }}
          >
            Send
          </Button>
        </Paper>
      </div>
    </form>
  );
});

type PropsType = {
  products: Array<ProductType>;
};

type ValueType = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const ReduxForm = reduxForm<ValueType>({ form: 'login' })(Form);

const OrderForm = React.memo(function (props: PropsType) {
  const onSubmit = (values: ValueType) => {
    if (props.products.length === 0) {
      alert('Cart is empty!');
    } else {
      let customer = JSON.stringify(values, null, 2);
      let products = JSON.stringify(props.products);
      alert(`Order ${customer} ${products}`);
      saveProducts(products);
    }
  };

  const saveProducts = (products: string) => {
    let stateAsString = JSON.stringify(products);
    localStorage.setItem('products', stateAsString);
  };
  return <ReduxForm onSubmit={onSubmit} />;
});

export default OrderForm;