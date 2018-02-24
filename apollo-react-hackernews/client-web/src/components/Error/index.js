import React, { Component } from 'react'

export const Error = ({ message }) => (
  <div className="alert">
    <div className="alert-header">Error</div>
    <div className="alert-body">{message}</div>
  </div>
)
