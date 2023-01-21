import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AddAlbumForm } from "../../Album";
import { NewArtistForm } from "../../Artist/NewArtistForm";
import { BasicModal } from "../../Shared/BasicModal";
import { AddSongForm } from "../../Song";
import "./LeftMenu.scss";

export function LeftMenu() {
  const { pathname } = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalContent(null);
  };

  const isCurrentPage = (route) => {
    return pathname === route;
  };

  const openModal = (type) => {
    if (type === "artist") {
      setModalTitle("Nuevo artista");
      setModalContent(<NewArtistForm onClose={closeModal} />);
    }

    if (type === "album") {
      setModalTitle("Nuevo album");
      setModalContent(<AddAlbumForm onClose={closeModal} />);
    }

    if (type === "song") {
      setModalTitle("Nueva canción");
      setModalContent(<AddSongForm onClose={closeModal} />);
    }

    setShowModal(true);
  };

  return (
    <>
      <div className="left-menu">
        <Menu secondary vertical fluid>
          <Menu.Item
            as={Link}
            to="/"
            name="Inicio"
            icon="home"
            active={isCurrentPage("/")}
          />
          <Menu.Item
            as={Link}
            to="/artists"
            name="Artistas"
            icon="users"
            active={isCurrentPage("/artists")}
          />
          <Menu.Item
            as={Link}
            to="/albums"
            name="Albums"
            icon="window maximize outline"
            active={isCurrentPage("/albums")}
          />
        </Menu>

        <Menu secondary vertical fluid>
          <Menu.Item
            name="Nueva canción"
            icon="plus"
            link
            onClick={() => openModal("song")}
          />
          <Menu.Item
            name="Nuevo album"
            icon="plus"
            link
            onClick={() => openModal("album")}
          />
          <Menu.Item
            name="Nuevo artista"
            icon="plus"
            link
            onClick={() => openModal("artist")}
          />
        </Menu>
      </div>

      <BasicModal
        show={showModal}
        onClose={closeModal}
        title={modalTitle}
        children={modalContent}
      />
    </>
  );
}
