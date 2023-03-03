import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  // prints out different messages based on interview spots left
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots";
    } else if (props.spots === 1) {
      return `${props.spots} spot`;
    } else {
      return `${props.spots} spots`;
    }
  };
  // class name based on selected day and spots left
  const liClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      data-testid="day"
      className={liClass}
      onClick={() => {
        props.setDay(props.name);
      }}
      
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}
