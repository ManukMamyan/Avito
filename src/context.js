import React, {Component} from 'react';
import axios from 'axios';

const AdContext = React.createContext();

class AdProvider extends Component {
  state = {
    products: [],
    sellers: [],
    sortedAds: [],
    featuredAds: [],
    type: 'all',
    sorting: 'all',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    loading: true
  };

  componentDidMount = () => {
    axios.get('http://avito.dump.academy/products')
      .then(result => {
        let withPrices = result.data.data.filter(item => !isNaN(item.price));
        let maxPrice = Math.max(...withPrices.map(item => item.price));
        this.setState({products: result.data.data, sortedAds: result.data.data, price: maxPrice, maxPrice});
      })
      .catch(err => console.log(err));
    axios.get('http://avito.dump.academy/sellers')
      .then(result => {
        this.setState({sellers: result.data.data, loading: false});
      })
      .catch(err => console.log(err))
  };


  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterAds
    );
  };

  filterAds = () => {
    let {
      products,
      sellers,
      type,
      sorting,
      minPrice,
      maxPrice
    } = this.state;

    // all products
    let tempAds = [...products];

    //filter by type
    if (type !== 'all') {
      tempAds = tempAds.filter(product => product.category === type);
    }

    //sort
    if (sorting !== 'all') {
      if (sorting === 'priceAsc') {
        tempAds = tempAds.sort(this.sortByPriceAsc)
      } else if (sorting === 'ratingAsc') {
        tempAds = tempAds.map(ad => {
          let sellerId = parseInt(ad.relationships.seller);
          let sellerRating = sellers[sellerId].rating;
          return {...ad, sellerRating}
        });
        tempAds.sort(this.sortByRatingAsc);
      }
    }

    //filter by price
    tempAds = tempAds.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );


    //change state
    this.setState({sortedAds: tempAds});
  };

  sortByPriceAsc = (a, b) => {
    return a.price - b.price
  };

  sortByRatingAsc = (a, b) => {
    return b.sellerRating - a.sellerRating
  };

  addToFeatured = (id) => {
    let {featuredAds} = this.state;
    let ad = this.state.sortedAds.filter(ad => ad.id === id)[0];
    featuredAds.push(ad);
    this.setState({featuredAds});
    localStorage.setItem('featured', JSON.stringify(this.state.featuredAds));
  };

  render() {
    return (
      <AdContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          addToFeatured: this.addToFeatured
        }}
      >
        {this.props.children}
      </AdContext.Provider>
    );
  }
}

const AdConsumer = AdContext.Consumer;

export {AdProvider, AdConsumer, AdContext};
