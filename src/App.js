import Header from "./Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles/App.module.css";
import "./styles/Slick.css";
import Button from "react-bootstrap/Button";

function App() {
  const settingsWithModules = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <div className={styles.Container}>
        <span>
          <b>검색</b>
        </span>
        <form>
          <input type="search" className={styles.Search}></input>
        </form>
        <p>
          <b>학식</b>
        </p>

        <Button
          className={styles.Btn}
          variant="primary"
          onClick={() =>
            window.open("https://www.kw.ac.kr/ko/life/facility11.jsp", "_blank")
          }
        >
          이번주 학식 보러가기
        </Button>

        <p>
          <b>추천 음식점</b>
        </p>
        <Slider {...settingsWithModules}>
          <div className={styles.Img}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBMsXIyVI_klwdSTFJVzOT3-MgHC7JS8TvSQ&usqp=CAU"
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.Img}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHD_6BH9TeYm8t3mXjOk8T3j4WXzKtDjJoGA&usqp=CAU"
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.Img}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqJyNsmOHFwhAczOF5BGVyGV00TrjcTSOBg&usqp=CAU"
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.Img}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZzRpBlbnogFySQeIR6ttK2JHRQaluregrg&usqp=CAU"
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.Img}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1GT3nAxriAC4h7BLcQYpZAtOjw0Jjx4NvAw&usqp=CAU"
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.Img}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4TlaLpGHeLiYqEchmVgGYK1GFoHYGbdqRMg&usqp=CAU"
              style={{ width: "100%" }}
            />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default App;