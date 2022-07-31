import React, { useContext } from "react";
import { Context } from "../../..";

import Button from "react-bootstrap/Button";
import styles from "../Carousel.module.css";

const Increment = ({ id, product }) => {
  const context = useContext(Context);

  return (
    <Button
      className={styles.card_button}
      variant="success"
      onClick={() => context.productStore.increment(id, product)}
    >
      +
    </Button>
  );
};

export default Increment;
