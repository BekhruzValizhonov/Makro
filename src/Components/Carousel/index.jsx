import React, { useContext, useState } from "react";
import Decrement from "./buttons/Decrement";

import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Slider from "react-slick";

import Increment from "./buttons/Increment";
import AddToBasket from "./buttons/AddToBasket";
import useDispatch from "../../hooks/useDispatch";

import styles from "./Carousel.module.css";

const Carousel = observer(() => {
  const context = useContext(Context);
  const [carouselProducts, setCarouselProducts] = useState(
    context.productStore.carouselProduct
  );
  const { favoriteClick } = useDispatch();

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <span
        id={styles.next_arrow}
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <ArrowBackIosIcon />
      </span>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <span
        id={styles.prev_arrow}
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <ArrowForwardIosIcon />
      </span>
    );
  };

  let settings = {
    infinite: true,
    dots: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SampleNextArrow />,
    nextArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 1000,
          infinite: true,
        },
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 1000,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 614,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 1000,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      {carouselProducts.map((value, idx) => {
        return (
          <Slider {...settings} key={idx}>
            {value.map((product) => {
              return (
                <div key={idx}>
                  <div className={styles.text_category}>
                    <p>{product.allCategory}</p>
                  </div>

                  <div className="mb-1 mt-1" key={product.id}>
                    <Card style={{ width: "17rem", height: "22rem" }}>
                      <Link
                        to="/productInfo"
                        onClick={() =>
                          context.productInfoStore.productInfo(
                            product.id,
                            value
                          )
                        }
                      >
                        <Card.Img
                          variant="top"
                          src={product.image}
                          id={styles.card_image}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Text style={{ color: "#555" }}>
                          {product.name}
                        </Card.Text>
                        <Card.Text className={styles.card_price_text}>
                          {product.price.toLocaleString("ru")} Сум
                        </Card.Text>
                        <div className={styles.button_card}>
                          {/* IsSold */}
                          {product.isSold ? (
                            <>
                              <Decrement id={product.id} product={value} />
                              <h5 style={{ color: "black" }}>
                                <span className={styles.card_piece}>
                                  {product.piece}
                                </span>
                                ШТ
                              </h5>
                              &nbsp;
                              <Increment id={product.id} product={value} />
                            </>
                          ) : (
                            <AddToBasket id={product.id} product={value} />
                          )}
                          {/* /IsSold */}

                          <span
                            className={
                              product.isFavorite
                                ? styles.favorite_icon
                                : styles.icon
                            }
                            onClick={() =>
                              favoriteClick(
                                product.id,
                                value,
                                context.userStore.user
                              )
                            }
                          >
                            <FavoriteIcon style={{ fontSize: "2rem" }} />
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
          </Slider>
        );
      })}
    </div>
  );
});

export default Carousel;
