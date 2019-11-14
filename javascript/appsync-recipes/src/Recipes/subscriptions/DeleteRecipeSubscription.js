import gql from 'graphql-tag'

export default gql`
  subscription DeleteRecipeSub {
    onDeleteRecipe {
      id
    }
  }
`