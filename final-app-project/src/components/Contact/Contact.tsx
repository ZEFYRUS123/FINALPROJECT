// Contact.tsx
import React from 'react';
import style from './Contact.module.css';
import { Route, Link } from 'react-router-dom';
import menuData from '../menu.json';
function Contact() {
    return (
        <div className={style.menu}>
            <h1 className={style.h1}>Добро пожаловать в контакты!</h1>
            {menuData.map((pizza) => (
                <div>
                    <img className={style.catimg} src={pizza.images[7]} />
                </div>
            ))}
            <div>
                <div className={style.div1}><h2 className={style.h1}>Написать нам:</h2>
                    <h1 className={style.h2}>dodopizza@gmail.com</h1></div>
                <div className={style.div1}><h2 className={style.h1}>Позвонить нам:</h2>
                    <h1 className={style.h2}>+7 949 475 38 48</h1></div>
                <div className={style.div1}><h2 className={style.h1}>Адрес:</h2>
                    <h1 className={style.h2}>проспект Дзержинского 126, Минск, Минская область 220025, Беларусь</h1></div>
            </div>
        </div>
    );
}
export default Contact;
