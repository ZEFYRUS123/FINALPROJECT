// Catalog.tsx
import React from 'react';
import style from './App2.module.css';
import { Route, Link } from 'react-router-dom';
import menuData from '../menu.json';
function Catalog() {
    return (
        <div className={style.menu}>
            <ul className={style.list}>
                {menuData.map((pizza) => (
                    <li key={pizza.id} className={style.menuitem}>
                        <div className={style.menu_description}>
                            <Link to={`/catalog/${pizza.id}`}>
                                <img className={style.catimg} src={pizza.images[0]} alt={pizza.name} />
                                <h1 className={style.h1}>{pizza.name}</h1>
                            </Link>
                            <p className={style.op}>{pizza.description}</p>
                            <h2 className={style.text}>Цена: ${pizza.price}</h2>
                        <button className={`btn btn-primary ${style.addToCartButton}`}
                            // onClick={() => {
                            //     addToCart(
                            //         {
                            //             id: pizza.id,
                            //             image: pizza.images[0],
                            //             name: pizza.name,
                            //             price: pizza.price,
                            //         },
                            
                            //     );
                            // }}
                        >В корзину</button>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}
            export default Catalog;
