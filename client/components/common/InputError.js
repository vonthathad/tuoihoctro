import React, { Component, PropTypes } from 'react';
export class InputError extends Component{
  constructor(){
    super();
    this.state ={
      message: 'Input is invalid'
    }
  }
  render(){
    const errorClass = {
      'error_container':   true,
      'visible':           this.props.visible,
      'invisible':         !this.props.visible
    }

    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }

}
