import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react';

import { Context, setMessageAC } from '../../context/context';

export const Message = React.memo(function () {
  const { context, contextDispatch } = useContext<any>(Context);
  return (
    <Collapse in={context.message}>
      <Alert onClose={() => contextDispatch(setMessageAC(false))}>In cart!</Alert>
    </Collapse>
  );
});
