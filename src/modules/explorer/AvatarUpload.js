import {
  Avatar as MuiAvatar,
  Button as MuiButton,
  makeStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import React, { createRef, useState } from "react";
import styled from "styled-components";

//   const Button = styled(MuiButton)(spacing);
const Button = styled.span`
  width: 91px;
  height: 17px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #2149b9;
`;

const UploadIcon = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: "108px",
    height: "108px",
    marginTop: "35px",
  },
}));

const BigAvatar = styled(MuiAvatar)`
  width: 300x;
  height: 300px;
  margin: 0 auto 16px;
  border: 1px solid ${grey[500]};
  box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};
`;

const AvatarUpload = () => {
  const classes = useStyles();

  const [image, _setImage] = useState(null);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <CenteredContent>
      <BigAvatar
        className={classes.large}
        $withBorder
        alt="Avatar"
        src={image}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button onClick={handleClick}>{"Upload Photo"}</Button>
      </label>
    </CenteredContent>
  );
};

export default AvatarUpload;
