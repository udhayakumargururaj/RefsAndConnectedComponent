import React, { Component, useRef, useImperativeHandle } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { connect, Provider } from 'react-redux';
import './style.css';

import { createStore } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}

const store = createStore(todos, ['Use Redux']);

function Parent(props) {
  const refs = useRef([]);

  function validateChildren() {
    console.log('refts', refs.current);
    //refs.current.validate();
  }

  return (
    <>
      <button onClick={validateChildren}>Validate</button>
      <ConnectedChild ref={refs} />
    </>
  );
}

const Child = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    validate() {
      // to validate this component
      alert("I'm clicked");
    },
  }));

  return <>Some code here</>;
});
const mapStateToProps = (state) => ({
  value: 'test',
});
const ConnectedChild = connect(mapStateToProps, null, null, { withRef: true })(
  Child
);

render(
  <Provider store={store}>
    <Parent />
  </Provider>,
  document.getElementById('root')
);
