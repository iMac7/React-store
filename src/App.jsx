import styles from './Styles/App.module.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import Categories from './Pages/Categories';
import Description from './Pages/Description';
import Cart from './Pages/Cart';
import {ApolloProvider, InMemoryCache, ApolloClient} from '@apollo/client'
import { Query } from '@apollo/client/react/components';
import {Route, Switch, Redirect} from 'react-router-dom'
import {get_names} from './Graphql/Queries'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})


class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      name: localStorage.getItem('selected') || undefined,  //name of selected category
      currency: undefined,
      cart: (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).cart) || [],
      cartIsOpen: false,
    }
  }

    componentDidMount(){
      if(localStorage.getItem('url')) return <Redirect to={localStorage.getItem('url')} />
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
          //converted to JSON string to be able to compare objects
          if(JSON.stringify(item.attributes) === JSON.stringify(element.attributes)) { present = true }
        }
        return element
      })

      if(present) return this.setState((currentState) => {return {cart: newcart}})
      if(!present) return this.setState((currentState) => {
        return {cart: [...newcart, item]}},
       () => localStorage.setItem("cart", JSON.stringify({cart: this.state.cart}))
      )
    }

    toggleCart(){
      return this.setState((currentState) => {return {cartIsOpen:!currentState.cartIsOpen}})
    }
    
    changeCount(attribute, index){
      if(attribute.count===0) {return this.setState((currentState) => {
        return{cart: currentState.cart.filter(element => element!==currentState.cart[index])}},
        () => {
          localStorage.setItem("cart", JSON.stringify({cart: this.state.cart}))
          console.log(this.state)
        })
      }
      else{
        const newcart = this.state.cart.map(item => {
          if(item=== this.state.cart[index]) item = {...item,...attribute}
          return item
        })
        return this.setState((currentState) => {return {cart: newcart}}, 
        () => localStorage.setItem("cart", JSON.stringify({cart: this.state.cart}))
        )
      }
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
            changeCount={this.changeCount.bind(this)}
            />

            <Switch>
              <Route exact path="/">
                <Redirect to={`/${this.state.name || data.categories[0].name}`} />
              </Route>
              
              <Route exact path='/cart'><Cart 
              cart={this.state.cart}
              selectedCurrency={this.state.currency || data.currencies[0].symbol}
              changeCount={this.changeCount.bind(this)}
              /></Route>

              <Route exact path={`/:home`} 
              render={(props) => <Categories
              {...props}
              selected={this.state.name || data.categories[0].name}
               currency={this.state.currency || data.currencies[0].symbol}
               cart={this.state.cart}
               addtocart={this.addtocart.bind(this)} />} 
               /> {/* different route syntax to extract route params */}

              <Route exact path='/:home/:id/description' 
              render={(props) => <Description 
              {...props} 
              addtocart={this.addtocart.bind(this)}
              selectedCurrency={this.state.currency || data.currencies[0].symbol} /> }
              />

            </Switch>

            </div>)
        }}
        </Query>

      </ApolloProvider>
      )
  }
}

export default App