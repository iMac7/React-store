import React, { Component } from 'react'
import styles from '../Styles/Product.module.css'
import styles1 from '../Styles/CartComponent.module.css'

export default class CartComponent extends Component {

  constructor(){
    super()

    this.state = {
      gallery: {}, //{id1: index, id2: index, id3: index... }
    }
  }

  changeimg(obj, id){
    if(obj.index <0) return
    else return this.setState((current) => {return {gallery: {...current.gallery, [id]: obj.index}}})
  }


  render() {
    return (
      <div className={styles.container}>

      { 
        this.props.cart.map(item => ( item &&
          <div className={styles1.container} key={item.name}>
            <form className={styles1.form} action="">
                <h2>{item.name}</h2>
                <h3>{item.brand}</h3>

                {item.allAttributes.map(attribute => {
                    
                    return(
                    <React.Fragment key={attribute.id}>
                    
                    {attribute.type==="swatch" && (
                    <fieldset className={styles.fieldset2}>
                      <legend>{attribute.name.toUpperCase()}</legend>

                      {attribute.items.map(element => {
                          return(
                          <button key={element.displayValue}
                            className={`${styles.color} ${item.attributes[attribute.id] === element.displayValue && styles.activeColor}`}
                            style={{backgroundColor: element.value}} 
                            onClick={(e) => {
                            e.preventDefault()
                            this.props.changeAttribute({[attribute.name]: element.displayValue}, item.id)
                            }}
                          ></button>)
                        })}

                    </fieldset>
                    )}

                    {attribute.type!=="swatch" && (
                    <fieldset className={styles.fieldset1}>

                    <legend>{attribute.name.toUpperCase()}</legend>

                    {attribute.items.map(element => {
                      return(
                      <button key={element.displayValue}
                        className={`${styles.size} ${item.attributes[attribute.id] === element.displayValue && styles.activeSize}`}
                        onClick={(e) => {
                        e.preventDefault()
                        this.props.changeAttribute({[attribute.name]: element.displayValue}, item.id)
                        }}
                      >{element.displayValue}</button>)
                      })}
                    </fieldset>
                    )}
                    </React.Fragment>)
                  })}
                

                {item.prices.map(price => (
                    price.currency.symbol === this.props.selectedCurrency && (
                    <h2 key={price.currency.symbol}>{price.currency.symbol}&nbsp;{price.amount}</h2>
                  )))}

            </form>
              
            <div className={styles1.right}>
              <div className={styles1.counter}>
                <button className={styles1.button}
                onClick={() => this.props.changeAttribute({count: item.count +1},item.id)}
                >+</button>

                <div className={styles1.count}>{item.count}</div>
                
                <button className={styles1.button}
                onClick={() => this.props.changeAttribute({count: item.count -1},item.id)}
                disabled={item.count===0}
                >-</button>
              </div>
              
              <img className={styles1.cartimg} src={item.gallery[this.state.gallery[item.id] || 0]} alt="" />

              <div id={styles1.buttons}>
                  <svg 
                  onClick={() => {
                    if(this.state.index ===0) return
                    else this.changeimg({index: (this.state.gallery[item.id] || 0) -1}, item.id)
                  }}
                  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="black" fillOpacity="0.73"/>
                  <path d="M14.25 6.06857L8.625 11.6876L14.25 17.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  <svg 
                  onClick={() => {
                    if(this.state.gallery[item.id] ===item.gallery.length-1) return
                    else this.changeimg({index: (this.state.gallery[item.id] || 0) +1}, item.id)
                  }}
                  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" transform="matrix(-1 0 0 1 24 0)" fill="black" fillOpacity="0.73"/>
                  <path d="M9.75 6.06808L15.375 11.6871L9.75 17.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </div>
            </div>

          </div>
        ))
      }
      </div>
    )
  }
}