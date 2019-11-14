import React from 'react'

import { css } from 'glamor'
import { graphql } from 'react-apollo'

import { DeleteRecipe } from './index'
import ListRecipes from './queries/ListRecipes'
import NewRecipeSubscription from './subscriptions/NewRecipeSubscription'
import DeleteRecipeSubscription from './subscriptions/DeleteRecipeSubscription'

class RecipesList extends React.Component {
  componentWillMount() {
    this.props.subscribeToNewRecipes()
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <h1>Recipes</h1>
        {this.props.recipes.map((r, i) => (
          <div {...css(styles.recipe)} key={i}>
            <p {...css(styles.title)}>Recipe name: {r.name}</p>
            <DeleteRecipe id={r.id}/>
            <div>
              <p {...css(styles.title)}>Ingredients</p>
              {r.ingredients.map((ingredient, i2) => (
                <p key={i2} {...css(styles.subtitle)}>
                  {ingredient}
                </p>
              ))}
            </div>
            <div>
              <p {...css(styles.title)}>Instructions</p>
              {r.instructions.map((instruction, i3) => (
                <p key={i3} {...css(styles.subtitle)}>
                  {i3 + 1}. {instruction}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const styles = {
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)'
  },
  recipe: {
    boxShadow: '2px 2px 5px rgba(0, 0, 0, .2)',
    marginBottom: 7,
    padding: 14,
    border: '1px solid #ededed'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: 'left'
  }
}

export const Recipes = graphql(ListRecipes, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
    subscribeToNewRecipes: params => {
      props.data.subscribeToMore({
        document: NewRecipeSubscription,
        updateQuery: (prev, { subscriptionData: { data: { onCreateRecipe } } }) => {
          return {
            ...prev,
            listRecipes: {
              __typename: 'RecipeConnection',
              items: [onCreateRecipe, ...prev.listRecipes.items.filter(recipe => recipe.id !== onCreateRecipe.id)]
            }
          }
        }
      })
    },
    subscribeToDeleteRecipe: params => {
      props.data.subscribeToMore({
        document: DeleteRecipeSubscription,
        updateQuery: (prev, { subscriptionData: { data: { onDeleteRecipe } } }) => {
          return {
            prev,
            listRecipes: {
              __typename: 'RecipeConnection',
              items: [...prev.listRecipes.filter(recipe => recipe.id !== onDeleteRecipe.id)]
            }
          }
        }
      })
    }
  })
})(RecipesList)
