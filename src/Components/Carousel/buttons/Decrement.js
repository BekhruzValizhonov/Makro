import React, { useContext } from "react";
import { Context } from "../../..";
import Button from "react-bootstrap/Button";
import styles from "../Carousel.module.css";

const Decrement = ({ id, product }) => {
  const context = useContext(Context);

  return (
    <Button
      className={styles.card_button}
      variant="danger"
      onClick={() =>
        context.productStore.decrement(
          id,
          product,
          context.basketStore.basketArray
        )
      }
    >
      -
    </Button>
  );
};

export default Decrement;
