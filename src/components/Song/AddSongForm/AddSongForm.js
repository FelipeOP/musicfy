import React, { useCallback, useState, useEffect } from "react";
import { Form, Icon } from "semantic-ui-react";
import classNames from "classnames";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { Album, Storage, Song } from "../../../api";
import { v4 as uuidv4 } from "uuid";
import { initialValues, valitionSchema } from "./AddSongFormData";
import "./AddSongForm.scss";
import { map } from "lodash";

const albumController = new Album();
const storageController = new Storage();
const songController = new Song();

export function AddSongForm(props) {
  const { onClose } = props;
  const [songName, setSongName] = useState("");
  const [albumOptions, setAlbumOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.obtainAll();
        const result = map(response, (item) => ({
          key: item.id,
          value: item.id,
          text: item.name,
        }));
        setAlbumOptions(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: valitionSchema(),
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const { file, name, album } = formData;
        const response = await storageController.uploadFile(
          file,
          "songs",
          uuidv4()
        );
        const url = await storageController.getUrlFile(
          response.metadata.fullPath
        );
        await songController.create(name, album, url);
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setSongName(file.name);
    formik.setFieldValue("file", file);
    formik.setFieldValue("name", file.name.split(".")[0]);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Form className="add-song-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre de la canción"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Dropdown
        placeholder="Asigna la canción a un album"
        fluid
        search
        selection
        options={albumOptions}
        value={formik.values.album}
        onChange={(_, data) => formik.setFieldValue("album", data.value)}
        error={formik.errors.album}
      />

      <div
        {...getRootProps()}
        className={classNames("add-song-form__file", {
          error: formik.errors.file,
        })}
      >
        <input {...getInputProps()} />

        <Icon name="cloud upload" />
        <div>
          <p>
            Arrastra tu canción o haz click <span>aquí</span>
          </p>
          {songName && <p className="song-name">{songName}</p>}
        </div>
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Subir canción
      </Form.Button>
    </Form>
  );
}
