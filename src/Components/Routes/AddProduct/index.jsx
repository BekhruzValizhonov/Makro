import React, { useContext, useState } from "react";

import { Context } from "../../..";

import { Link } from "react-router-dom";

import { Button, Form, InputGroup } from "react-bootstrap";
import styles from "./AddProduct.module.css";

import Inputs from "./Inputs";

const CreateProduct = () => {
  const [createProduct, setCreateProduct] = useState({});
  const [productImage, setProductImage] = useState([]);
  const context = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();

    context.productStore.addProduct({
      category: createProduct.category,
      name: createProduct.name,
      price: createProduct.price,
      volume: createProduct.volume,
      country: createProduct.country,
      composition: createProduct.composition,
      description: createProduct.description,
      calories: createProduct.calories,
      carbohydrate: createProduct.carbohydrate,
      image: productImage,
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateProduct({ ...createProduct, [name]: value });
  };

  return (
    <div className="mb-5">
      <div className={styles.create_product}>
        <h1 style={{ textAlign: "center", color: "#777" }}>Создать продукт</h1>

        <form onSubmit={handleSubmit}>
          <Inputs
            createProduct={createProduct}
            handleChange={handleChange}
            setProductImage={setProductImage}
            productImage={productImage}
          />
          <div className="d-flex mb-2">
            <InputGroup className="w-50">
              <InputGroup.Text id="basic-addon1">Цена</InputGroup.Text>
              <Form.Control
                name="price"
                value={createProduct.price || ""}
                onChange={handleChange}
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <InputGroup className="w-50">
              <InputGroup.Text id="basic-addon1">Калория</InputGroup.Text>
              <Form.Control
                name="calories"
                value={createProduct.calories || ""}
                onChange={handleChange}
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <InputGroup className="w-50">
              <InputGroup.Text id="basic-addon1">Углеводы</InputGroup.Text>
              <Form.Control
                name="carbohydrate"
                value={createProduct.carbohydrate || ""}
                onChange={handleChange}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>

          <InputGroup>
            <InputGroup.Text>Описание</InputGroup.Text>
            <Form.Control
              name="description"
              value={createProduct.description || ""}
              onChange={handleChange}
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>

          <InputGroup className="mt-2">
            <InputGroup.Text>Состав.......</InputGroup.Text>
            <Form.Control
              name="composition"
              value={createProduct.composition || ""}
              onChange={handleChange}
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>

          <div className={styles.link_button}>
            <div className={styles.button_start}>
              <Button onClick={handleSubmit} variant="success w-50">
                Создать
              </Button>
            </div>

            <div className={styles.link_end}>
              <Link to="/">Главная страница</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
