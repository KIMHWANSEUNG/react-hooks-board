import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import '../resource/css/Post.css';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import PostUpdate from './PostUpdate';

const PostView = ({ history, location, match }) => {
  const [data, setData] = useState([]);
  const [hiddenState, setHiddenState] = useState(true);
  const [BoarduserIdx, setBoardUserIdx] = useState('');
  const [LoginuserIdx, setLoginUserIdx] = useState('');

  const { no } = match.params;

  // const hiddenStateCheck = () => {
  //   if (BoarduserIdx == LoginuserIdx) {
  //     setHiddenState(true);
  //     console.log('히든상태:' + hiddenState);
  //   }
  // };
  useEffect(gg => {
    //게시글 상세 정보 가져오기 , 게시글 조회수 증가
    axios
      .post('/selectboard', {
        no: no
      })
      .then(function (response) {
        console.log('게시판 유저 아이디' + response.data.user_idx);
        setData(response.data);
        setBoardUserIdx(response.data.user_idx);
      })
      .catch(function (error) {
        console.log(error);
      });

    //로그인 세션 정보 가져오기
    axios
      .get('/boardSessionUser')
      .then(res => {
        setLoginUserIdx(res.data.idx);
        console.log('로그인 유저 아이디: ' + res.data.idx);
      })
      .catch(Error => {
        console.log(Error);
      });
    // hiddenStateCheck();
  }, []);

  useEffect(() => {
    if (BoarduserIdx === LoginuserIdx) {
      setHiddenState(false);
    }else if(BoarduserIdx !== LoginuserIdx){
      setHiddenState(true);
    }
  }, [LoginuserIdx, BoarduserIdx, LoginuserIdx]);


  //글 삭제 기능

const onDeleteHandler = (e) => {
  axios.post("/boardDelete",{
      no:no
    }).then(function(response) {
        window.location.href="/board"
    }).catch(function (error){
        console.log(error);
    });
   };

  return (
    <>
      <h2 align='center'>게시글 상세정보</h2>

      <div className='post-view-wrapper'>
        {data ? (
          <>
            <div className='post-view-row'>
              <label>게시글 번호</label>
              <label>{data.no}</label>
            </div>
            <div className='post-view-row'>
              <label>제목</label>
              <label>{data.title}</label>
            </div>
            <div className='post-view-row'>
              <label>작성자</label>
              <label>{data.writer}</label>
            </div>
            <div className='post-view-row'>
              <label>작성일</label>
              <label>
                <Moment format='YYYY/MM/DD HH:MM'>{data.createDate}</Moment>
              </label>
            </div>
            <div className='post-view-row'>
              <label>조회수</label>
              <label>{data.readCount}</label>
            </div>
            <div className='post-view-row'>
              <label>내용</label>
              <div>{data.content}</div>
            </div>
          </>
        ) : (
          '해당 게시글을 찾을 수 없습니다.'
        )}

        <Button variant='outlined' color='default' onClick={() => history.goBack()}>
          목록
        </Button>
        <PostUpdate hiddenState={hiddenState} no={data.no} title={data.title} content={data.content}/>
        <Button variant='outlined' color='secondary' onClick={onDeleteHandler}   disabled={hiddenState}>
          삭제
        </Button>
      </div>
    </>
  );
};

export default PostView;