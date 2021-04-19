import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react';

import { Context, setMessageAC } from '../../context/context';

type PropsType = {
  messageTitle: string
}
export const Message = React.memo(function (props:PropsType) {
  const { context, contextDispatch } = useContext<any>(Context);
  return (
    <Collapse in={context.message}>
      <Alert onClose={() => contextDispatch(setMessageAC(false))}>{props.messageTitle}</Alert>
    </Collapse>
  );
});
