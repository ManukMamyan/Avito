import React from 'react';

import defaultImage from '../images/room-1.jpeg';

const Ad = ({ product, sellers, id, handleClick, disabled }) => {
  let { title, pictures, price, relationships } = product;
  if (price) {
    price = price.toLocaleString('ru');
  }
  const sellerId = parseInt(relationships.seller);
  let sellerInfo = sellers[sellerId];

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={pictures[0] || defaultImage} alt='ad' />
        <div className='price-top'>
          <h6>{pictures.length}</h6>
        </div>
        <button
          className='btn-primary room-link'
          onClick={() => handleClick(id)}
          disabled={disabled}
        >
          {disabled ? 'Подробнее' : 'Добавить в избранное'}
        </button>
      </div>
      <p className='room-info'>{title}</p>
      <p className='room-info'>Цена: {price} руб.</p>
      <p className='room-info'>Продавец: {sellerInfo.name}</p>
      <p className='room-info'>Рейтинг продавца: {sellerInfo.rating}</p>
    </article>
  );
};

export default Ad;
