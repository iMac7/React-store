import React, { Component } from 'react'
import styles from '../Styles/CartComponent.module.css'

export default class CartComponent extends Component {

  constructor(){
    super()

    this.state = {
      gallery: {}, //{key1: index, key2: index, key3: index... }
    }
  }


  changeimg(obj, key){
    if(obj[key] < 0) return //can't go less than first img
    else return this.setState((current) => {return {gallery: {...current.gallery, [key]: obj[key]}}})
  }


  render() {
    return (
      <div className={styles.outer}>
        {console.log(this.state)}

      { 
        this.props.cart.map((item, index) => ( item &&
          <div 
          key={index} 
          className={`${styles.container} ${this.props.type==="cart" && styles.cartContainer}`}>
            <form className={styles.form} action="">
              {
                this.props.type==="cart" && 
                <>
                <h3>{item.brand}</h3>
                <h4>{item.name}</h4>
                </>
              }
              {
                this.props.type!=="cart" && 
                <>
                <p>{item.brand}</p>
                <p>{item.name}</p>
                </>
              }
                
                {item.allAttributes.map(attribute => {
                    
                    return(
                    <React.Fragment key={attribute.id}>
                    
                    {attribute.type==="swatch" && (
                    <fieldset className={styles.fieldset2}>
                      <p>{attribute.name.toUpperCase()}</p>

                      {attribute.items.map(element => {
                          return(
                          <button key={element.displayValue}
                            className={`${styles.color} ${item.attributes[attribute.id] === element.displayValue && styles.activeColor}`}
                            style={{backgroundColor: element.value}}
                            onClick={(e) => e.preventDefault()}
                          ></button>)
                        })}

                    </fieldset>
                    )}

                    {attribute.type!=="swatch" && (
                    <fieldset className={styles.fieldset1}>

                      <p>{attribute.name.toUpperCase()}</p>

                      {attribute.items.map(element => {
                        return(
                        <button key={element.displayValue}
                          className={`${styles.size} ${item.attributes[attribute.id] === element.displayValue && styles.activeSize}`}
                          onClick={(e) => e.preventDefault()}
                        >{element.displayValue}</button>)
                        })}
                    </fieldset>
                    )}
                    </React.Fragment>)
                  })}
                

                {item.prices.map(price => (
                    price.currency.symbol === this.props.selectedCurrency && (
                    <h3 key={price.currency.symbol}>{price.currency.symbol}&nbsp;{price.amount}</h3>
                  )))}

            </form>
              
            <div className={styles.right}>
              <div className={styles.counter}>
                <button className={styles.button}
                onClick={() => this.props.changeCount({count: item.count +1},index)}
                >+</button>

                <div className={styles.count}>{item.count}</div>
                
                <button className={styles.button}
                onClick={() => this.props.changeCount({count: item.count -1},index)}
                disabled={item.count===0}
                >-</button>
              </div>
              
              <img className={styles.cartimg} src={item.gallery[this.state.gallery[index] || 0]} alt="" />

              {
              item.gallery.length>1 && this.props.type==="cart" &&
              <div id={styles.buttons}>
                  <svg 
                  onClick={() => {
                    //if true, this is the first image
                    if(this.state.gallery[index] ===0 || undefined) return 
                    else this.changeimg({[index]: (this.state.gallery[index] || 0) -1}, index)
                  }}
                  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="black" fillOpacity="0.73"/>
                  <path d="M14.25 6.06857L8.625 11.6876L14.25 17.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  <svg 
                  onClick={() => {
                    //if true, this is the last image
                    if((this.state.gallery[index] ===(item.gallery.length-1)) || item.gallery.length===1) return
                    else this.changeimg({[index]: (this.state.gallery[index] || 0) +1}, index)
                  }}
                  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" transform="matrix(-1 0 0 1 24 0)" fill="black" fillOpacity="0.73"/>
                  <path d="M9.75 6.06808L15.375 11.6871L9.75 17.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </div>
              }
            </div>


          </div>
        ))
      }
      </div>
    )
  }
}