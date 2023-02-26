import React from "react";

import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
export default function Appointment(props) {
  const show = function () {
    return props.interview ? (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    ) : (
      <Empty />
    );
  };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {show()}
    </article>
  );
}
