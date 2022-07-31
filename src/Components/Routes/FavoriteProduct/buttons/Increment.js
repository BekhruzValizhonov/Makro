import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../../../";

const Increment = ({ id }) => {
  const context = useContext(Context);
  return (
    <Button
      variant="success"
      onClick={() => context.favoriteStore.increment(id)}
    >
      +
    </Button>
  );
};

export default Increment;
