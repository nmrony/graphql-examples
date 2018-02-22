import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import logo from './logo.svg'
import Header from './../Header/Header'
import { LinkList, CreateLink } from './../Link'

export class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </div>
      </div>
    )
  }
}
