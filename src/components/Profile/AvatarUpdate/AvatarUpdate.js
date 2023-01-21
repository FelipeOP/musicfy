import React, { useCallback, useState } from "react";
import { Image } from "semantic-ui-react";
import { defaultUser } from "../../../assets";
import { useDropzone } from "react-dropzone";
import { User, Storage } from "../../../api";
import "./AvatarUpdate.scss";

const userController = new User();
const storageController = new Storage();

export function AvatarUpdate() {
  const { photoURL, uid } = userController.getUserInfo();
  const [avatar, setAvatar] = useState(photoURL || defaultUser);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setAvatar(URL.createObjectURL(file));

    const response = await storageController.uploadFile(file, "avatars", uid);
    const url = await storageController.getUrlFile(response.metadata.fullPath);

    await userController.updateUserAvatar(url);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="avatar-update" {...getRootProps()}>
      <input {...getInputProps()} />
      <Image src={avatar} />
    </div>
  );
}
