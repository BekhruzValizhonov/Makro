import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const Inputs = ({
  createProduct,
  handleChange,
  setProductImage,
  productImage,
}) => {
  const onImagesChange = (e) => {
    setProductImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <input type="file" id="img" onChange={onImagesChange} />

      <img
        src={productImage}
        alt="Здесь скоро будет фото"
        className="m-2"
        width={350}
      />

      <InputGroup className="mb-2">
        <InputGroup.Text id="basic-addon1">Название Продукта</InputGroup.Text>
        <Form.Control
          name="name"
          value={createProduct.name || ""}
          onChange={handleChange}
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <select
        className="form-select mb-2"
        aria-label="Default select example"
        name="category"
        value={createProduct.category || ""}
        onChange={handleChange}
      >
        <option disabled defaultValue>
          Категория Продуктов
        </option>
        <option value="ТОП товары">ТОП товары</option>
        <option value="Напитки">Напитки</option>
        <option value="Молочная продукция">Молочная продукция</option>
        <option value="MBrand">MBrand</option>
      </select>

      <div className="d-flex mb-2">
        <InputGroup className="w-50">
          <InputGroup.Text id="basic-addon1">Страна</InputGroup.Text>
          <Form.Control
            name="country"
            value={createProduct.country || ""}
            onChange={handleChange}
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="w-50">
          <InputGroup.Text id="basic-addon1">Объем</InputGroup.Text>
          <Form.Control
            name="volume"
            value={createProduct.volume || ""}
            onChange={handleChange}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
    </>
  );
};

export default Inputs;
