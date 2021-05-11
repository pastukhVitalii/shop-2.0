import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import {useStyles} from "./index";

type PropsType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  modalContent: string;
};

export const MyModal = function (props: PropsType) {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <pre>{props.modalContent}</pre>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
