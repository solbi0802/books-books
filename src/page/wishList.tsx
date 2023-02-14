import Navigation from "../components/common/Navigation";
import styled from "styled-components";
import {
  NoDataText,
  SearchCountNumber,
  SearchCountNumberText,
  SearchCountText,
  ResultWrapper,
} from "../App";
import BookIcon from "../components/common/BookIcon";

const WishTitle = styled.h2`
  font-size: ${(props) => props.theme.title2};
  font-weight: ${(props) => props.theme.bold};
  line-height: 24px;
  color: ${(props) => props.theme.black};
  margin-bottom: 16px;
  text-align: center;
  margin-bottom: 24px;
`;
const WishCountTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const WishCountText = styled(SearchCountText)``;
const WishCountNumberText = styled(SearchCountNumberText)``;
const WishCountNumber = styled(SearchCountNumber)``;

const WishList = () => {
  return (
    <>
      <Navigation />
      <WishTitle>내가 찜한 책</WishTitle>
      <ResultWrapper>
        <WishCountTextWrapper>
          <WishCountText>찜한 책</WishCountText>
          <WishCountNumberText>
            총<WishCountNumber>0</WishCountNumber>건
          </WishCountNumberText>
        </WishCountTextWrapper>
        <BookIcon />
        <NoDataText>찜한 책이 없습니다.</NoDataText>
      </ResultWrapper>
    </>
  );
};

export default WishList;
