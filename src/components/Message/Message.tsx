import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMessageAC } from '../../redux/auth-reducer';
import { AppRootStateType } from '../../redux/store';

type PropsType = {
  messageTitle: string;
};

export const Message = React.memo(function (props: PropsType) {
  const alert = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.messageStatus,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        dispatch(setMessageAC({ messageStatus: false }));
      }, 1500);
    }
  }, [alert]);

  return (
    <Collapse in={alert}>
      <Alert onClose={() => dispatch(setMessageAC({ messageStatus: false }))}>
        {props.messageTitle}
      </Alert>
    </Collapse>
  );
});
