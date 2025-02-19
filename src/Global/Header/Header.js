import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
  StHomeIcon,
  StSendIcon,
  StPlusSquare,
  StUserCircle,
  StBookmarkIcon,
  StSettings,
  StTransfer,
  StLine,
  StFillHomeIcon,
  StFillSendIcon,
} from "../StIcon/StIcon";
import { StProfileImg } from "../StProfileImg/StProfileImg";
import Search from "../../componet/Search/Search";
import { authLogout } from "../../service/auth/authLogout";
import setSearchRecord from "../../service/search/setSearchRecord";
import { StRectangle, StTriangle } from "../StBubbleChat/BubbleChat";
import { Theme } from "../../style/Theme";
import { useLocation } from "react-router";
import { StHeaderLogo } from "../Logo/StHeaderLogo";

const StHeaderContainer = styled.header`
  width: 100%;
  padding: 0.5em;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin-bottom: 4em;
  background-color: ${({ theme }) => theme.colors.contentColor};
  z-index: 100;
`;

const StHeaderSearchLabel = styled.label`
  position: relative;
`;

const StHeaderSearch = styled.input`
  height: 1.2em;
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0.2em;
`;

const StHeaderNav = styled.nav`
  position: relative;
`;

const StHeaderNavul = styled.ul`
  display: flex;
  & > :nth-child(n) {
    margin-right: 1em;
  }
`;

const StHeaderNavUlLi = styled.li`
  margin-right: 0.2em;
`;

const StHeaderNavUlLiMy = styled.li`
  height: 1.5em;
`;

export const StMyUl = styled.ul`
  margin: 0.5em 0;
  display: flex;
  flex-direction: column;
`;

export const StMyLi = styled.li`
  padding: 0.2em 0.5em;
  font-weight: 500;
  transition: all 300ms ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundColor};
  }
`;

export const StLink = styled(Link)`
  display: flex;
  justify-content: space-between;
`;

const StLogoutBtn = styled.button`
  width: 100%;
`;

const StSearchForm = styled.form`
  @media (max-width: 900px) {
    /* screen width is less than 768px (medium) */
    display: none;
  }
`;

const Header = ({ handleUpload, userData, foregroundMessageCount }) => {
  const { displayName } = userData;
  const [search, setSearch] = useState(false); // when clcked the search input box show record
  const [searchText, setSearchText] = useState(""); //when typing at search input box
  const [profile, setProfile] = useState(false);
  const loaction = useLocation().pathname;

  const navMenu = {
    home: "/",
    direct: "/direct",
  };

  const onSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const profileOnClick = () => {
    setProfile(!profile);
  };

  const onLogout = () => {
    authLogout();
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    setSearchRecord(searchText);
  };

  // navLink activeStyle
  // const activeStyle = {
  //   padding: `0.2em 0.2em 0.3em 0.2em`,
  //   border: `1px solid`,
  //   borderRadius: `50%`,
  // };

  const onSearchClick = () => {
    setSearch(!search);
  };
  return (
    <StHeaderContainer>
      <StHeaderLogo href="/">Friendsgram</StHeaderLogo>
      <StSearchForm onSubmit={onSearchSubmit}>
        <StHeaderSearchLabel htmlFor="search" onClick={onSearchClick}>
          <StHeaderSearch
            id="search"
            type="search"
            placeholder="검색"
            onChange={onSearchChange}
            autoComplete="off"
          />
          {search && <Search searchText={searchText} />}
        </StHeaderSearchLabel>
      </StSearchForm>

      <StHeaderNav>
        <StHeaderNavul>
          <StHeaderNavUlLi>
            <NavLink exact to="/">
              {loaction === navMenu.home ? (
                <StFillHomeIcon width="1.5" />
              ) : (
                <StHomeIcon width="1.5" />
              )}
            </NavLink>
          </StHeaderNavUlLi>
          <StHeaderNavUlLi>
            <NavLink exact to="/direct">
              <span>
                {foregroundMessageCount > 0 && foregroundMessageCount}
              </span>
              {loaction === navMenu.direct ? (
                <StFillSendIcon width="1.5" />
              ) : (
                <StSendIcon width="1.5" />
              )}
            </NavLink>
          </StHeaderNavUlLi>
          <StHeaderNavUlLi>
            <button
              onClick={() => {
                handleUpload();
              }}
            >
              <StPlusSquare width="1.5" />
            </button>
          </StHeaderNavUlLi>
          <StHeaderNavUlLiMy>
            <StProfileImg
              src={userData.photoURL}
              alt="my"
              height="100%"
              onClick={profileOnClick}
            />
          </StHeaderNavUlLiMy>
        </StHeaderNavul>

        {profile && (
          <>
            <StTriangle
              top="2em"
              left="7em"
              borderTop="1em solid none"
              borderBottom={`0.8em solid ${Theme.colors.contentColor}`}
              borderLeft="0.8em solid transparent;"
              borderRight="0.8em solid transparent;"
            />
            <StRectangle
              top="2.4em"
              width="13em"
              height="auto"
              profileWidth="9em"
            >
              <StMyUl onClick={profileOnClick}>
                <StMyLi>
                  <StLink to={`/${displayName}`}>
                    <StUserCircle width="1.5" />
                    <div>프로필</div>
                  </StLink>
                </StMyLi>
                <StMyLi>
                  <StLink to={`/${displayName}/saved`}>
                    <StBookmarkIcon width="1.5" />
                    <div>저장됨</div>
                  </StLink>
                </StMyLi>
                <StMyLi>
                  <StLink exact="ture" to="/edit">
                    <StSettings width="1.5" />
                    <div>설정</div>
                  </StLink>
                </StMyLi>
                <StMyLi>
                  <StLink to="/">
                    <StTransfer width="1.5" />
                    <div>계정 전환</div>
                  </StLink>
                </StMyLi>
                <StLine />
                <StMyLi>
                  <StLogoutBtn onClick={onLogout}>로그아웃</StLogoutBtn>
                </StMyLi>
              </StMyUl>
            </StRectangle>
          </>
        )}
      </StHeaderNav>
    </StHeaderContainer>
  );
};
export default Header;
