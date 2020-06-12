import React from "react";
import classes from "./Links.module.css";
import LinkCard from "../LinkCard/LinkCard";
import { Preview } from "react-dnd-multi-backend";
const Links = (props) => {
  let links = [];
  let i = 0;
  for (let ele of props.links) {
    links.push(
      <LinkCard
        makeDraggable={props.makeDraggableHandler}
        index={i}
        removeDraggable={props.removeDraggable}
        changed={props.updateLinkValueHandler}
        inputElems={ele.inputElems}
        key={ele.id}
        id={ele.id}
        checkChanged={props.checkChangedHandler}
        checked={ele.checked}
        draggable={ele.draggable}
        moveElement={props.moveElement}
        deleteLink={props.deleteLinkHandler}
        updateLinksInDB={props.updateLinksInDB}
      />
    );
    i++;
  }
  const generatePreview = ({ itemType, item, style }) => {
    const addedStyles = {
      ...style,
      boxShadow: "0 4px 10px rgba(0,0,0,.3)",
      maxWidth: props.isMobile ? null : "45%",
    };
    return (
      <LinkCard
        componentStyle={addedStyles}
        inputElems={props.links[item.index].inputElems}
        draggable={props.links[item.index].draggable}
        checked={props.links[item.index].checked}
      />
    );
  };
  let loadingIndicator = null;
  if (props.isLoading) {
    loadingIndicator = (
      <div className={classes.LoadingIndicator}>
        <div></div>
      </div>
    );
  }
  return (
    <div className={classes.Links}>
      <button
        className={classes.AddLinkBtn}
        type="button"
        onClick={props.addNewLInkHandler}
      >
        Add New Link
      </button>
      <main className={classes.MainContent}>
        {loadingIndicator}
        {links}
        <Preview generator={generatePreview} />
      </main>
    </div>
  );
};

export default Links;
