// get appointments for day based on appointment id
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
//gets interviews for day
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
//gets interviewer for day
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
