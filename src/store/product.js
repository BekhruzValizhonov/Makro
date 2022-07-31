import { makeAutoObservable } from "mobx";
import products from "../data/products";

class Product {
  lastId = 26;
  carouselProduct = products;
  foundProducts = [];
  totalPrice = 0;
  newAddedProducts = products.flat();

  constructor() {
    makeAutoObservable(this);
  }

  addProduct({
    name,
    category,
    price,
    country,
    volume,
    composition,
    description,
    calories,
    carbohydrate,
    image,
  }) {
    this.newAddedProducts.push({
      id: this.lastId++,
      category: category,
      name: name,
      price: JSON.parse(price),
      volume: volume,
      country: country,
      composition: composition,
      description: description,
      nutrition: {
        calories: calories,
        carbohydrate: carbohydrate,
      },
      image: image,
      allCategory: category,
      isSold: false,
      piece: 0,
      totalPrice: JSON.parse(price),
      isFavorite: false,
      isDisabled: true,
    });
  }

  increment(id, products) {
    let product = products.find((v) => v.id === id);

    product.piece += 1;

    product.totalPrice += product.price;

    this.totalPrice += product.price;
  }

  decrement(id, products, basketArray) {
    let product = products.find((v) => v.id === id);

    product.piece -= 1;

    product.totalPrice -= product.price;

    this.totalPrice -= product.price;

    if (product.piece < 1) {
      product.isSold = false;
    }

    if (product.piece === 0) {
      basketArray.splice(
        basketArray.findIndex((product) => product.id === id),
        1
      );
    }
  }

  byCategory(selectValue) {
    this.foundProducts = this.newAddedProducts.filter(
      (v) => v.category === selectValue
    );
  }

  findProduct(inputValue) {
    this.foundProducts = this.newAddedProducts.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
}

const productStore = new Product();
export default productStore;
