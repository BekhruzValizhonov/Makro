import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

const useDispatch = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const favoriteClick = (id, product, user) => {
    context.favoriteStore.addToFavorites(id, product, user);
  };

  const addToBasket = (id, product, user, totalPrice) => {
    !context.userStore.user.isLoggedIn
      ? navigate("/signup")
      : context.basketStore.addToBasket(id, product, user, totalPrice);
  };

  const userData = ({ id, email, accessToken }) => {
    context.userStore.userInfo({
      id: id,
      email: email,
      accessToken: accessToken,
    });
  };

  const decrement = (id, product, user, basketArray) => {
    context.productStore.decrement(id, product, user, basketArray);
  };

  const increment = (id, product, user) => {
    context.productStore.increment(id, product, user);
  };

  return { favoriteClick, addToBasket, userData, decrement, increment };
};

export default useDispatch;
