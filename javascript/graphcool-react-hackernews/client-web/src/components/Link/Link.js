import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'

import { AUTH_TOKEN } from './../../constants'
import { timeDifferenceForDate } from './../../lib/utils'

class LinkComponent extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <div className="ml1 gray f11 pointer" onClick={() => this._voteForLink()}>
              ▲
            </div>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} <a href={this.props.link.url} target="_blank">({this.props.link.url})</a>
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }

  _voteForLink = async () => {
    try {
      const linkId = this.props.link.id
    await this.props.voteMutation({
      variables: {
        linkId
      },
      update: (store, { data: { vote } }) => {
        this.props.updateStoreAfterVote(store, vote, linkId)
      }
    })
    } catch (voteMutationError) {
      console.error('VoteMutation =>', voteMutationError);
    }
  }
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export const Link = graphql(VOTE_MUTATION, { name: 'voteMutation' })(LinkComponent)
