import { Button, Input, Modal, PaginationProps, Select } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllList, getDetailList } from "./api/main";
import BookIcon from "./components/common/BookIcon";
import CommonButton from "./components/common/Button";
import Navigation from "./components/common/Navigation";
import CommonPagination from "./components/common/Pagination";
import SearchIcon from "./components/common/SearchIcon";
import { bookResponseType, books, bookRequestType } from "./types";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

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

const SearchCountTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 36px;
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

const BookListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 960px;
  border-bottom: 1px solid #d2d6da;
`;

const BookItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookImage = styled.img`
  width: 48px;
  height: 68px;
  margin-right: 48px;
`;

const BoldText = styled.p`
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.title3};
  font-weight: ${(props) => props.theme.bold};
`;

const PriceText = styled(BoldText)`
  margin-right: 56px;
`;

const AuthorText = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: ${(props) => props.theme.body2};
  line-height: 14px;
  margin-left: 16px;
`;

const ShortMarginButton = styled.div`
  button:first-child {
    margin-right: 8px;
  }
`;

const PaginationWrapper = styled.footer`
  margin-top: 60px;
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

const HeartWrapper = styled.div`
  margin-right: 16px;
`;

const App = () => {
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [detailKeyword, setDetailKeyword] = useState("");
  const [isHeartClick, setIsHeartClick] = useState(false);
  const [searchTarget, setSearchTarget] =
    useState<bookRequestType["target"]>("title");
  const [bookList, setBookList] = useState<bookResponseType>({});
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

  const handlePagination: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const handleDetailSearch = async () => {
    const result: bookResponseType = await getDetailList(
      searchTarget,
      detailKeyword,
      current
    );
    if (bookList.documents?.length > 0) setBookList({});

    setBookList(result);
    setIsModalOpen(false);
  };
  const handleTotalSearch = async () => {
    const result: bookResponseType = await getAllList(keyword, current);
    if (bookList.documents?.length > 0) setBookList({});

    setBookList(result);
  };

  const handleSelectChange = (value: bookRequestType["target"]) => {
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

      <ResultWrapper>
        <SearchCountTextWrapper>
          <SearchCountText>도서 검색 결과</SearchCountText>
          <SearchCountNumberText>
            총
            <SearchCountNumber>
              {bookList?.meta?.total_count?.toLocaleString("ko-KR") || 0}
            </SearchCountNumber>
            건
          </SearchCountNumberText>
        </SearchCountTextWrapper>
        {bookList?.documents?.length > 0 ? (
          <>
            {bookList?.documents?.map((b: books) => {
              return (
                <BookListItemWrapper key={b.isbn}>
                  <BookItemWrapper>
                    <BookImage src={b.thumbnail}></BookImage>
                    <BoldText>{b.title}</BoldText>
                    <AuthorText>{b?.authors?.join(",")}</AuthorText>
                  </BookItemWrapper>
                  <BookItemWrapper>
                    <PriceText>{b?.price?.toLocaleString("ko-KR")}원</PriceText>
                    <HeartWrapper>
                      // TODO: 찜한 상태인 지 확인하는 데이터 추가 후 수정하자
                      {isHeartClick ? (
                        <HeartFilled
                          onClick={(): void => {
                            setIsHeartClick(false);
                          }}
                        ></HeartFilled>
                      ) : (
                        <HeartOutlined
                          onClick={(): void => {
                            setIsHeartClick(true);
                          }}
                        />
                      )}
                    </HeartWrapper>
                    <ShortMarginButton>
                      <CommonButton
                        title={"구매하기"}
                        type={"primary"}
                        onClick={() => {
                          window.open(b.url);
                        }}
                      ></CommonButton>
                    </ShortMarginButton>
                  </BookItemWrapper>
                </BookListItemWrapper>
              );
            })}

            <PaginationWrapper>
              <CommonPagination
                defaultCurrent={1}
                current={current}
                onChange={handlePagination}
                pageSize={10}
                total={bookList?.meta?.total_count}
              />
            </PaginationWrapper>
          </>
        ) : (
          <>
            <BookIcon />
            <NoDataText>검색된 결과가 없습니다.</NoDataText>
          </>
        )}
      </ResultWrapper>
    </div>
  );
};

export default App;
