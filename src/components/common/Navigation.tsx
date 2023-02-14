import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  max-width: 1980px;
  max-height: 80px;
`;

const TitleText = styled.p`
  font-size: ${(props) => props.theme.title1};
  font-weight: ${(props) => props.theme.bold};
  color: ${(props) => props.theme.textPrimary};
`;

const TabList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #fff;
`;

const TabItem = styled.li`
  list-style: none;
  font-size: ${(props) => props.theme.body1};
  font-weight: ${(props) => props.theme.normal};
  color: ${(props) => props.theme.textPrimary};
  :first-child {
    margin-right: 56px;
  }
`;

const StyledLink = styled(NavLink)`
  display: block;
  color: ${(props) => props.theme.textPrimary};
  text-decoration: none;
  &.active {
    border-bottom: 1px solid #4880ee;
  }
`;

const Navigation = () => {
  return (
    <div className="App">
      <NavBar>
        <TitleText>CERTICOS BOOKS</TitleText>
        <TabList>
          <TabItem>
            <StyledLink to="/">도서 검색</StyledLink>
          </TabItem>
          <TabItem>
            <StyledLink to="/wish_list">내가 찜한 책</StyledLink>
          </TabItem>
        </TabList>
      </NavBar>
    </div>
  );
};

export default Navigation;
