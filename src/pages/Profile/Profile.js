import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { User } from "../../api";
import {
  AvatarUpdate,
  DisplayNameUpdateForm,
  EmailUpdateForm,
  PasswordUpdateForm,
} from "../../components/Profile";
import { BasicModal } from "../../components/Shared";
import "./Profile.scss";

const userController = new User();

export function Profile() {
  const { displayName, email } = userController.getUserInfo();

  const [showModal, setShowModal] = useState(false);
  const [modalTittle, setModalTittle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const onCloseModal = () => {
    setShowModal(false);
    setModalTittle("");
    setModalContent(null);
  };

  const openForm = (type) => {
    if (type === "displayName") {
      setModalTittle("Actualizar nombre y apellido");
      setModalContent(<DisplayNameUpdateForm onClose={onCloseModal} />);
    }
    if (type === "email") {
      setModalTittle("Actualizar email");
      setModalContent(<EmailUpdateForm onClose={onCloseModal} />);
    }
    if (type === "password") {
      setModalTittle("Actualizar contraseña");
      setModalContent(<PasswordUpdateForm onClose={onCloseModal} />);
    }
    setShowModal(true);
  };

  return (
    <>
      <div className="profile">
        <h1> Configuración</h1>

        <div className="profile__block">
          <div>
            <AvatarUpdate />
            <span> {displayName}</span>
          </div>
          <Button onClick={() => openForm("displayName")}>
            Cambiar nombre
          </Button>
        </div>

        <div className="profile__block">
          <span> Email: {email} </span>
          <Button onClick={() => openForm("email")}> Cambiar email </Button>
        </div>

        <div className="profile__block">
          <span> Contraseña: *************** </span>
          <Button onClick={() => openForm("password")}>
            Cambiar contraseña
          </Button>
        </div>
      </div>
      <BasicModal
        show={showModal}
        onClose={onCloseModal}
        title={modalTittle}
        children={modalContent}
      />
    </>
  );
}
