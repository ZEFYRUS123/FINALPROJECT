import React, { useEffect, useState } from 'react';
import style from './App2.module.css';
import { useParams, Link } from 'react-router-dom';
import menuData from '../menu.json';
import { useCart } from '../Cart/CartContext';

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  details: string;
  ingredients: string[];
  reviews: { [name: string]: string }[];
}

function PizzaDetails() {
  const { pizzaId } = useParams<{ pizzaId?: string }>();
  const parsedPizzaId = pizzaId ? parseInt(pizzaId, 10) : null;
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [imageCount, setImageCount] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    if (parsedPizzaId !== null) {
      const foundPizza = menuData.find((item) => item.id === parsedPizzaId);
      if (foundPizza) {
        setPizza(foundPizza);
      }
    }
  }, [parsedPizzaId]);

  useEffect(() => {
    if (pizza) {
      setImageCount(pizza.images.length);
    }
  }, [pizza]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const incrementQuantity = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const { addToCart } = useCart();

  if (!pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.menu2}>
      <div className={style.menuitem}>
        <div className={style.menu_description2}>
          <h1 className={style.h1}>{pizza.name}</h1>
          <div className={style.items}>
            <img className={style.catimg2} src={pizza.images[0]} alt={pizza.name} />
            <p className={style.op}>{pizza.description}</p>
          </div>
          <h2 className={style.text}>Ингридиенты:</h2>
          <p className={style.op}>{pizza.ingredients.join(', ')}</p>
          <h2 className={style.text}>Описание:</h2>
          <p className={style.op}>{pizza.details}</p>
          <h2 className={style.text}>Цена: ${pizza.price} шт.</h2>
          <div className={style.divreviews}>
            <h2 className={style.h1}>Отзывы:</h2>
            <ul className={style.list_reviews}>
              {pizza.reviews.map((review, index) => (
                <li className={style.reviews_item} key={index}>
                  <img className={style.catimg3} src={Object.values(review)[0]} alt="Review Image" />
                  {Object.values(review)[1]}: {Object.values(review)[2]}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.buy}>
            <button
              className={`btn btn-primary ${style.addToCartButton}`}
              onClick={() => {
                addToCart(
                  {
                    id: pizza.id,
                    image: pizza.images[0],
                    name: pizza.name,
                    price: pizza.price,
                    quantity: selectedQuantity,
                  },
                  selectedQuantity,
                );
              }}
            >
              Поместить в корзину
            </button>
            <Link className={style.checkout} to="/cart">
              <button className={style.ofbutton}>
                Оформить заказ
              </button>
            </Link>
            <div className={style.div_cost}>
              <p className={style.total_cost}>Общая стоимость: ${(selectedQuantity * pizza.price).toFixed(2)}</p>
              <div className={style.quantityContainer}>
                <button className={style.but_cost} onClick={decrementQuantity}>-</button>
                <p>{selectedQuantity}</p>
                <button className={style.but_cost} onClick={incrementQuantity}>+</button>
              </div>
            </div>


            <h3>Оставить отзыв:</h3>
            <form className={style.form_review} action="">
              <textarea className={style.input_review} name="review" id=""></textarea>
              <button className={`btn btn-primary ${style.buttom_review}`}>Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetails;
