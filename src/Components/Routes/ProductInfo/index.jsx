import React, { useContext, useState } from "react";

import { Context } from "../../..";
import { observer } from "mobx-react-lite";

import { Button, Container } from "react-bootstrap";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Zoom from "react-img-zoom";

import useDispatch from "../../../hooks/useDispatch";

const ProductInfo = observer(() => {
  const context = useContext(Context);
  const [productInfo, setProductInfo] = useState(
    context.productInfoStore.productInfoArray
  );
  const { addToBasket, decrement, increment } = useDispatch();

  return (
    <div className="mt-5">
      <Container>
        {productInfo.map((product) => {
          return (
            <div key={product.id}>
              <div className="d-flex justify-content-between">
                <div>
                  <Zoom
                    img={product.image}
                    zoomScale={3}
                    width={400}
                    height={350}
                  />
                </div>

                <div className="d-flex flex-column">
                  <h4 className="text-center">{product.name}</h4>
                  <h4 className="text-center">
                    {product.price.toLocaleString("ru")} Сум
                  </h4>

                  <div className="d-flex justify-content-center  align-items-center">
                    {product.isSold ? (
                      <>
                        <Button
                          variant="danger"
                          onClick={() =>
                            decrement(
                              product.id,
                              context.productInfoStore.productInfoArray,
                              context.basketStore.basketArray
                            )
                          }
                        >
                          -
                        </Button>
                        <h5 className="d-flex justify-content-center  align-items-center">
                          <span className="info_piece">{product.piece}</span>
                          ШТ
                        </h5>
                        &nbsp;
                        <Button
                          variant="success"
                          onClick={() =>
                            increment(
                              product.id,
                              context.productInfoStore.productInfoArray
                            )
                          }
                        >
                          +
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-50"
                        variant="success"
                        onClick={() =>
                          addToBasket(
                            product.id,
                            context.productInfoStore.productInfoArray,
                            context.userStore.user,
                            context.productStore.totalPrice
                          )
                        }
                      >
                        Добавить <ShoppingCartIcon />
                      </Button>
                    )}
                  </div>
                  <h4 className="mt-3 py-2 px-3">Описание</h4>
                  <h6 className="py-2 px-3">{product.description}</h6>
                  <div>
                    <h4 className="px-3">Описание товара</h4>
                    <h6 className="px-3">Страна: {product.country}</h6>
                    <h6 className="px-3">Вес: {product.volume}</h6>
                  </div>
                  <div className="px-3">
                    <h4 className="mt-3">Состав продукта</h4>
                    <h6>{product.composition}</h6>
                  </div>
                </div>
              </div>
              <div className="food_flora">
                {product.nutrition && (
                  <>
                    <h4 className="text-start">Пищевая ценность</h4>
                    <div className="d-flex">
                      <div>
                        <p>Калории</p>
                        <p>{product.nutrition.calories}</p>

                        <p>Белки</p>
                        <p>{product.nutrition.protein}</p>
                      </div>
                      &nbsp;
                      <div>
                        <p>Жиры</p>
                        <p>{product.nutrition.oil}</p>

                        <p>Углеводы</p>
                        <p>{product.nutrition.carbohydrate}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
});

export default ProductInfo;
