import React, { Component } from 'react'
import styles from '../Styles/Product.module.css'

export default class Product extends Component {

    
  constructor() {
    super();
    
    this.state = {
      id: '',
      name: '',
      brand: '',
      attributes: {},
      prices: undefined,
      gallery: undefined,
      allAttributes: undefined,
      count: 1,
    };

    }
  
    onChangeAttributes(attribute){
      this.setState((currentState) => {return {attributes: {...currentState.attributes, ...attribute}}})
    }

    setProduct(id, name, brand, prices, gallery, allAttributes){
      this.setState((currentState) => {return {id, name, brand, prices, gallery, allAttributes}}, 
      () => {this.props.addtocart(this.state)}) //callback needed to update just after state update
    }


  render() {
    return (
      <div className={styles.product}>
        {/* {console.log(this.props.product.attributes)} */}
        <form action="" className={styles.form}>
            <h2>{this.props.product.name}</h2>
            <h3>{this.props.product.brand}</h3>

            {
              this.props.product.attributes.map(attribute => {
                // console.log(attribute)
                
                return(
                <React.Fragment key={attribute.id}>
                
                {attribute.type==="swatch" && (
                <fieldset className={styles.fieldset2}>
                  <legend>{attribute.name.toUpperCase()}</legend>

                  {attribute.items.map(item => {
                      return(
                      <button key={item.displayValue}
                        className={`${styles.color} ${this.state.attributes[attribute.id] === item.displayValue && styles.activeColor}`} style={{backgroundColor:item.value}} onClick={(e) => {
                        e.preventDefault()
                        this.onChangeAttributes({[attribute.name]: item.displayValue})}}
                      ></button>)
                    })}

                </fieldset>
                )}

                {attribute.type!=="swatch" && (
                <fieldset className={styles.fieldset1}>

                <legend>{attribute.name.toUpperCase()}</legend>

                {attribute.items.map(item => {
                  return(
                  <button key={item.displayValue}
                    className={`${styles.size} ${this.state.attributes[attribute.id] === item.displayValue && styles.activeSize}`} onClick={(e) => {
                    e.preventDefault()
                    this.onChangeAttributes({[attribute.name]: item.displayValue})}}
                  >{item.displayValue}</button>)
                  })}
                </fieldset>
                )}
                </React.Fragment>)
              })
            }

            <h3>PRICE</h3>

            {
              this.props.product.prices.map(price => price.currency.symbol === this.props.selectedCurrency && (
                <h2 key={price.currency.symbol}>{price.currency.symbol}&nbsp;{price.amount}</h2>
              ))
            }

            <button className={styles.cartbtn} onClick={(e) => {
              e.preventDefault()
              this.props.product.attributes.length === Object.keys(this.state.attributes).length &&
              this.setProduct(
                this.props.id ,
                this.props.product.name,
                this.props.product.brand,
                this.props.product.prices,
                this.props.product.gallery,
                this.props.product.attributes)
            }}
            disabled={!this.props.product.inStock}
            >ADD TO CART</button>

            <div className={styles.html} dangerouslySetInnerHTML={{__html:this.props.product.description}}></div>

        </form>

      </div>
    )
  }
}
