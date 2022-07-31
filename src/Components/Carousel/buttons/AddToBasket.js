import React, { useContext } from "react";
import { Context } from "../../..";
import useDispatch from "../../../hooks/useDispatch";

import Button from "react-bootstrap/Button";
import styles from "../Carousel.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AddToBasket = ({ id, product }) => {
  const context = useContext(Context);
  const { addToBasket } = useDispatch();

  return (
    <Button
      className={styles.card_button}
      variant="success"
      onClick={() =>
        addToBasket(
          id,
          product,
          context.userStore.user,
          context.productStore.totalPrice
        )
      }
    >
      Добавить <ShoppingCartIcon />
    </Button>
  );
};

export default AddToBasket;
