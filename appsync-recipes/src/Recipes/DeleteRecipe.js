// src/AddRecipe.js
import React from 'react'
import { css } from 'glamor'
import { graphql } from 'react-apollo'

import DeleteRecipes from './mutations/DeleteRecipe'
import ListRecipes from './queries/ListRecipes'

class DeleteRecipeComponent extends React.Component {
  deleteRecipe = () => {
    this.props.onDelete(this.props.id)
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <div {...css(styles.submitButton)} onClick={this.deleteRecipe}>
          <p>Delete</p>
        </div>
      </div>
    )
  }
}

export const DeleteRecipe = graphql(DeleteRecipes, {
  props: props => ({
    onDelete: id =>
      props.mutate({
        variables: {
          id
        },
        update: (proxy, { data: { deleteRecipe } }) => {
          const { listRecipes } = proxy.readQuery({ query: ListRecipes })
          const data = {
            listRecipes: {
              items: listRecipes.items.filter(item => item.id !== deleteRecipe.id)
            }
          }

          proxy.writeQuery({ query: ListRecipes, __typename: 'RecipeConnection', data })
        }
      })
  })
})(DeleteRecipeComponent)

const styles = {
  button: {
    border: 'none',
    background: 'rgba(0, 0, 0, .1)',
    width: 250,
    height: 50,
    cursor: 'pointer',
    margin: '15px 0px'
  },

  submitButton: {
    backgroundColor: '#00dd3b',
    padding: '8px 30px',
    opacity: 0.85,
    cursor: 'pointer',
    ':hover': {
      opacity: 1
    }
  }
}
