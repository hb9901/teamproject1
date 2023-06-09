import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "./styles/Mypage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

import ReactGA from "react-ga";
import Pagination from "./Pagination";

export default function Mypage() {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  //중복확인용 닉네임
  let [dupNickname, setDupNickname] = useState("");
  //사용자 닉네임 설정
  let [userNickname, setUserNickname] = useState("");
  //사용자 닉네입 입력
  let [inputUserNick, setInputUserNick] = useState("");
  //사용자 이메일 설정
  let [userEmail, setUserEmail] = useState();
  //닉네임 중복 확인
  let [nicknameTF, setNicknameTF] = useState();
  //카테고리 선택
  let [categoryId, setCategoryId] = useState("");
  //카테고리 이ㄻ
  let [categoryName, setCategoryName] = useState("내가 쓴 글");
  //작성했던 글들 리스트,
  let [userlist, setUserlist] = useState([{ contents: "" }]);
  //로그인 상태 확인
  let location = useLocation();
  //페이지 정보
  const [postsnum, setPostsnum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  //sorting 정보
  const [sorting, setSorting] = useState("date,desc");
  //mypage 정보 get
  useEffect(() => {
    categoryId === ""
      ? axios
          .get("http://52.44.107.157:8080/api/mypage/", {
            headers: {
              Authorization: `Bearer ${location.state.token}`,
            },
          })
          .then((result) => {
            setUserNickname(result.data.nickname);
            setUserEmail(result.data.email);
          })
          .catch((err) => {
            // console.log(err);
          })
      : categoryId === "bookmark"
      ? axios
          .get("http://52.44.107.157:8080/api/mypage/bookmark", {
            params: {
              page: currentPage - 1,
              size: postsPerPage,
            },
            headers: {
              Authorization: `Bearer ${location.state.token}`,
            },
          })
          .then((result) => {
            setUserlist(result.data.content);
            setCategoryName("즐겨찾기한 음식점");
            setPostsnum(result.data.totalElements);
          })
          .catch((err) => {
            // console.log(err);
          })
      : categoryId === "review"
      ? axios
          .get("http://52.44.107.157:8080/api/mypage/review", {
            params: {
              sort: sorting,
              page: currentPage - 1,
              size: postsPerPage,
            },
            body: {
              sort: sorting,
            },
            headers: {
              Authorization: `Bearer ${location.state.token}`,
            },
          })
          .then((result) => {
            setUserlist(result.data.content);
            setCategoryName("내가 쓴 리뷰");
            setPostsnum(result.data.totalElements);
          })
          .catch((err) => {
            //console.log(err);
          })
      : categoryId === "post"
      ? axios
          .get("http://52.44.107.157:8080/api/mypage/post", {
            params: {
              sort: sorting,
              page: currentPage - 1,
              size: postsPerPage,
            },
            headers: {
              Authorization: `Bearer ${location.state.token}`,
            },
          })
          .then((result) => {
            setUserlist(result.data.content);
            setCategoryName("내가 쓴 게시글");
            setPostsnum(result.data.totalElements);
          })
          .catch((err) => {
            //console.log(err);
          })
      : categoryId === "comment"
      ? axios
          .get("http://52.44.107.157:8080/api/mypage/comment", {
            params: {
              page: currentPage - 1,
              size: postsPerPage,
              sort: sorting,
            },
            headers: {
              Authorization: `Bearer ${location.state.token}`,
            },
          })
          .then((result) => {
            setUserlist(result.data.content);
            setCategoryName("내가 쓴 댓글");
            setPostsnum(result.data.totalElements);
          })
          .catch((err) => {
            // console.log(err);
          })
      : console.log("");
  }, [categoryId, currentPage]);

  //닉네임 중복 확인
  const Nickname = () => {
    ReactGA.event({
      category: "Button",
      action: "닉네임중복확인",
      label: "mypage",
    });
    axios
      .post(
        "http://52.44.107.157:8080/api/mypage/check",
        {
          nickname: inputUserNick,
        },
        {
          headers: {
            Authorization: `Bearer ${location.state.token}`,
          },
        }
      )
      .then((res) => {
        //setCertification(res)
        res.data == true ? setNicknameTF(true) : setNicknameTF(false);
        setDupNickname(inputUserNick);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //변경된 닉네임 등록
  const ChangeNickname = async () => {
    ReactGA.event({
      category: "Button",
      action: "닉네임수정",
      label: "mypage",
    });
    await axios
      .put(
        "http://52.44.107.157:8080/api/mypage/change",
        {
          nickname: inputUserNick,
        },
        {
          headers: {
            Authorization: `Bearer ${location.state.token}`,
          },
        }
      )
      .then((res) => {
        setUserNickname(inputUserNick);
        setNicknameTF(false);
        setInputUserNick("");
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
        Img={location.state.Img}
      />
      <div className={styles.Container}>
        <div className={styles.LeftContainer}>
          <div className={styles.Intro}>
            <CgProfile
              className={styles.MyIcon}
              onClick={() => {
                setCategoryId("");
                ReactGA.event({
                  category: "Button",
                  action: "프로필",
                  label: "mypage",
                });
              }}
            />
            <div className={styles.Nickname}>{userNickname}</div>
          </div>
          <ul className={styles.WritedWrap}>
            <li
              className={styles.Writed}
              onClick={() => {
                setCategoryId("bookmark");
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "즐겨찾기한음식점",
                  label: "mypage",
                });
              }}
            >
              즐겨찾기한 음식점
            </li>
            <li
              className={styles.Writed}
              onClick={() => {
                setCategoryId("review");
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "내가쓴리뷰",
                  label: "mypage",
                });
              }}
            >
              내가 쓴 리뷰
            </li>
            <li
              className={styles.Writed}
              onClick={() => {
                setCategoryId("post");
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "내가쓴게시글",
                  label: "mypage",
                });
              }}
            >
              내가 쓴 게시글
            </li>
            <li
              className={styles.Writed}
              onClick={() => {
                setCategoryId("comment");
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "내가쓴댓글",
                  label: "mypage",
                });
              }}
            >
              내가 쓴 댓글
            </li>
          </ul>
        </div>

        <div className={styles.RightContainer}>
          <hr className={styles.Line2}></hr>
          <div className={styles.ListContent}>
            <div className={styles.EmailContainer}>
              <div className={styles.EmailLeft}>내 이메일</div>
              <div className={styles.EmailRight}>{userEmail}</div>
            </div>
            <hr className={styles.Line}></hr>
            <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
              <Form.Label className={styles.KwId}>Nickname</Form.Label>
              <Form.Control
                id="newUserNick"
                className={styles.Input}
                type="text"
                autoComplete="off"
                placeholder="닉네임을 입력해 주세요"
                onChange={(e) => {
                  e.preventDefault();
                  setInputUserNick(e.target.value);
                }}
              />
              <Button
                className={styles.Btn}
                variant="primary"
                onClick={Nickname}
                style={{
                  backgroundColor: inputUserNick.length == 0 && "#06A77D",
                  border: inputUserNick.length == 0 && "#06A77D",
                  color: inputUserNick.length == 0 && "white",
                  marginRight: "1%",
                  marginLeft: "1%",
                }}
                disabled={inputUserNick.length == 0 ? true : false}
              >
                중복 확인
              </Button>

              <Button
                className={styles.Btn}
                variant="primary"
                onClick={ChangeNickname}
                style={{
                  backgroundColor: nicknameTF
                    ? dupNickname === inputUserNick
                      ? null
                      : "#06A77D"
                    : "#06A77D",
                  border: nicknameTF ? null : "#06A77D",
                  color: nicknameTF ? null : "white",
                }}
                disabled={
                  nicknameTF
                    ? dupNickname === inputUserNick
                      ? false
                      : true
                    : true
                }
              >
                닉네임변경
              </Button>
            </Form.Group>
            <div className={styles.BottomTitle}>{categoryName}</div>

            {
              //즐겨찾기한 음식점
              categoryId === "bookmark"
                ? userlist.map((a, i) => {
                    return (
                      <div className={styles.CommentLine}>
                        <hr className={styles.CommentCLine}></hr>
                        <div className={styles.CommentHeader}>
                          <img
                            src={a.storeImage}
                            className={styles.imageHandler}
                          />
                          <div className={styles.commentRight}>
                            <div className={styles.NicknameSecondB}>
                              {a.category}
                            </div>
                            <div className={styles.CommentContent}>
                              {a.storeName}({a.grade}점)
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : //내가 쓴 리뷰
                categoryId === "review"
                ? userlist.map((a, i) => {
                    return (
                      <div>
                        <div className={styles.CommentLine}>
                          <hr className={styles.CommentCLine}></hr>
                          <div className={styles.CommentHeader}>
                            <div className={styles.NicknameSecond}>
                              {userNickname}
                            </div>
                            <div className={styles.CommentDate}>{a.date}</div>
                          </div>
                          <div className={styles.CommentContent}>
                            {a.contents}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : //내가 쓴 게시글
                categoryId === "post"
                ? userlist.map((a, i) => {
                    return (
                      <div className={styles.CommentLine}>
                        <hr className={styles.CommentCLine}></hr>
                        <div className={styles.CommentHeader}>
                          <div className={styles.NicknameSecond}>
                            {a.category}
                          </div>
                          <div className={styles.CommentDate}>{a.date}</div>
                        </div>
                        <div className={styles.CommentContent}>
                          {a.contents}
                        </div>
                      </div>
                    );
                  })
                : //내가 쓴 댓글
                categoryId === "comment"
                ? userlist.map((a, i) => {
                    return (
                      <div>
                        <div className={styles.CommentLine}>
                          <hr className={styles.CommentCLine}></hr>
                          <div className={styles.CommentHeader}>
                            <div className={styles.NicknameSecond}>
                              {userNickname}
                            </div>
                            <div className={styles.CommentDate}>{a.date}</div>
                          </div>
                          <div className={styles.CommentContent}>
                            {a.contents}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : console.log("")
            }
            {categoryId === "" ? (
              <div></div>
            ) : (
              <div className={styles.Paging}>
                <hr className={styles.CommentCLine}></hr>
                <Pagination
                  className={styles.paging}
                  postsPerPage={postsPerPage}
                  totalPosts={postsnum}
                  paginate={setCurrentPage}
                  currentPage={currentPage}
                ></Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
