import React from 'react';
import classes from './Backdrop.module.css';
const Backdrop = props => {
  let clicked = null;
  let style = null;
  if(props.clicked){
    clicked = props.clicked;
  }
  if(props.transparent){
    style={backgroundColor: 'transparent'};
  }
  return (
    <div className={classes.Backdrop} style={style} onClick={clicked}>
    </div>
  )
}
export default Backdrop;