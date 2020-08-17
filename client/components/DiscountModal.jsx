import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

const DiscountModal = ({ rect, listing }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const PricingTitleText = styled.p`
    font-size: 16px;
    text-decoration: underline;
    margin-block-start: 0;
    margin-block-end: 0;
  `;

  return (
    <>
      <PricingTitleText variant="primary" onClick={handleShow}>
        {`${listing.discountAmount}% nightly discount`}
      </PricingTitleText>

      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        style={(rect)
          ? {
            opacity: 1,
            width: 'auto',
            height: '100%',
            top: rect.top + 30,
            left: rect.left - 308,
            'box-shadow': '0px 3px 5px rgba(0, 0, 0, 0.12)',
          }
          : { opacity: 1 }}
      >
        <Modal.Body>
          <p>
            {`${listing.ownerName}'`}
            s place has nightly
            <br />
            discounts available!
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

DiscountModal.propTypes = {
  // eslint-disable-next-line no-undef
  rect: PropTypes.instanceOf(Element).isRequired,
  listing: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DiscountModal;