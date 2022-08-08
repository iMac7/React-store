import { gql } from "@apollo/client"

//App
export const get_names = gql`
  query getNames{
    categories{
      name
    },
    currencies{
      label, symbol
    }
  }    
`

//Categories
export const get_products = gql`
query getProducts($title: String!){
  category(input: {title: $title}){
    name,
    products{
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      prices{
        currency{
          label,
          symbol
        },
        amount
      },
      brand
    }
  }
}    
`

//Description
export const get_description = gql`
query getDescription($id: String!){
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

//Description, for fetch api
export const fetch_description = `
query fetchDescription($id: String!){
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