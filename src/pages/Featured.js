import React, {Component} from 'react'

import {AdContext} from '../context';
import Ad from '../components/Ad';
import Title from '../components/Title'
import Loading from '../components/Loading';

export default class Featured extends Component {
  static contextType = AdContext;

  render() {
    const {loading, sellers, addToFeatured} = this.context;

    let userFeaturedAds = localStorage.getItem('featured');
    userFeaturedAds = JSON.parse(userFeaturedAds);
    let elem;
    if (!userFeaturedAds) {
      elem =
        (
          <div className='empty-search'>
            <h3>У вас нет избранных объявлений</h3>
          </div>
        )
    }else
      {
        elem = userFeaturedAds.map((product) => {
          return <Ad
            key={product.id}
            id={product.id}
            product={product}
            sellers={sellers}
            handleClick={addToFeatured}
            disabled={true}
          />
        });
      }

      return (
        <>
          <section className='featured-rooms'>
            <Title title='Избранные объявления'/>
            <div className='featured-rooms-center'>
              {loading ? <Loading/> : elem}
            </div>
          </section>
        </>
      )
    }
  }