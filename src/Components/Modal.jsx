import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CartComponent from './CartComponent'
import styles from '../Styles/Modal.module.css'

export default class Modal extends Component {
  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.cart}>
          <div className={styles.head}>
            <h3>My Bag</h3>
            <h4>{this.props.cart.length}&nbsp;items</h4>
          </div>

          <CartComponent cart={this.props.cart}
          selectedCurrency={this.props.selectedCurrency}
          changeItemCount={this.props.changeItemCount}
          changeAttribute={this.props.changeAttribute}/>

          <div className={styles.buttons}>
            <Link to="/cart" className={styles.bagbtn} onClick={() => this.props.toggleCart()}>VIEW BAG</Link>
            <button className={styles.cartbtn}>CHECK OUT</button>
          </div>

        </div>
      </div>
    )
  }
}
