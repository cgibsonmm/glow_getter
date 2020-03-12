import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { viewCart } from '../../apiConfig'

class Cart extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        products: []
      }
    }

    async componentDidMount() {
        try {
          const response = await viewCart()
          this.setState({ products: response })
          console.log(response)

        } catch (error) {
          console.log(error)
        }
    } 

    render() {
        const products = this.state.products.map(product => (
          <div className="Product-Card" key={product.id}>
            <div className="Product-Image">
                <div className="Product-Front"><img src={product.img} width='200px' height='200px' alt="product" /></div>
                <div className="Product-Back"><img src="https://i.imgur.com/xG0rVGt.jpg" width='200px' height='200px' alt="product" /></div>
            </div>
                
            <h3 className="Product-Name">{product.name}</h3>
            <h4 className="Product-Price">${product.price}</h4>
            <button className="Remove-Button" name={product.id} onClick={this.props.handleCart}>REMOVE FROM CART</button>
            
          </div>
        ))
        return (
          <div className="Cart">
            <div className="Cart-Instructions">
              <h1>Ready to checkout?</h1>
              <ul>
                <li><b>Step One:</b> Review your cart and adjust items as necessary</li>
                <li><b>Step Two:</b> Proceed to checkout</li>
                <li><b>Step Three:</b> Provide billing and shipping info</li>
                <li><b>Step Four:</b> Place order</li>
                <li><b>Step Five:</b> Delivery!</li>
              </ul>
              <img src="https://i.imgur.com/beGText.jpg" width='550px' height='350px' alt="girls" /> <br />
              <p className="Social-Media">#glowgetters via Instagram</p>
            </div>
            <div className="Cart-Box">
              { products.length > 0 ?
                <div className="Cart-Products"> {products} </div> :
                <div className="Cart-Empty">
                  <h1>You're cart is empty!</h1>
                  <Link to="/shop">
                    <button className="Shop-Button">get shopping</button>
                  </Link>
                </div>
              }
            </div>
          </div>
        )
    }
}

export default Cart