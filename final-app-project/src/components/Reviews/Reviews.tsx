// Reviews.tsx
import React from 'react';
import style from './Reviews.module.css';
import { Route, Link } from 'react-router-dom';
import menuData from '../reviews (2).json';
function Reviews() {
    return (
        <div className={style.menu}>
            <ul className={style.list}>
                {menuData.map((pizza) => (
                    <li key={pizza.id} className={style.menuitem}>
                        <div className={style.menu_description}>
                            <img className={style.catimg} src={pizza.image[0]} />
                            <div className={style.review}>
                                <h2 className={style.h2}>Отзывы:</h2>
                                <p className={style.p1}>{pizza.author}</p>
                                <p className={style.p1}>{pizza.text}</p>
                                <p className={style.p1}>{pizza.rating}</p>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Reviews;