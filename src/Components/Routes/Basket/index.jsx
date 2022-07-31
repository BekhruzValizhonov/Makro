import React, { useContext, useState } from "react";

import { observer } from "mobx-react-lite";
import { Context } from "../../..";

import { Button, Container } from "react-bootstrap";
import { Table } from "@mui/material";

const Basket = observer(() => {
  const context = useContext(Context);
  const [basketProducts, setProducts] = useState(
    context.basketStore.basketArray
  );

  return (
    <>
      <h1 className="text-center mb-3 mt-2">Корзина</h1>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Фотография</th>
              <th>Названия/кол.</th>
              <th>Сумма</th>
              <th>Общая сумма</th>
            </tr>
          </thead>
          <tbody>
            {basketProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt="404" width={100} />
                  </td>
                  <td>
                    {product.name}
                    <br />

                    <Button
                      variant="danger"
                      onClick={() =>
                        context.basketStore.decrement(
                          product.id,
                          context.productStore.totalPrice
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="basket_piece">{product.piece}</span>
                    <Button
                      variant="success"
                      onClick={() =>
                        context.basketStore.increment(
                          product.id,
                          context.productStore.totalPrice
                        )
                      }
                    >
                      +
                    </Button>
                  </td>
                  <td>{product.price.toLocaleString("ru")} Сум/шт</td>
                  <td>{product.totalPrice.toLocaleString("ru")} Сум</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
});

export default Basket;
