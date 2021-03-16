import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextareaAutosize} from'@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({

    formControl: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
      marginTop: theme.spacing(2),
      minWidth: 500,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
    TextArea:{
        marginTop:40,
    },
  }));

export default function PostUpdate(props) {

  const [open, setOpen] = useState(false);
  const [title,setTitle]=  useState("");
  const [content,setContent]=  useState("");
  const [writer,setWriter]=  useState("");
  const [idx,setIdx]=  useState("");
  
  
  const classes = useStyles();
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value)
    };

  const onContentHandler = (e) => {
    setContent(e.currentTarget.value)
    };


const onSubmitHandler = (e) => {
    axios.post("/boardupdate",{
        no:props.no,
        title:title,
        content:content,
      }).then(function(response) {
          console.log(response.data);
          window.location.href="/board"
      }).catch(function (error){
          console.log(error);
      });
        setOpen(false);
        
     };

     useEffect(() => {
        axios.get('/boardSessionUser')
        .then((res)=>{
          setIdx(res.data.idx);
          setWriter(res.data.name);
      })
      .catch((Error)=>{console.log(Error)})



      }, [ ])

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} disabled={props.hiddenState} >
       수정
      </Button>      
      <Dialog  fullWidth={"lg"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">글 수정</DialogTitle>
        <DialogContent>
         <FormControl className={classes.formControl}>
            <TextField
                onChange={onTitleHandler}
                autoFocus
                id="name"
                label="글 제목을 입력해주세요"
                fullWidth
                defaultValue={props.title}
            />
            <TextareaAutosize
                onChange={onContentHandler}
                className={classes.TextArea}
                rowsMin={10}
                aria-label="maximum height"
                placeholder="내용을 입력해주세요."
                defaultValue={props.content}
                />
            
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
          <Button onClick={onSubmitHandler} color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}