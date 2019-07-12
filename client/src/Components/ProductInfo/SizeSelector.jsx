import React from 'react';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSize: ''
    }
  }

  // Takes in size (string) and stock (truthy/falsy value) parameters. Updates the state when this function
  // is called (happens when the child component is clicked) e.g. 'S - In Stock'
  handleSizeClick(size, stock) {
    let phrase = '';
    (stock) ? (phrase = ' - In Stock') : (phrase = ' - Buy From Online Dealer');
    this.setState({
      currentSize: size + phrase
    })
  }

  render() {
    return (
      <div>
        <div className="selectedSize">
          {this.state.currentSize}
        </div>
        <div className="sizeList">
          {this.props.sizes.map( (size, i) => {
            <SingleSize size={size.size} in_stock={size.in_stock} key={i}/>
          })}
        </div>
      </div>
    )
  }
}

export default SizeSelector;