import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';

import { ProductType } from '../../BLL-redux/products-reducer';
import { maxLengthCreator, required } from '../../utils/validators';
import { useStyles } from './index';

type PropsType = {
  products: Array<ProductType>;
};

export const Form = function (props: PropsType) {
  const classes = useStyles();

  const saveProducts = (products: string) => {
    const stateAsString = JSON.stringify(products);
    localStorage.setItem('products', stateAsString); // comment: can we use react persist for this? 
  };
  const formik = useFormik({
    validate: (values) => {
      if (!values.firstName) {
        return {
          // comment: rename functions that return errors to getRequiredError, getMaxLengthError, etc. 
          firstName: required(values.firstName),
        };
      } else if (values.firstName.length > 15) {
        return {
          firstName: maxLengthCreator(values.firstName, 15),
        };
      }
      if (!values.lastName) {
        return {
          lastName: required(values.lastName),
        };
      } else if (values.lastName.length > 15) {
        return {
          lastName: maxLengthCreator(values.lastName, 15),
        };
      }
      if (!values.email) {
        return {
          email: required(values.email),
        };
        // comment: let's move it to the validators isEmailValid
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          // comment: to constants
          // const VALIDATION_ERRORS = {
          //   INVALID_EMAIL: 'Invalid email'
          //   ...
          // }

        return {
          email: 'Invalid email',
        };
      }
      if (!values.phoneNumber) {
        return {
          phoneNumber: required(values.phoneNumber),
        };
        // comment: let's move it to the validators
      } else if (isNaN(Number(values.phoneNumber))) {
        return {
          phoneNumber: 'Must be a number',
        };
      }
    },
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },

    onSubmit: (values) => {
      if (props.products.length === 0) {
        // comment: use modal instead of alert
        alert('Cart is empty!');
      } else {
        const customer = JSON.stringify(values, null, 2);
        const products = JSON.stringify(props.products);
        // comment: use modal instead of alert
        alert(`Order ${customer} ${products}`);
        saveProducts(products);
      }
    },
  });

  return (
    <Paper className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <h2 className={classes.form_label}>Order</h2>
          </FormLabel>
          <FormGroup>
            <TextField
              label="First Name"
              variant='filled'
              {...formik.getFieldProps('firstName')}
              className={classes.form_item}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className={classes.error}>{formik.errors.firstName}</div>
            ) : null}
            <TextField
              label="Last Name"
              variant='filled'
              {...formik.getFieldProps('lastName')}
              className={classes.form_item}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className={classes.error}>{formik.errors.lastName}</div>
            ) : null}
            <TextField
              label="Email"
              variant='filled'
              {...formik.getFieldProps('email')}
              className={classes.form_item}
            />
            {formik.touched.email && formik.errors.email ? <div className={classes.error} >{formik.errors.email}</div> : null}
            <TextField
              label="Phone number"
              variant='filled'
              {...formik.getFieldProps('phoneNumber')}
              className={classes.form_item}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className={classes.error}>{formik.errors.phoneNumber}</div>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.form_item}
              aria-labelledby='order'
            >
              Send
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Paper>
  );
};