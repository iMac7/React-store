import React, { Component } from 'react'
import CartComponent from '../Components/CartComponent'
import styles from '../Styles/Cart.module.css'

export default class Cart extends Component {

  constructor(props){
    super(props)

    this.state = {     
      amount: Number(   //used because the code below returns a string
      this.props.cart.map(element => {       //map produces a new array
        let filtered = element.prices.filter(price => price.currency.symbol===this.props.selectedCurrency) 
        //get the active currency, array with only one element expected
        return element.price = filtered[0].amount* element.count //first(and only) element * no. of items
        })
        .reduce((prev, current) => prev+ current, 0) //add all the values in the array from map to produce a value
        .toFixed(2)
      ),
      // cart: this.props.cart,
    }
  }

    componentDidUpdate(prevprops){
      if(prevprops!== this.props){
        this.setState({amount: Number(  
        this.props.cart.map(element => {
          let filtered = element.prices.filter(price => price.currency.symbol===this.props.selectedCurrency) 
          return element.price = filtered[0].amount* element.count
          })
          .reduce((prev, current) => prev+ current, 0)
          .toFixed(2)
        ) })
    }}


  render() {

    return (
      <div className={styles.cart}>
        <h1>CART</h1>

        <CartComponent cart={this.props.cart}
        selectedCurrency={this.props.selectedCurrency}
        changeAttribute={this.props.changeAttribute} />

        {/* {console.log("cart in props",this.props.cart)}
        {console.log("cart in state",this.state.cart)} */}


        {/* { console.log(
          this.props.cart.map(element => {
            let filtered = element.prices.filter(price => price.currency.symbol===this.props.selectedCurrency)
            return element.price = filtered[0].amount* element.count
          })
          .reduce((prev, current) => prev+ current, 0)
        )} */}

        <table>
          <tbody>
              <tr>
                  <td>Tax 21%</td>
                  <td><h3>{this.props.selectedCurrency}&nbsp;{(0.21*this.state.amount).toFixed(2)}</h3></td>
              </tr>
              <tr>
                  <td>Quantity</td>
                  <td><h3>
                    {this.props.cart.reduce((previous, current) => previous + current.count, 0)}
                    {/* looped through cart object, adding the value of the count property to return one total value */}
                  </h3></td>
              </tr>
              <tr>
                  <td>Total</td>
                  <td><h3>{this.props.selectedCurrency}&nbsp;{(this.state.amount + (0.21*this.state.amount)).toFixed(2)}</h3></td>
              </tr>
          </tbody>
        </table>
        
        <button className={styles.order}>ORDER</button>

      </div>
    )
  }
}
