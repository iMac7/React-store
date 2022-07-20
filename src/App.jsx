import styles from './Styles/App.module.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import Categories from './Pages/Categories';
import Description from './Pages/Description';
import Cart from './Pages/Cart';
import {ApolloProvider, InMemoryCache, ApolloClient, gql} from '@apollo/client'
import { Query } from '@apollo/client/react/components';
import {Route, Switch} from 'react-router-dom'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const get_names = gql`
  query getProduct{
    categories{
      name
    },
    currencies{
      label, symbol
    }
  }    
`


class App extends Component {

  constructor(){
    super()

    this.state = {
      name: undefined,  //name of selected category
      currency: undefined,
      cart: [],
      cartIsOpen: false
    }
  }

    changeCategory(name){
      if(name=== this.state.name) return
      return this.setState((currentState) => {return {name}})
    }

    changeCurrency(currency){
      if(currency=== this.state.currency) return
      return this.setState((currentState) => {return {currency}})
    }

    addtocart(item){
      if(!item.prices || !item.gallery) return
      
      let present = false
      const newcart = this.state.cart.map(element => {
        if(element.id === item.id){
          present = true
          // element.count += 1
        }
        return element
      })

      if(present) return this.setState((currentState) => {return {cart: newcart}})
      if(!present) return this.setState((currentState) => {return {cart: [...newcart, item]}})
    }

    toggleCart(){
      return this.setState((currentState) => {return {cartIsOpen:!currentState.cartIsOpen}})
    }
    
    changeAttribute(attribute, id){
      if(attribute.count===0) {return this.setState((currentState) => {
        return{cart: this.state.cart.filter(element => element.id!==id)}},() => console.log(this.state))
      }

      const newcart = this.state.cart.map(item => {
        if(Object.keys(attribute)[0]==="count" && id===item.id) item = {...item,...attribute}
          
        if(Object.keys(attribute)[0]!=="count" && id===item.id) item.attributes = {...item.attributes, ...attribute}

        return item
      })
      return this.setState((currentState) => {return {cart: newcart}})
    }
    

  render() {

    return (
      <ApolloProvider client={client}>

        <Query query={get_names}>
        {({loading, data})=> {
          if(loading) return <h2>loading...</h2>

          
          return (
            <div className={styles.app}>

            <Navbar 
            categories={data.categories}
            selected={this.state.name || data.categories[0].name} 
            changeCategory={this.changeCategory.bind(this)}
            cartIsOpen={this.state.cartIsOpen}
            cart={this.state.cart}
            toggleCart={this.toggleCart.bind(this)}
            currencies={data.currencies}
            selectedCurrency={this.state.currency || data.currencies[0].symbol}
            changeCurrency={this.changeCurrency.bind(this)}
            changeAttribute={this.changeAttribute.bind(this)}
            />

            <Switch>
              <Route exact path='/'><Categories selected={this.state.name || data.categories[0].name}
               currency={this.state.currency || data.currencies[0].symbol}
               cart={this.state.cart}
               /></Route>

              <Route exact path='/:id/description' 
              render={(props) => <Description {...props} addtocart={this.addtocart.bind(this)}
              selectedCurrency={this.state.currency || data.currencies[0].symbol} /> }
              /> {/* different route syntax to extract route params */}

              <Route exact path='/cart'><Cart 
              cart={this.state.cart}
              selectedCurrency={this.state.currency || data.currencies[0].symbol}
              changeAttribute={this.changeAttribute.bind(this)}
              /></Route>

            </Switch>

            </div>)
        }}
        </Query>

      </ApolloProvider>
      )
  }
}

export default App