import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestsDropdown: false,
    };
  }

  render() {
    const { guestsDropdown } = this.state;
    return (
      <div>
        <h3>
          {`Guests: ${guestsDropdown}`}
        </h3>
      </div>
    );
  }
}

export default Guests;
