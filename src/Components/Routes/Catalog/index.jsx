import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import useDispatch from "../../../hooks/useDispatch";

import { Button, Card } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./Catalog.module.css";

const Catalog = observer(() => {
  const context = useContext(Context);
  const [foundProducts, setFoundProducts] = useState(
    context.productStore.foundProducts
  );
  const { favoriteClick, addToBasket, decrement, increment } = useDispatch();

  useEffect(() => {
    setFoundProducts(context.productStore.foundProducts);
  }, [context.productStore.foundProducts]);

  return (
    <div>
      <div className={styles.main}>
        {foundProducts.map((product) => {
          return (
            <div className="mt-4 mb-3" key={product.id}>
              <Card style={{ width: "17rem", height: "22rem" }}>
                <Link
                  to="/productInfo"
                  onClick={() =>
                    context.productInfoStore.productInfo(
                      product.id,
                      context.productStore.foundProducts
                    )
                  }
                >
                  <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                  <Card.Text style={{ color: "#555" }}>
                    {product.name}
                  </Card.Text>
                  <Card.Text className={styles.card_price_text}>
                    {product.price.toLocaleString("ru")} Сум
                  </Card.Text>
                  <div className={styles.button_catalog}>
                    {product.isSold ? (
                      <>
                        <Button
                          className={styles.catalog_button}
                          variant="danger"
                          onClick={() =>
                            decrement(
                              product.id,
                              context.productStore.foundProducts,
                              context.userStore.user,
                              context.basketStore.basketArray
                            )
                          }
                        >
                          -
                        </Button>
                        <h5 style={{ color: "black" }}>
                          <span className="info_piece">{product.piece}</span>
                          ШТ
                        </h5>
                        &nbsp;
                        <Button
                          className={styles.catalog_button}
                          variant="success"
                          onClick={() =>
                            increment(
                              product.id,
                              context.productStore.foundProducts,
                              context.userStore.user
                            )
                          }
                        >
                          +
                        </Button>
                      </>
                    ) : (
                      <Button
                        className={styles.catalog_button}
                        variant="success"
                        onClick={() =>
                          addToBasket(
                            product.id,
                            context.productStore.foundProducts,
                            context.userStore.user
                          )
                        }
                      >
                        Добавить <ShoppingCartIcon />
                      </Button>
                    )}
                    <span
                      className={
                        product.isFavorite ? styles.favorite_icon : styles.icon
                      }
                      onClick={() =>
                        favoriteClick(
                          product.id,
                          foundProducts,
                          context.userStore.user,
                          foundProducts
                        )
                      }
                    >
                      <FavoriteIcon style={{ fontSize: "2rem" }} />
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Catalog;
