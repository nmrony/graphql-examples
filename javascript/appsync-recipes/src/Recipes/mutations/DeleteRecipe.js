import gql from 'graphql-tag'

export default gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(input: { id: $id }) {
      id
      name
      instructions
      ingredients
    }
  }
`
