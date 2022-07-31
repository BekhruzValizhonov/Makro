import React from "react";
import { observer } from "mobx-react-lite";
import Carousel from "./Components/Carousel";

const App = observer(() => {
  return (
    <div>
      <Carousel />
    </div>
  );
});

export default App;
