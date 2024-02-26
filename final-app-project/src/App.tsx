import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Catalog from './components/Catalog_PizzaDetails/Catalog';
import Reviews from './components/Reviews/Reviews';
import style from './App.module.css';
import Contact from './components/Contact/Contact';
import PizzaDetails from './components/Catalog_PizzaDetails/PizzaDetails';
import Cart from './components/Cart/Cart';
import { CartProvider, useCart } from './components/Cart/CartContext';
import { FaShoppingCart,FaUser } from 'react-icons/fa';

function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={style.nav}>
      <ul className={style.ul}>
        <li className={style.li}>
          <Link to="/" className={style.l}>Главная</Link>
        </li>
        <li>
          <Link to="/catalog" className={style.l}>Каталог</Link>
        </li>
        <li>
          <Link to="/reviews" className={style.l}>Отзывы</Link>
        </li>
        <li>
          <Link to="/contact" className={style.l}>Контакты</Link>
        </li>
      </ul>

      <div className={style.btn_menu}>
        <div className={style.cart}>

        <Link to="/login" className={style.authIcon}>
          <FaUser />
        </Link>
          


          <Link to="/cart" className={style.cart_item}>
            <FaShoppingCart />
            {totalItems}
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className={style.main}>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/*" element={<Catalog />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog/:pizzaId" element={<PizzaDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
      <footer className={style.footer}>© 2023 Pizza Place. Все права защищены</footer>
    </Router>
  );
}

export default App;
