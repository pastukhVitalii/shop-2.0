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

import { ProductType } from '../../redux/products-reducer';
import { MAX_FIELD_LENGTH, VALIDATION_ERRORS } from '../../utils/constants';
import {
  getEmailError,
  getMaxLengthError,
  getNumberError,
  getRequiredError,
} from '../../utils/validators';
import { MyModal } from '../Modal';
import { useStyles } from './index';

type PropsType = {
  products: Array<ProductType>;
};

export const Form = function (props: PropsType) {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);

  const [modalContent, setModalContent] = React.useState<string>('');
  const formik = useFormik({
    validate: (values) => {
      if (getRequiredError(values.firstName)) {
        return {
          firstName: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getMaxLengthError(values.firstName, MAX_FIELD_LENGTH)) {
        return {
          firstName: VALIDATION_ERRORS.MAX_LENGTH(MAX_FIELD_LENGTH),
        };
      }
      if (getRequiredError(values.lastName)) {
        return {
          lastName: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getMaxLengthError(values.lastName, MAX_FIELD_LENGTH)) {
        return {
          lastName: VALIDATION_ERRORS.MAX_LENGTH(MAX_FIELD_LENGTH),
        };
      }
      if (getRequiredError(values.email)) {
        return {
          email: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getEmailError(values.email)) {
        return {
          email: VALIDATION_ERRORS.INVALID_EMAIL,
        };
      }
      if (getRequiredError(values.phoneNumber)) {
        return {
          phoneNumber: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getNumberError(values.phoneNumber)) {
        return {
          phoneNumber: VALIDATION_ERRORS.PHONE_NUMBER,
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
        setModalContent('Cart is empty!');
        setOpen(true);
      } else {
        const customer = JSON.stringify(values, null, 2);
        const products = JSON.stringify(props.products, null, 2);
        setModalContent(`Order ${customer}, \n products ${products}`);
        setOpen(true);
      }
    },
  });

  return (
    <Paper className={classes.root}>
      <MyModal open={open} setOpen={setOpen} modalContent={modalContent} />
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <h2 className={classes.form_label}>Order</h2>
          </FormLabel>
          <FormGroup>
            <TextField
              label="First Name"
              variant="filled"
              {...formik.getFieldProps('firstName')}
              className={classes.form_item}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className={classes.error}>{formik.errors.firstName}</div>
            )}
            <TextField
              label="Last Name"
              variant="filled"
              {...formik.getFieldProps('lastName')}
              className={classes.form_item}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className={classes.error}>{formik.errors.lastName}</div>
            )}
            <TextField
              label="Email"
              variant="filled"
              {...formik.getFieldProps('email')}
              className={classes.form_item}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={classes.error}>{formik.errors.email}</div>
            )}
            <TextField
              label="Phone number"
              variant="filled"
              {...formik.getFieldProps('phoneNumber')}
              className={classes.form_item}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className={classes.error}>{formik.errors.phoneNumber}</div>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.form_item}
              aria-labelledby="order"
            >
              Send
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Paper>
  );
};
