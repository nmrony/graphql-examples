import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REMOVE_TODO = gql`
  mutation removeTodo($id: Int!) {
    removeTodo(id: $id) @client
  }
`;

const TodoRemove = ({ id }) => (
  <Mutation mutation={REMOVE_TODO} variables={{ id }}>
    {removeTodo => <button onClick={removeTodo}>x</button>}
  </Mutation>
);

export default TodoRemove;
