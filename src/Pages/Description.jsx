import React, { Component } from 'react'
import Product from '../Components/Product'
import styles from '../Styles/Description.module.css'
import { get_description } from '../Graphql/Queries'
import { Query } from '@apollo/client/react/components';


export default class Description extends Component {

  constructor(){
    super()

    this.state = {
      selectedimg: undefined
    }
  }

  componentDidMount(){
    localStorage.setItem('url',window.location.pathname)
  }

  setImage(img){
    if(img=== this.state.selectedimg) return
    return this.setState((currentstate) => {return {selectedimg: img}})
  }

  render() {
    return (

      <Query query={get_description} 
      variables={{id: this.props.match.params.id}}
      >
      {({loading, data})=> {
        if(loading) return <h2>loading...</h2>
        
        return(
        <div className={styles.description}>
          <div className={styles.side}>
            {data.product.gallery.map(image => (
            <img key={image} src={image} className={styles.sideimg} alt="img" 
            onClick={() =>  this.setImage(image)}/>
            ))}
          </div>

          <img src={this.state.selectedimg || data.product.gallery[0]} className={styles.centerimg} alt="" />

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
