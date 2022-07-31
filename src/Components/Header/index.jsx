import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { Context } from "../..";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "react-bootstrap";

import styles from "./Header.module.css";

const Header = observer(() => {
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const context = useContext(Context);
  const navigate = useNavigate(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    context.productStore.findProduct(search);
    navigate("/catalog");
    setSearch("");
  };

  const filterByCategory = (e) => {
    setSelectValue(e.target.value);
    context.productStore.byCategory(selectValue);
    navigate("/catalog");
  };

  useEffect(() => {
    context.productStore.byCategory(selectValue);
  }, [selectValue]);

  return (
    <nav className={styles.header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id={styles.search}
          placeholder="Поиск товаров по каталогу"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="light">Поиск...</Button>

        <select
          className={styles.header_select}
          name="category"
          value={selectValue}
          onChange={filterByCategory}
        >
          <option disabled>Категория</option>
          <option value={"ТОП товары"}>ТОП товары</option>
          <option value={"MBrand"}>MB rand</option>
          <option value={"Напитки"}>Напитки</option>
          <option value={"Молочная продукция"}>Молочная продукция</option>
        </select>
      </form>
      <Link to="/">Главная Страница</Link>
      {/* admin password: admin1111  */}
      {context.userStore.user.email === "admin@gmail.com" && (
        <Link to="/create">Создать продукт</Link>
      )}
      <Link to="/signup">Регистрация</Link>
      <Link to="/login">Войти</Link>
      <Link to="/favorite">
        <span>
          <FavoriteIcon />
        </span>
      </Link>

      <Link to="/basket">
        Корзина
        <span>
          <ShoppingCartIcon />
          <span style={{ fontSize: "18px" }}>
            {context.productStore.totalPrice.toLocaleString("ru")}
          </span>
          &nbsp;Сум
        </span>
      </Link>
    </nav>
  );
});

export default Header;
