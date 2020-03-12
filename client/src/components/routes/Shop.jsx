import React, { Component } from 'react'
import { viewProducts } from '../../apiConfig'

class Shop extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        products: []
      }
    }

    async componentDidMount() {
        try {
          const response = await viewProducts()
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
            
              {this.props.currentUser ?
                
                <button className="Add-Button" name={product.id} onClick={this.props.handleCart}>ADD TO CART</button> :
                <button className="Add-Button" onClick={this.props.handleRedirect}>ADD TO CART</button>
              }
          </div>
        ))
        
        return (
          <div className="Shop-Products">
              {products}
          </div>
        )
    }
}

export default Shop