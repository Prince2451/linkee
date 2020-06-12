import React from "react";
import classes from "./Userview.module.css";

const Userview = (props) => {
  let links = [];
  let style = null;
  let bg = null;
  switch (props.background.backgroundType) {
    case "Color":
      bg = props.background.backgroundColor;
      break;
    case "Gradient":
      bg = `linear-gradient(${props.background.gradientDirection.toLowerCase()},${
        props.background.primaryColor
      },${props.background.secondaryColor})`;
      break;
    case "Image":
      bg = props.background.backgroundImage
        ? `url('${props.background.backgroundImage}')`
        : "#ffffff";
      break;
    default:
      break;
  }
  let addStyle = {
    background: bg,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: props.background.textColor,
  };
  switch (props.button.buttonType) {
    case "Solid":
      style = classes.Solid;
      break;
    case "Outline":
      style = classes.Outline;
      break;
    default:
      break;
  }
  for (let ele of props.links) {
    if (
      ele.checked &&
      ele.inputElems.title.isValid &&
      ele.inputElems.link.isValid
    ) {
      let eleLink = ele.inputElems.link.value.toLowerCase();
      if (!(eleLink.includes("https://") || eleLink.includes("http://"))) {
        eleLink = "http://" + eleLink;
      }
      links.push(
        <a
          className={classes.LinkButton}
          target="_blank"
          key={ele.id}
          href={eleLink}
          rel="noreferrer noopener"
        >
          <button className={style}>{ele.inputElems.title.value}</button>
        </a>
      );
    }
  }

  return (
    <div className={classes.Userview} style={addStyle}>
      <div className={classes.Image}>
        <img src={props.imageSrc} alt="profile pic" />
      </div>
      <div className={classes.LinksContainer}>{links}</div>
    </div>
  );
};

export default Userview;
