import React, { Component } from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AddRecipe, Recipes } from '../Recipes'
import { Nav } from '../Nav'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Recipes} />
              <Route path="/addrecipe" component={AddRecipe} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
