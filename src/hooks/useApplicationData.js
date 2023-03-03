import axios from "axios";

import { useState, useEffect } from "react";
export default function useApplicationData() {
 //set state as an object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // set current day
  const setDay = (day) => setState({ ...state, day });
  // check how many open spots are left based on number of null values
  // in interview state.interveiw
  const getDayOpenSpots = (state, day) => {
    const appointmentsForDay = day.appointments.map(
      (appointmentID) => state.appointments[appointmentID]
    );
    const count = appointmentsForDay.filter(
      (each) => each.interview === null
    ).length;
    return count;
  };

// useEffect here to watch [] so the data from api only loads once
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  // booking an interview put request to server to add appointment to 
  // database
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => {
        const newState = { ...prev, appointments };
        newState.days = newState.days.map((day) => {
          if (day.name === newState.day) {
            day.spots = getDayOpenSpots(newState, day);
          }

          return day;
        });
        return newState;
      });
    });
  };
  // deletes appointment in database
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState((prev) => {
        const newState = { ...prev, appointments };
        newState.days = newState.days.map((day) => {
          if (day.name === newState.day) {
            day.spots = getDayOpenSpots(newState, day);
          }
          return day;
        });
        return newState;
      })
    );
  };

  return { state, setDay, bookInterview, cancelInterview };
}
