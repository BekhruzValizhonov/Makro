import { makeAutoObservable } from "mobx";
import productStore from "./product";

class FavoriteProduct {
  favoriteArray = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToFavorites(id, products, user) {
    let product = products.find((v) => v.id === id);
    let favoriteProduct = this.favoriteArray.find((v) => v.id === id);

    if (user.isLoggedIn) {
      product.isFavorite = !product.isFavorite;
      product.isDisabled = true;
    }

    if (user.isLoggedIn && !favoriteProduct) {
      this.favoriteArray.push(product);
    }

    if (user.isLoggedIn && !product.isFavorite) {
      this.favoriteArray.splice(
        this.favoriteArray.findIndex((product) => product.id === id),
        1
      );
      productStore.totalPrice -= product.totalPrice;
      productStore.totalPrice -= product.price;
      product.piece = 0;
    }
  }

  increment(id) {
    let favoriteProduct = this.favoriteArray.find((v) => v.id === id);

    favoriteProduct.piece += 1;

    if (favoriteProduct.piece > 0) {
      favoriteProduct.totalPrice += favoriteProduct.price;
      productStore.totalPrice += favoriteProduct.totalPrice;
    }

    if (favoriteProduct.piece > 0) {
      favoriteProduct.isDisabled = false;
    }
  }

  decrement(id) {
    let favoriteProduct = this.favoriteArray.find((v) => v.id === id);

    favoriteProduct.piece -= 1;
    favoriteProduct.totalPrice -= favoriteProduct.price;
    productStore.totalPrice -= favoriteProduct.totalPrice;

    if (favoriteProduct.piece < 1) {
      favoriteProduct.isSold = false;
    }
  }
}

const favoriteStore = new FavoriteProduct();

export default favoriteStore;
