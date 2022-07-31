import { makeAutoObservable } from "mobx";
import productStore from "./product";

class Basket {
  basketArray = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToBasket(id, products, user) {
    let product = products.find((value) => value.id === id);

    if (user.isLoggedIn) {
      product.isSold = true;
      product.piece += 1;
      product.totalPrice += product.price;
      productStore.totalPrice += product.price;
    }

    let basketProduct = this.basketArray.find((value) => value.id === id);

    if (basketProduct && user.isLoggedIn) {
      basketProduct.piece += 1;
      basketProduct.totalPrice += basketProduct.price;
      productStore.totalPrice += basketProduct.price;
    } else {
      this.basketArray.push(product);
    }
  }

  increment(id) {
    let basketProduct = this.basketArray.find((val) => val.id === id);
    basketProduct.piece += 1;
    basketProduct.totalPrice += basketProduct.price;
    productStore.totalPrice += basketProduct.price;
  }

  decrement(id) {
    let basketProduct = this.basketArray.find((val) => val.id === id);
    basketProduct.piece -= 1;
    basketProduct.totalPrice -= basketProduct.price;
    productStore.totalPrice -= basketProduct.price;

    if (basketProduct.piece === 0) {
      this.basketArray.splice(
        this.basketArray.findIndex((product) => product.id === id),
        1
      );
    }

    if (basketProduct.piece < 1) {
      basketProduct.isSold = false;
    }
  }
}

const basketStore = new Basket();

export default basketStore;
