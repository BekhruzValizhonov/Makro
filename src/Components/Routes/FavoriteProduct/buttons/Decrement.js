import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../../../";

const Decrement = ({ productDisabled, id }) => {
  const context = useContext(Context);

  return (
    <Button
      disabled={productDisabled}
      variant="danger"
      onClick={() => context.favoriteStore.decrement(id)}
    >
      -
    </Button>
  );
};

export default Decrement;
