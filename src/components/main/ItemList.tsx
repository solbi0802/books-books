import { PaginationProps } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonButton from "../common/Button";
import CommonPagination from "../common/Pagination";
import { bookResponseType, books } from "../../types";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const HeartWrapper = styled.div`
  margin-right: 16px;
`;

const ItemList = (props) => {
  const { list } = props;
  const [current, setCurrent] = useState(1);
  const [isHeartClick, setIsHeartClick] = useState(false);
  const [wishData, setWishData] = useState([]);

  const [itemList, setItemList] = useState<bookResponseType>(list);

  useEffect(() => {
    console.log("props", props);
    console.log("item", list);
    setItemList(list);
  }, []);
  const handlePagination: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const handleHeartClickEvent = (id: string) => {
    console.log("하트클릭");
    setIsHeartClick(true);
    const data = [];
    data.push({ id });
    console.log("data", data);
    setWishData(...data);
  };

  const handleHeartRemove = () => {
    console.log("wishData", wishData);
    setIsHeartClick(false);
  };

  return (
    <ResultWrapper>
      <SearchCountTextWrapper>
        <SearchCountText>도서 검색 결과</SearchCountText>
        <SearchCountNumberText>
          총
          <SearchCountNumber>
            {itemList?.meta?.total_count?.toLocaleString("ko-KR") || 0}
          </SearchCountNumber>
          건
        </SearchCountNumberText>
      </SearchCountTextWrapper>

      {itemList?.documents?.map((b: books) => {
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
                {isHeartClick ? (
                  <HeartFilled onClick={handleHeartRemove}></HeartFilled>
                ) : (
                  <button onClick={handleHeartClickEvent(b?.isbn)}>
                    <HeartOutlined />
                  </button>
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
          total={itemList?.meta?.total_count}
        />
      </PaginationWrapper>
    </ResultWrapper>
  );
};

export default ItemList;
