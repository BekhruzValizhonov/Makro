import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

import { Container, Table } from "react-bootstrap";

import Decrement from "./buttons/Decrement";
import Increment from "./buttons/Increment";

const FavoriteProduct = observer(() => {
  const context = useContext(Context);
  const [favoriteProducts, setFavoriteProducts] = useState(
    context.favoriteStore.favoriteArray
  );

  return (
    <>
      <h1 className="text-center mb-3 mt-2">Любимый Продукт</h1>
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
            {favoriteProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt="404" width={100} />
                  </td>
                  <td>
                    {product.name}
                    <br />
                    <Decrement
                      productDisabled={product.isDisabled}
                      id={product.id}
                    />
                    <span className="favorite_piece">{product.piece}</span>
                    <Increment id={product.id} product={favoriteProducts} />
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

export default FavoriteProduct;
