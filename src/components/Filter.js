import React from 'react';
import { useContext } from 'react';
import { AdContext } from '../context';

import Title from '../components/Title';

//get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const categoryes = {
  all: 'Все',
  auto: 'Авто',
  laptops: 'Ноутбуки',
  cameras: 'Фотоаппараты',
  immovable: 'Недвижимость'
};

const Filter = props => {
  const context = useContext(AdContext);

  const { products, type, minPrice, maxPrice, sorting, handleChange } = context;

  //get unique types
  let types = getUnique(products, 'category');

  //add type all
  types = ['all', ...types];
  //map to JSX
  types = types.map((item, index) => {
    return (
      <option key={index} value={item}>
        {categoryes[item]}
      </option>
    );
  });

  return (
    <section className='filter-container'>
      <Title title='Поиск по объявлениям' />
      <form className='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>Категория</label>
          <select
            name='type'
            id='type'
            value={type}
            className='form-control'
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/*end of select type */}
        {/* select price */}
        <div className='form-group'>
          <label htmlFor='size'>Выбрать цену</label>
          <div className='size-inputs'>
            <input
              className='size-input'
              type='number'
              name='minPrice'
              id='size'
              value={minPrice}
              onChange={handleChange}
            />
            <input
              className='size-input'
              type='number'
              name='maxPrice'
              id='size'
              value={maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end of select price */}
        {/* sort */}
        <div className='form-group'>
          <label htmlFor='sorting'>Сортировать</label>
          <select
            name='sorting'
            id='sorting'
            value={sorting}
            className='form-control'
            onChange={handleChange}
          >
            <option value='all'>Все</option>
            <option value='priceAsc'>Сортировать по цене</option>
            <option value='ratingAsc'>Сортировать рейтингу продавца</option>
          </select>
        </div>
        {/*end of sort */}
      </form>
    </section>
  );
};

export default Filter;
