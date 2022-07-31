import { makeAutoObservable } from "mobx";

class ProductInfo {
  productInfoArray = [];
  constructor() {
    makeAutoObservable(this);
  }

  productInfo(id, product) {
    let productInfo = product.find((val) => val.id === id);
    this.productInfoArray.push(productInfo);

    if (this.productInfoArray.length === 2) {
      this.productInfoArray.shift();
    }
  }
}

const productInfoStore = new ProductInfo();
export default productInfoStore;
