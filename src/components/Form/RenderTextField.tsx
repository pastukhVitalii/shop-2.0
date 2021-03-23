import React from 'react';
import {TextField} from "@material-ui/core";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    label: string
    name: string
    input: WrappedFieldProps
}

export const renderTextField: React.FC<FormControlPropsType> = React.memo (({label, input, meta: {touched, invalid, error}, ...custom}) => (
    <><TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        variant='filled'
        helperText={touched && error}
        {...input}
        {...custom}
        style={{'margin': '20px ', 'width': 'calc(100% - 40px)'}}
    />
        {/*{touched && error? alert(error): ''}*/}
    </>
))



