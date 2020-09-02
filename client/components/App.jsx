import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import IntroPriceAndRating from './IntroPriceAndRating.jsx';
import MainBookingAndPricing from './MainBookingAndPricing.jsx';
import '../assets/bootstrap.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      listing: {},
    };
  }

  componentDidMount() {
    const path = window.location.pathname;
    this.fetchListingInfo(path);
  }

  fetchListingInfo(path) {
    axios.get(`/api/booking${path}`)
      .then(({ data }) => {
        this.setState({
          listing: data.listing[0],
        });
      })
      .catch((err) => {
        console.error(`Error retrieving listing data from server: ${err}`);
      });
  }

  render() {
    const MainApp = styled.div`
      width: 368px;
      height: auto;
      padding: 24px;
      border: 1px solid rgb(221, 221, 221);
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
      font-family: 'Circular Air Book', 'Circular Std Book', 'Roboto', sans-serif;
    `;

    const { listing } = this.state;

    return (
      <MainApp>
        <IntroPriceAndRating listing={listing} />
        <MainBookingAndPricing listing={listing} />
      </MainApp>
    );
  }
}

export default App;
