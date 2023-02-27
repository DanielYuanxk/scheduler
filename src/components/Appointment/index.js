import React from "react";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // const show = function () {
  //   return props.interview ? (
  //     <Show
  //       student={props.interview.student}
  //       interviewer={props.interview.interviewer}
  //     />
  //   ) : (
  //     <Empty />
  //   );
  // };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back()} />
      )}
    </article>
  );
}
