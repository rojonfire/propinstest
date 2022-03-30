import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "shards-react";

export const ModalItem = ({
  show,
  handleHide,
  Title,
  Componente,
  paramsComponents,
  showBtn,
  successFunction,
  btnText,
  ...props
}) => {
  return (
    <div className="static-modal">
      <Modal fade={false} size="lg" open={show} toggle={handleHide}>
        <ModalHeader>{Title}</ModalHeader>

        <ModalBody>
          <Componente params={paramsComponents} {...props} />
        </ModalBody>

        <ModalFooter>
          {showBtn ? (
            <button className="btn btn-success" onClick={successFunction}>
              {" "}
              {btnText}
            </button>
          ) : (
            ""
          )}

          <button className="btn btn-primary" onClick={handleHide}>
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const ModalItemForm = ({ show, handleHide, Title, Componente }) => {
  return (
    <div className="static-modal">
      <Modal open={show} toggle={handleHide}>
        <ModalHeader>{Title}</ModalHeader>

        <ModalBody>{Componente}</ModalBody>
      </Modal>
    </div>
  );
};
