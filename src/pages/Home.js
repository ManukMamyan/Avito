import React, {Component} from 'react'

import { AdContext } from '../context';
import Title from '../components/Title'
import Loading from '../components/Loading';
import Filter from '../components/Filter';
import Ad from '../components/Ad';

export default class Home extends Component {
  static contextType = AdContext;

  render() {
    let { sortedAds, sellers, loading, addToFeatured } = this.context;
    let elem;
    if (sortedAds.length === 0) {
      elem =
        (
          <div className='empty-search'>
            <h3>К сожалению вашим параметрам поиска не соответствует ни одно объявление</h3>
          </div>
        )
    } else {
      elem = sortedAds.map((product) => {
        return <Ad
          key={product.id}
          id={product.id}
          product={product}
          sellers={sellers}
          handleClick={addToFeatured}
          disabled={false}
        />
      });
    }

    return (
      <>
        <Filter />
        <section className='featured-rooms'>
          <Title title='Рекомендации для вас'/>
          <div className='featured-rooms-center'>
            {loading ? <Loading/> : elem}
          </div>
        </section>
      </>
    )
  }
}