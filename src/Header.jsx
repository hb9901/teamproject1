import React, { useEffect, useState } from "react";
import styles from "./styles/Header.module.css";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const toggleMenu = () => {
    document.getElementById('sidebar').style.transform = `translatex(23rem)`
    document.getElementById('background').style.transform = `translatex(100vw)`
  };

  const [resize, setResize] = useState();

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.Container}>
      {
        resize > 775?
        <Container className={styles.Container}>
      <Row>
        <Col sm className={styles.List}>
          <Link to="/" className={styles.Link}>
            로고
          </Link>
        </Col>
        <Col sm className={styles.List}>
          <Link to="/Restaurant" className={styles.Link}>
            음식점 리스트
          </Link>
        </Col>
        <Col sm className={styles.List}>
          <Link to="/Forum" className={styles.Link}>
            게시판
          </Link>
        </Col>
        <Col sm className={styles.List}>
          <Link to="/Mypage" className={styles.Link}>
            <CgProfile className={styles.MyIcon} />
          </Link>
        </Col>
      </Row>
    </Container>
      :
      <>
      <Container className={styles.Container}>
        <Row>

          <Col sm className={styles.List}>      
            <GiHamburgerMenu
            className={styles.Hamburger}
            style={{ color: "white" }}
            onClick={()=>toggleMenu()}
          />

          </Col>
          <Col sm className={styles.List}>
            <Link to="/\" className={styles.Link}>
              로고
            </Link>
          </Col>
          <Col sm className={styles.List}>
            <Link to="/Mypage" className={styles.Link}>
              <CgProfile className={styles.MyIcon} />
            </Link>
          </Col>
        </Row>
        <div id = 'sidebar' className= {styles.sidebar}> 
        <div className="customer_info">
          <Link to="/Mypage" className={styles.Link}>
            <CgProfile className={styles.MyIcon} />
          </Link>
        </div>
        <ul className='categories'>
          <li className="title" >
            메뉴
          </li>
          <li className="menu-item" >
          <Link to="/Restaurant" className={styles.Link}>
            음식점 리스트
          </Link>
          </li>
          <li className="menu-item" >
          <Link to="/Forum" className={styles.Link}>
            게시판
          </Link>
          </li>
        </ul>
        </div>
        <div id = 'background' className={styles.background} onClick={()=>{
              document.getElementById('sidebar').style.transform = `translatex(0)`
              document.getElementById('background').style.transform = `translatex(0)`
            }} />
      </Container>
      </>
      }
      
    </div>
  );
}
