import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CartComponent from './CartComponent'
import styles from '../Styles/Modal.module.css'

export default class Modal extends Component {

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
      <div className={styles.modal}
      onClick={(e) => {
        this.props.toggleCart()
      }}
      >
        <div className={styles.cart}
        onClick={e => e.stopPropagation()}>
          <div className={styles.head}>
            <h4>My Bag,&nbsp;</h4>
            <p>{this.props.cart.length}&nbsp;items</p>
          </div>

          <CartComponent 
          cart={this.props.cart}
          type="modal"
          selectedCurrency={this.props.selectedCurrency}
          changeCount={this.props.changeCount}/>

          <div className={styles.total}>
            <h3>Total</h3>
            <h3>{this.props.selectedCurrency}&nbsp;{this.state.amount}</h3>
          </div>


          <div className={styles.buttons}>
            <Link to="/cart" className={styles.bagbtn} onClick={() => this.props.toggleCart()}>VIEW BAG</Link>
            <button className={styles.cartbtn}>CHECK OUT</button>
          </div>

        </div>
      </div>)
  }
}
