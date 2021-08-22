import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StProfileImg } from "../../Global/StProfileImg/StProfileImg";
import ImageSlider from "../../Global/ImageSlider/ImageSlider";
import time from "../../service/time/time";
import getMatchUid from "../../service/usersData/getMatchUid";
import { Theme } from "../../style/Theme";

import {
  StMenuIcon,
  StChatbubbleIcon,
  StHeartIcon,
  StHeartFill,
  StSendIcon,
  StBookmarkIcon,
  StSmileIocn,
  StBookmarkFill,
} from "../../Global/StIcon/StIcon";
import {
  StFunctionList,
  StPostFunction,
  StPostHeader,
  StProfileContainer,
  StProfileId,
  StProfileInfo,
  StProfileLocation,
  StComments,
  StCommentsArea,
  StTextContainer,
  StDisplayName,
  StJustText,
  StMoreText,
} from "../../Global/StPost/StPost";
import getHeart from "../../service/heart/getHeart";
import setHeart from "../../service/heart/setHeart";
import getBookMarkPostIds from "../../service/bookMark/getBookMarkPostIds";
import setBookMark from "../../service/bookMark/setBookMark";
import getHeartLength from "../../service/heart/getHeartLength";
import { Link } from "react-router-dom";
import getUserImg from "../../service/usersData/getUserImg";
import { useRef } from "react";
import StButton from "../../Global/StButton/StButton";

const StArticleItem = styled.li`
  margin-right: 2em;
  margin-bottom: 4em;
  /* width: 38.375rem; */
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.contentColor};
`;

const StHomeArticle = styled.article`
  width: 100%;
`;

const ImageSliderContainer = styled.div`
  max-width: 37.5em;
  max-height: 40.5em;
`;

const PostCol = ({
  article,
  userData,
  currentUserUid,
  handlePostMenu,
  setClickedPostId,
  setClickedPostUid,
}) => {
  const [match, setMatchUser] = useState({});
  const {
    imgsData,
    noComments,
    timestamp,
    text,
    location,
    uid,
    postId,
    displayName,
  } = article;
  const imgs = imgsData; // imageSlider에 매개변수를 img로 사용
  const [photoURL, setPhotoURL] = useState("");
  const [heartData, setHeartData] = useState([]);
  const [heartLength, setHeartLength] = useState([]);
  const [bookMarkPostIds, setBookMarkPostIds] = useState([]);
  const justTextRef = useRef();
  const moreTextRef = useRef();

  useEffect(() => {
    getMatchUid(uid, setMatchUser);
    const heart = getHeart(setHeartData);
    const bookMark = getBookMarkPostIds(setBookMarkPostIds);
    const heartLength = getHeartLength(postId, setHeartLength);

    return () => {
      heart();
      bookMark();
      heartLength();
    };
  }, [uid, postId]);

  useEffect(() => {
    const profileImg = getUserImg(uid, setPhotoURL);

    return () => {
      profileImg();
    };
  }, [uid, setPhotoURL]);

  const functionList = [
    {
      icon: heartData.includes(postId) ? (
        <StHeartFill width="2" color={Theme.colors.red} />
      ) : (
        <StHeartIcon width="2" />
      ),
    },
    { icon: <StChatbubbleIcon width="2" /> },
    { icon: <StSendIcon width="2" /> },
    {
      icon: bookMarkPostIds.includes(postId) ? (
        <StBookmarkFill width="2" color={Theme.colors.black} />
      ) : (
        <StBookmarkIcon width="2" />
      ),
    },
  ];

  const clickHeart = () => {
    setHeart(postId, heartData);
  };

  const clickBookMark = () => {
    setBookMark(postId, bookMarkPostIds);
  };

  const selectFnc = (index) => {
    if (index === 0) {
      clickHeart();
    } else if (index === 3) {
      clickBookMark();
    } else {
      return;
    }
  };

  return (
    <StArticleItem>
      <StPostHeader
        padding="1em"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <StProfileContainer
          height="2.5em"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StProfileImg src={photoURL} alt="my profile img" height="100%" />
          <StProfileInfo
            margin="0 0 0 1em"
            display="flex"
            flexDirection="column"
          >
            <StProfileId fontWeight="600">
              <Link to={displayName}> {match.displayName}</Link>
            </StProfileId>

            <StProfileLocation fontSize="0.7em">{location}</StProfileLocation>
          </StProfileInfo>
        </StProfileContainer>
        <button
          onClick={() => {
            handlePostMenu();
            setClickedPostId(postId);
            setClickedPostUid(uid);
          }}
        >
          <StMenuIcon width="1.5" />
        </button>
      </StPostHeader>

      <StHomeArticle>
        <ImageSliderContainer>
          <ImageSlider imgs={imgs} />
        </ImageSliderContainer>

        <StPostFunction padding="1em">
          <StFunctionList margin="0 0 0.5em 0 ">
            {functionList.map((ftn, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    selectFnc(index);
                  }}
                >
                  {ftn.icon}
                </button>
              </li>
            ))}
          </StFunctionList>
          <div>{`좋아요 ${heartLength.length}개`}</div>

          <StTextContainer>
            <StDisplayName>{displayName}</StDisplayName>
            <StJustText ref={justTextRef}>
              {text.length > 15 ? `${text.slice(0, 16)} ...` : text}
              <StButton
                margin="0 0.5em"
                fontWeight="600"
                color={Theme.colors.skyblueInnerText}
                btnText="more"
                onClick={() => {
                  justTextRef.current.style.display = "none";
                  moreTextRef.current.style.display = "block";
                }}
              />
            </StJustText>
            <StMoreText ref={moreTextRef}>
              {text}
              <StButton
                margin="0 0.5em"
                fontWeight="600"
                color={Theme.colors.skyblueInnerText}
                btnText="close"
                onClick={() => {
                  justTextRef.current.style.display = "block";
                  moreTextRef.current.style.display = "none";
                }}
              />
            </StMoreText>
          </StTextContainer>

          <div>comment</div>
          <div>{time(timestamp)}</div>
        </StPostFunction>

        {!noComments && (
          <StComments
            padding="0.5em 1em"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderTop={`1px solid ${Theme.colors.borderColor}`}
          >
            <StSmileIocn width="1.5em" />
            <StCommentsArea
              placeholder="댓글 달기..."
              margin="0 1em"
              padding="1em 0 0 0 "
              flexGrow="1"
            />
            <button>제출</button>
          </StComments>
        )}
      </StHomeArticle>
    </StArticleItem>
  );
};

export default PostCol;
