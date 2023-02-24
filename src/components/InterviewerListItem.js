import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";
export default function InterviewerListItem(props) {
  const liClassName = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  const name = function () {
    return props.selected && props.name;
  };

  return (
    <li
      className={liClassName}
      onClick={() => {
        props.setInterviewer(props.id);
      }}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {name()}
    </li>
  );
}
