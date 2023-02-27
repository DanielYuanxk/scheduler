// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: "12pm", interview: null },
//     2: { id: 2, time: "1pm", interview: null },
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 },
//     },
//     4: { id: 4, time: "3pm", interview: null },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },
// };
export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }
  const theDay = state.days.find((each) => each.name === day);
  if (!theDay) {
    return [];
  }
  const appointments = theDay.appointments.map((id) => state.appointments[id]);
  return appointments;
}
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewers = state.interviewers;

  return {
    student: interview.student,
    interviewer: interviewers[interviewerID],
  };
}
export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }

  const theDay = state.days.find((each) => each.name === day);
  if (!theDay || !theDay.interviewers) {
    return [];
  }

  const interviewers = theDay.interviewers.map((id) => state.interviewers[id]);

  return interviewers;
}
