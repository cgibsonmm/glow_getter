import React, { Component } from 'react'
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
            <div key={product.id}>
                <img src={product.img} width='200px' height='200px' alt="product" /> <br />
                <h4>{product.name}</h4> <br/>
                <h5>{product.price}</h5> <br />
                <button name={product.id} onClick={this.props.handleCart}>Remove from Cart</button>
            </div>
        ))
        return (
          <div className="Shop">
            { products.length > 0 ?
              <div> {products} </div> :
              <div>You're cart is empty!</div>
            }
          </div>
        )
    }
}

export default Cart