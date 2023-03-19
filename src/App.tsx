import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllList, getDetailList } from "./api/main";
import CommonButton from "./components/common/Button";
import Navigation from "./components/common/Navigation";
import SearchIcon from "./components/common/SearchIcon";
import { BookResponseType, BookRequestType } from "./types";
import ItemList from "./components/main/ItemList";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SearchTitle = styled.h2`
  font-size: ${(props) => props.theme.title2};
  font-weight: ${(props) => props.theme.bold};
  line-height: 24px;
  color: ${(props) => props.theme.black};
  margin-bottom: 16px;
  text-align: center;
`;

const StyledInput = styled(Input)`
  background-color: ${(props) => props.theme.lightGray};
  border-radius: 100px;
  padding: 10px 0px 10px 10px;
  width: 480px;
  border: none;
  margin-right: 16px;
  input.ant-input {
    background-color: ${(props) => props.theme.lightGray};
    border-radius: 100px;
  }
`;
export const SearchCountText = styled.p`
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.caption};
  line-height: 24px;
`;
export const SearchCountNumberText = styled.p`
  margin-left: 16px;
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.caption};
  line-height: 24px;
`;
export const SearchCountNumber = styled.span`
  color: ${(props) => props.theme.primary};
`;

export const NoDataText = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: ${(props) => props.theme.caption};
  line-height: 16px;
  text-align: center;
`;

const ModalButton = styled(Button)`
  width: 100%;
  height: 36px;
  background-color: ${(props) => props.theme.primary};
`;

const KeywordInput = styled(Input)`
  line-height: 22px;
  width: 200px;
`;

const App = () => {
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [searchTarget, setSearchTarget] =
    useState<BookRequestType["target"]>("title");
  const [bookList, setBookList] = useState<BookResponseType>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (keyword) handleTotalSearch();
    if (detailKeyword) handleDetailSearch();
  }, [current]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDetailSearch = async () => {
    const result: BookResponseType = await getDetailList(
      searchTarget,
      detailKeyword,
      current
    );
    if (bookList.documents?.length > 0) setBookList({});

    setBookList(result);
    setIsModalOpen(false);
  };
  const handleTotalSearch = async () => {
    const result: BookResponseType = await getAllList(keyword, current);
    if (bookList.documents?.length > 0) setBookList({});
    setBookList(result);
  };

  const handleSelectChange = (value: BookRequestType["target"]) => {
    setSearchTarget(value);
  };

  const handleKeywordChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const handleDetailKeywordChange = (e: any) => {
    setDetailKeyword(e.target.value);
  };

  return (
    <div>
      <Navigation />
      <SearchTitle>도서 검색</SearchTitle>
      <SearchWrapper>
        <StyledInput
          prefix={<SearchIcon />}
          placeholder="검색어 입력"
          onChange={handleKeywordChange}
          onPressEnter={handleTotalSearch}
        ></StyledInput>
        <CommonButton
          title="상세검색"
          type="default"
          onClick={showModal}
        ></CommonButton>
        <Modal
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={[
            <ModalButton type="primary" onClick={handleDetailSearch}>
              검색하기
            </ModalButton>,
          ]}
        >
          <Select
            defaultValue="title"
            onChange={handleSelectChange}
            options={[
              { value: "title", label: "제목" },
              { value: "authors", label: "저자명" },
              { value: "publisher", label: "출판사" },
            ]}
          />
          <KeywordInput
            placeholder="검색어 입력"
            onChange={handleDetailKeywordChange}
            bordered={false}
          ></KeywordInput>
        </Modal>
      </SearchWrapper>
      {bookList?.documents?.length > 0 ? (
        <ItemList list={bookList} />
      ) : (
        <>
          <NoDataText>검색된 결과가 없습니다.</NoDataText>
        </>
      )}
    </div>
  );
};

export default App;
