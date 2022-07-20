import React, { Component } from 'react'
import Product from '../Components/Product'
import styles from '../Styles/Description.module.css'
import { gql } from '@apollo/client'
import { Query } from '@apollo/client/react/components';


export default class Description extends Component {

  render() {
    const get_description = gql`
    query getProduct($id: String!){
        product(id: $id){
          name,
          inStock,
          gallery,
          description,
          category,
          brand,
          prices{
            currency{
              label,
              symbol
            },
            amount
          },
          attributes{
          id,
          name,
          type,
          items{
            displayValue, 
            value,
            id
          }
        }
      }
    }    
  `


    return (

      <Query query={get_description} 
      variables={{id: this.props.match.params.id}}
      >
      {({loading, data})=> {
        if(loading) return <h2>loading...</h2>

        // console.log(data.product)

        
        return(
        <div className={styles.description}>
          <div className={styles.side}>
            {data.product.gallery.map(image => <img key={image} src={image} className={styles.sideimg} alt="img" />)}
          </div>

          <img src={data.product.gallery[0]} className={styles.centerimg} alt="" />

          <Product product={data.product} addtocart={this.props.addtocart}
          id={this.props.match.params.id}
          selectedCurrency={this.props.selectedCurrency}/>
        </div>
        )
        
      }}
      </Query>

    )
  }
}
