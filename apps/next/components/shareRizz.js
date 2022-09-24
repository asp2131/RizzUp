import React, { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Paper,
  Tooltip
} from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CancelIcon from "@material-ui/icons/Cancel";
import {UserContext} from '../lib/UserContext';
import faunadb, { query as q } from 'faunadb';

const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })
//import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import ModalButton from "./newArticleModal";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  postTop: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 20,
    margin: 5
  },
  avatar: {
    minWidth: 50,
    minHeight: 50
  },
  paper: {
    flexGrow: 1,
    padding: 10,
    marginRight: 15
  },
  input: {
    width: "100%",
    marginLeft: 10
  },
  imageView: {
    borderRadius: 20,
    marginTop: 10,
    margin: "0 auto",
    minWidth: "85%",
    height: 300
  },
  cancelIcon: {
    background: "#fff"
  },
  divider: {
    width: 1,
    height: 24
  },
  fillVoid: {
    flexGrow: 1
  },
  fileInput: {
    display: "none"
  },
  postButton: {
    padding: 22
  }
}));

const AddArticle = props => {
  const { className } = props;
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [value, setValue] = useState("");
  
  const [postImage, setPostImage] = useState(null);
  const [newArticle, setNewArticle] = useState({});
  const [chips, setChips] = useState(["Android", "IOS", "React"]);
  const [user] = useContext(UserContext);
  const avatarUrl =
    "https://static01.nyt.com/images/2019/01/03/obituaries/03DRAGON1-print/03DRAGON1-thumbStandard.jpg";

  /* newArticle: {
    body: "sajhcvdsvcdhs"
    contentImage: "url",
    tagList: [
      "Android",
      "IOS",
      "React"
    ]
  } */

  const saveRizz = async (content, user) => {
    try{    
      const data = await client.query(
          q.Create(
              q.Collection('Post'),
              {
                  data: {
                      owner: user,
                      content: content,
                  }
              }
          )
      )

      console.log(data);
      if (data.name === 'BadRequest') return // if there's an error in the data creation
  } catch {
      res.status(500)
  }
  }

  const handleContentChange = event => {
    event.persist();
    setValue(event.target.value);
    setNewArticle({
      ...newArticle,
      body: event.target.value
    });
  };

  const handleImageChange = event => {
    const image = URL.createObjectURL(event.target.files[0]);
    console.log(image);
    setPostImage(image);
    setNewArticle({
      ...newArticle,
      contentImage: image
    });
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    saveRizz(newArticle.body, user.id)
    console.log(user, "user");
  };

  const removeImage = () => {
    setPostImage(null);
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.postTop}>
          <Avatar
            className={classes.avatar}
            alt="Authenticated User"
            src={avatarUrl}
          />
          <Paper className={classes.paper} elevation={0}>
            <Input
              className={classes.input}
              disableUnderline
              onChange={handleContentChange}
              placeholder={`What's on your rizz?`}
              multiline
              rowsMax="4"
              value={value}
            />
          </Paper>
          {postImage && (
            <CardMedia
              className={classes.imageView}
              image={postImage}
              title="Pubg Mobile"
            >
              <IconButton onClick={removeImage}>
                <CancelIcon fontSize="large" className={classes.cancelIcon} />
              </IconButton>
            </CardMedia>
          )}
        </div>

        <Tooltip title="Photo/Video">
          <IconButton edge="end" onClick={handleAttach}>
            <AddPhotoIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Tag Friends (Coming Soon)">
          <IconButton edge="end">
            <PersonAddIcon />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="Add Emojis">
          <IconButton color={value.length > 0 ? "primary" : "default"}>
            <EmojiEmotionsIcon />
          </IconButton>
        </Tooltip> */}

        <input
          accept="image/*"
          className={classes.fileInput}
          ref={fileInputRef}
          type="file"
          id="imageInput"
          onChange={handleImageChange}
        />

        <div className={classes.fillVoid} />

        {value.length > 0 && (
          <ModalButton
            chips={chips}
            setChips={setChips}
            newArticle={newArticle}
            setNewArticle={setNewArticle}
            value={value}
            setValue={setValue}
            postImage={postImage}
            setPostImage={setPostImage}
            handleContentChange={handleContentChange}
            handleImageChange={handleImageChange}
            handleAttach={handleAttach}
            handleSubmit={handleSubmit}
            removeImage={removeImage}
          />
        )}

        <Chip
          className={classes.postButton}
          label="POST"
          color={value.length > 0 ? "primary" : "default"}
          onClick={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

AddArticle.propTypes = {
  className: PropTypes.string
};

export default AddArticle;
