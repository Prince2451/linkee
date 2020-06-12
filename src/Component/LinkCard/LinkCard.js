import React from "react";
import classes from "./LinkCard.module.css";
import Input from "../Input/Input";
import { DragSource, DropTarget, DragLayer, DragPreviewImage } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
const INPUT = {
  title: {
    name: "title",
    placeholder: "Title",
    type: "text",
  },
  link: {
    name: "link",
    placeholder: "Link",
    type: "text",
  },
};
const LinkCard = (props) => {
  let {
    connectDragSource,
    isDragging,
    connectDropTarget,
    connectDragPreviewImage,
  } = props;
  let style = null;
  if (props.inputElems.link.isValid && props.inputElems.title.isValid) {
    style = classes.CheckBox;
  } else if (!props.inputElems.link.value || !props.inputElems.link.value) {
    style = [classes.CheckBox, classes.CheckOrange].join(" ");
  } else {
    style = [classes.CheckBox, classes.CheckRed].join(" ");
  }
  return connectDragSource(
    connectDropTarget(
      <div
        className={classes.LinkCard}
        style={
          props.componentStyle
            ? props.componentStyle
            : { opacity: isDragging ? "0" : "1" }
        }
      >
        <div
          className={classes.DragArea}
          onMouseDown={(e) => props.makeDraggable(e, props.index)}
          onTouchStart={(e) => props.makeDraggable(e, props.index)}
        >
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <div className={classes.Input}>
          {" "}
          <Input
            index={props.index}
            name={INPUT.title.name}
            placeholder={INPUT.title.placeholder}
            value={props.inputElems.title.value}
            type={INPUT.title.type}
            isValid={props.inputElems.title.isValid}
            touched={props.inputElems.title.touched}
            isInLinkCard
            changed={props.changed}
            id={props.inputElems.title.id}
            outerId={props.index}
            onblur={props.updateLinksInDB}
          />
          <Input
            index={props.index}
            name={INPUT.link.name}
            placeholder={INPUT.link.placeholder}
            value={props.inputElems.link.value}
            type={INPUT.link.type}
            isValid={props.inputElems.link.isValid}
            touched={props.inputElems.link.touched}
            isInLinkCard
            changed={props.changed}
            id={props.inputElems.link.id}
            outerId={props.index}
            onblur={props.updateLinksInDB}
          />
        </div>
        <div className={classes.Images}>
          <div className={classes.Check}>
            <input
              type="checkbox"
              className={style}
              checked={props.checked}
              onChange={(e) => props.checkChanged(e, props.index)}
            />
            <span className={classes.Span}></span>
          </div>
          <svg
            onClick={(e) => props.deleteLink(e, props.index)}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </div>
        <DragPreviewImage
          src=""
          connect={connectDragPreviewImage(getEmptyImage())}
        />
      </div>
    )
  );
};
const DropSpec = {
  hover(props, monitor, component) {
    if (props.index !== monitor.getItem().index) {
      props.moveElement(monitor.getItem().index, props.index);
    }
    monitor.getItem().index = props.index;
  },
  drop(props, monitor) {
    props.removeDraggable(monitor.getItem().index);
    props.updateLinksInDB();
  },
};
const DragSpec = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
  canDrag(props) {
    return props.draggable;
  },
};
function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}
function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreviewImage: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}
function dragLayerCollect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
  };
}
export default DragLayer(dragLayerCollect)(
  DropTarget(
    "linkCard",
    DropSpec,
    dropCollect
  )(DragSource("linkCard", DragSpec, dragCollect)(LinkCard))
);
