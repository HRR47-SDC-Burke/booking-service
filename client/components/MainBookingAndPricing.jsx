import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ServiceFeeDropdown from './ServiceFeeDropdown.jsx';
import DiscountDropdown from './DiscountDropdown.jsx';
import PricePerNightDropdown from './PricePerNightDropdown.jsx';
import GuestsDropdown from './GuestsDropdown.jsx';

class MainBookingAndPricing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkIn: 'Add date',
      checkOut: 'Add date',
    };

    this.handleInputDateChange = this.handleInputDateChange.bind(this);
    this.handleOnClickDate = this.handleOnClickDate.bind(this);
  }

  getDaysBetweenDates() {
    const { checkIn, checkOut } = this.state;
    const firstDay = new Date(checkIn);
    const secondDay = new Date(checkOut);
    const timeDifference = secondDay.getTime() - firstDay.getTime();
    return timeDifference / (1000 * 3600 * 24);
  }

  handleOnClickDate(e) {
    if (e.target.className.split(' ').indexOf('checkInClick') !== -1) {
      this.setState({
        checkIn: null,
      });
    } else if (e.target.className.split(' ').indexOf('checkOutClick') !== -1) {
      this.setState({
        checkOut: null,
      });
    }
  }

  handleInputDateChange(e) {
    if (e.target.className.split(' ').indexOf('checkInInput') !== -1) {
      this.setState({
        checkIn: e.target.value,
      });
    } else if (e.target.className.split(' ').indexOf('checkOutInput') !== -1) {
      this.setState({
        checkOut: e.target.value,
      });
    }
  }

  render() {
    const { listing } = this.props;
    const {
      checkIn,
      checkOut,
    } = this.state;

    const numDays = (checkIn && checkOut)
      ? this.getDaysBetweenDates()
      : 0;

    const totalBeforeDiscounts = (numDays)
      ? listing.pricePerNight * numDays
      : 0;

    const discountAmountForNights = (listing.discountAmount)
      ? Math.round(totalBeforeDiscounts * (listing.discountAmount / 100))
      : 0;

    const serviceFee = (numDays)
      ? Math.round(totalBeforeDiscounts * 0.11)
      : 0;

    const grandTotal = (numDays)
      ? totalBeforeDiscounts - discountAmountForNights + serviceFee
      : 0;

    const formatDate = (d) => {
      if (d === 'Add date') {
        return d;
      }

      const date = new Date(d);
      // always gives zero padded number
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const day = (`0${date.getDate() + 1}`).slice(-2);
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const BookingGrid = styled.div`
      display: grid;
      width: auto;
      height: auto;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      margin-top: 20px;
      border: 1px solid rgba(113, 113, 113, 0.7);
      border-radius: 10px;
    `;

    const GridItemText = styled.p`
      margin-block-start: 0;
      margin-block-end: 0;
      padding: 11px 11px 0 11px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
    `;

    const CheckInGridItem = styled.div`
      grid-column: 1;
      grid-row: 1;
      height: 100%;
    `;

    const CheckInDateSubText = styled(GridItemText)`
      color: ${(checkIn === 'Add date') ? 'rgb(113, 113, 113)' : 'rgb(34, 34, 34)'};
      padding-top: 4px;
      font-size: 16px;
      line-height: 18px;
      font-weight: 300;
      letter-spacing: 0;
    `;

    const CheckOutDateSubText = styled(CheckInDateSubText)`
      color: ${(checkOut === 'Add date') ? 'rgb(113, 113, 113)' : 'rgb(34, 34, 34)'};
    `;

    const CheckInputDatePicker = styled.input.attrs({
      type: 'date',
    })`
      color: rgb(34, 34, 34);
      width: 90%;
      height: 80%;
      font-size: 12px;
      border: none;
    `;

    const CheckInputOnClickHandler = styled.p``; // using this to attach click handler

    const CheckOutGridItem = styled.div`
      grid-column: 2;
      grid-row: 1;
      border-left: 1px solid rgba(113, 113, 113, 0.7);
      height: 100%;
    `;

    const GuestsGridItem = styled.div`
      grid-column: 1 / 3;
      grid-row: 2;
      border-top: 1px solid rgba(113, 113, 113, 0.7);
      height: 100%;
    `;

    const Button = styled.button`
      color: white;
      background-color: rgb(227, 28, 95);
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      width: 100%;
      height: 52px;
      margin-top: 15px;
    `;

    const WontBeCharged = styled.p`
      display: block;
      font-size: 14px;
      text-align: center;
      margin: 12px 0;
    `;

    const PricingFlexContainer = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const PricingFlexItem = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `;

    const PricingTitleText = styled.p`
      font-size: 16px;
      text-decoration: underline;
      margin-block-start: 6px;
      margin-block-end: 6px;
    `;

    const PricingSubTotal = styled(PricingTitleText)`
      text-decoration: none;
    `;

    const PricingDiscountAmount = styled(PricingSubTotal)`
      color: rgb(0, 138, 5);
      font-weight: 600;
    `;

    const PricingGrandTotalFlexItem = styled(PricingFlexItem)`
      border-top: 1px solid rgb(221, 221, 221);
      padding-top: 18px;
      margin-top: 10px;
    `;

    const PricingGrandTotal = styled.p`
      font-size: 16px;
      font-weight: 600;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-top: 6px;
    `;

    return (
      <div>
        <BookingGrid>

          <CheckInGridItem>
            <GridItemText>
              CHECK-IN
            </GridItemText>
            <CheckInDateSubText>
              {(checkIn)
                ? (
                  <CheckInputOnClickHandler className="checkInClick" onClick={this.handleOnClickDate}>
                    {`${formatDate(checkIn)}`}
                  </CheckInputOnClickHandler>
                )
                : <CheckInputDatePicker className="checkInInput" onChange={this.handleInputDateChange} />}
            </CheckInDateSubText>
          </CheckInGridItem>

          <CheckOutGridItem>
            <GridItemText>
              CHECKOUT
            </GridItemText>
            <CheckOutDateSubText>
              {(checkOut)
                ? (
                  <CheckInputOnClickHandler className="checkOutClick" onClick={this.handleOnClickDate}>
                    {`${formatDate(checkOut)}`}
                  </CheckInputOnClickHandler>
                )
                : <CheckInputDatePicker className="checkOutInput" onChange={this.handleInputDateChange} />}
            </CheckOutDateSubText>
          </CheckOutGridItem>

          <GuestsGridItem>
            <GuestsDropdown />
          </GuestsGridItem>

        </BookingGrid>

        <Button>
          {(checkIn && checkOut && (numDays > 0)) ? 'Reserve' : 'Check Availability'}
        </Button>

        <WontBeCharged>
          {'You won\'t be charged yet'}
        </WontBeCharged>

        {(checkIn && checkOut && (numDays > 0))
          ? (
            <PricingFlexContainer>

              <PricingFlexItem>
                <PricingTitleText id="pricePerNight">
                  <PricePerNightDropdown
                    listing={listing}
                    numDays={numDays}
                  />
                </PricingTitleText>
                <PricingSubTotal>
                  {`$${(totalBeforeDiscounts).toLocaleString()}`}
                </PricingSubTotal>
              </PricingFlexItem>
              {(listing.discountAmount)
                ? (
                  <PricingFlexItem>
                    <PricingTitleText id="discount">
                      <DiscountDropdown listing={listing} />
                    </PricingTitleText>
                    <PricingDiscountAmount>
                      {`-$${discountAmountForNights.toLocaleString()}`}
                    </PricingDiscountAmount>
                  </PricingFlexItem>
                )
                : null}
              <PricingFlexItem>
                <PricingTitleText id="serviceFee">
                  <ServiceFeeDropdown />
                </PricingTitleText>
                <PricingSubTotal>
                  {`$${(serviceFee).toLocaleString()}`}
                </PricingSubTotal>
              </PricingFlexItem>

              <PricingGrandTotalFlexItem>
                <PricingGrandTotal>
                  Total
                </PricingGrandTotal>
                <PricingGrandTotal>
                  {`$${grandTotal.toLocaleString()}`}
                </PricingGrandTotal>
              </PricingGrandTotalFlexItem>

            </PricingFlexContainer>
          )
          : null}
      </div>
    );
  }
}

MainBookingAndPricing.propTypes = {
  listing: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MainBookingAndPricing;
