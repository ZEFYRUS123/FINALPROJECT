import React from 'react';
import { Route, Link } from 'react-router-dom';
import menuData from '../menu.json';
import style from './Cart.module.css';
import { useCart } from './CartContext';


function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const handleRemoveFromCart = (itemId: number) => {
        removeFromCart(itemId);
    };


    return (
        <div>
            <h2>Корзина</h2>
            <div className={style.items}>
                <ul className={style.content}>
                    {cartItems.map((item) => (
                        <li className={style.item_cart} key={item.id}>
                            <div className={style.item_content}>
                                <div>
                                    <div className={style.div_span}>

                                        <span className={style.span}><Link to={`/catalog/${item.id}`}>{item.name} </Link> - {item.quantity} шт. - ${item.price.toFixed(2)} шт.</span>


                                    </div>
                                    <div className={style.dp}>
                                        <p className={style.p}>
                                            Общая сумма: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <img className={style.image_cart} src={item.image} alt={item.image} />

                                </div>
                                <div className={style.deletebutton}></div>
                                <button className={style.button_cart} onClick={() => handleRemoveFromCart(item.id)}>X</button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}
export default Cart;