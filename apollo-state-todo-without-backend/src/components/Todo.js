import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TodoRemove from './TodoRemove';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

const Todo = ({ id, completed, text }) => (
  <Mutation mutation={TOGGLE_TODO} variables={{ id }}>
    {toggleTodo => (
      <li>
        <span
          onClick={toggleTodo}
          style={{
            textDecoration: completed ? 'line-through' : 'none'
          }}
        >
          {text}
        </span>{' '}
        <TodoRemove id={id} />
      </li>
    )}
  </Mutation>
);

export default Todo;
