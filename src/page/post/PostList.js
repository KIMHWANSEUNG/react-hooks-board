import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../component/table/CommonTable';
import CommonTableColumn from '../../component/table/CommonTableColumn';
import CommonTableRow from '../../component/table/CommonTableRow';
import { postList } from '../../Data';
import PostInsert from '../post/PostInsert';
import ReactPaginate from 'react-paginate';
import '../resource/css/paging.css';
import Moment from 'react-moment';
import SearchAppBar from './../../component/table/SearchBar';


const PER_PAGE = 5;

const PostList = props => {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("")


  const getBoardList = (e) => {
    axios
    .get('/boardlist')
    .then(res => {
      //Json.stringify는 단순히 데이터 찍어보는 용도
      console.log(JSON.stringify(res.data));
      const dataList = res.data;
      setDataList(dataList);
    })
    .catch(Error => {
      console.log(Error);
    });
  }

  useEffect(() => {
    getBoardList();
  }, []);

  function handlePageClick({ selected: selectPage }) {
    setCurrentPage(selectPage);
  }

  const handleSearchBar = (e) => {
    setSearchKeyword(e.currentTarget.value);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = dataList.filter((object) => {
    return object.title.toLowerCase().includes(searchKeyword);
  }).slice(offset, offset + PER_PAGE).map((item, index) => {
    return (
      <CommonTableRow key={index}>
        <CommonTableColumn>{item.no}</CommonTableColumn>
        <CommonTableColumn>
          <Link to={`/postView/${item.no}`}>{item.title}</Link>
        </CommonTableColumn>
        <CommonTableColumn>{item.writer}</CommonTableColumn>
        <CommonTableColumn><Moment format="YYYY/MM/DD HH:MM">{item.createDate}</Moment></CommonTableColumn>
        <CommonTableColumn>{item.readCount}</CommonTableColumn>
      </CommonTableRow>
    );
  });
  // 데이터 길이에 따른 총 페이지 수 계산
  const pageCount = Math.ceil(dataList.filter((object) => {
    return object.title.toLowerCase().includes(searchKeyword);
  }).length / PER_PAGE);
  
  return (
    <>
      <div className={'searchbar'}>
        <SearchAppBar setSearchKeyword={setSearchKeyword}/>
      </div>
      <div className={'index_table'}>
      <CommonTable headersName={['글번호', '제목', '작성자', '등록일', '조회수']}>
        <>
          {dataList ? currentPageData: ''}
        </>
      
      </CommonTable>
      </div>
      <div className="postinsert_div">
      <PostInsert className="postinsert_btn" getBoardList={getBoardList} />
      </div>
        <div className="App1">
              <ReactPaginate
              previousLabel={'← 이전'}
              nextLabel={'다음 →'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              previousLinkClassName={'pagination__link'}
              nextLinkClassName={'pagination__link'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
            />
          </div>
    </>
  );
};

export default PostList;