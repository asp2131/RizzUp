import React, { useState, useRef, forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  IconButton,
  Tooltip,
  Card,
  CardContent,
  TextField,
  Chip,
  Slide,
  Modal,
  Avatar,
  CardMedia,
  Input,
  Paper
} from "@material-ui/core";

// MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CancelIcon from "@material-ui/icons/Cancel";
import {UserContext} from '../lib/UserContext';
import faunadb, { query as q } from 'faunadb';

const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })


const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "0 auto",
    marginTop: 30
  },
  cardContent: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
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

  addTagBox: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  textFields: {
    width: 150,
    marginRight: 10
  },
  chips: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: 5
  },
  flexGrow: {
    flexGrow: 1
  },

  postBottom: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: 5
  },
  fileInput: {
    display: "none"
  },
  fillVoid: {
    flexGrow: 1
  },
  postButton: {
    marginRight: 10,
    padding: 22
  }
}));

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewArticleModal = props => {
  const {
    chips,
    setChips,
    newArticle,
    setNewArticle,
    className,
    value,
    postImage,
    handleContentChange,
    handleImageChange,
    handleAttach,
    handleSubmit,
    removeImage
  } = props;

  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  //const [chips, setChips] = useState(["Android", "IOS", "React"]);

  const fileInputRef = useRef(null);
  const avatarUrl =
    "https://static01.nyt.com/images/2019/01/03/obituaries/03DRAGON1-print/03DRAGON1-thumbStandard.jpg";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = event => {
    event.persist();
    if (event.keyCode === 13 && inputValue) {
      if (!chips.includes(inputValue)) {
        setChips(chips => [...chips, inputValue]);
        setInputValue("");
        setNewArticle({
          ...newArticle,
          tagList: [...chips, inputValue]
        });
      }
    }
  };

  const handleChipDelete = chip => {
    setChips(chips => chips.filter(c => chip !== c));
    setNewArticle({
      ...newArticle,
      tagList: chips.filter(c => chip !== c)
    });
  };

  return (
    <div>
      <Tooltip title="Open Dialog">
        <IconButton onClick={handleClickOpen}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        //TransitionComponent={Transition}
        keepMounted
      >
        <Card className={clsx(classes.root, className)}>
          <CardContent className={classes.cardContent}>
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
                  placeholder={`Whats your rizz?`}
                  multiline
                  value={value}
                  rowsMax="4"
                />
              </Paper>
              {postImage && (
                <CardMedia
                  className={classes.imageView}
                  image={postImage}
                  title="Pubg Mobile"
                >
                  <IconButton onClick={removeImage}>
                    <CancelIcon
                      fontSize="large"
                      className={classes.cancelIcon}
                    />
                  </IconButton>
                </CardMedia>
              )}
            </div>

            <div className={classes.addTagBox}>
              <TextField
                className={classes.textFields}
                label="Tags"
                name="tags"
                required
                placeholder="Enter Tags"
                variant="outlined"
                margin="dense"
                onChange={handleInputChange}
                onKeyUp={handleInputKeyup}
                value={inputValue}
              />
              <div className={classes.chips}>
                {chips.map(chip => (
                  <Chip
                    className={classes.chip}
                    deleteIcon={<CloseIcon />}
                    key={chip}
                    label={chip}
                    onDelete={() => handleChipDelete(chip)}
                  />
                ))}
              </div>
            </div>

            <div className={classes.postBottom}>
              <Tooltip title="Photo/Video">
                <IconButton edge="end" onClick={handleAttach}>
                  <AddPhotoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Tag Friends (Coming Soon)">
                <IconButton edge="end" onClick={handleAttach}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Emojis">
                <IconButton color={value.length > 0 ? "primary" : "default"}>
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
              <input
                accept="image/*"
                className={classes.fileInput}
                ref={fileInputRef}
                type="file"
                id="imageInput"
                onChange={handleImageChange}
              />
              <div className={classes.fillVoid} />
              <Chip
                className={classes.postButton}
                label="POST"
                color={value.length > 0 ? "primary" : "default"}
                onClick={handleSubmit}
              />
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

NewArticleModal.propTypes = {
  className: PropTypes.string
};

export default NewArticleModal;
