import moment from "moment";

// Received format: Fri Dec 02 2022 01:09:00 GMT+0200 (Eastern European Standard Time)
// Returned format: Fri Dec 02 2022 01:09:00 AM
export const getFormatedDate = (input) => {
  let formatedDate = input.substring(0, 24);
  let day = formatedDate.substring(0, 16);
  let hour = Number(formatedDate.substring(16, 18));
  let minutesSeconds = formatedDate.substring(18, 24);

  if (hour === 12) {
    formatedDate = day + hour + minutesSeconds + " PM";
  } else if (hour > 12) {
    hour = hour - 12;
    hour = hour < 10 ? `0${hour}` : hour;
    formatedDate = day + hour + minutesSeconds + " PM";
  } else if (hour === 0) {
    formatedDate = day + "12" + minutesSeconds + " AM";
  } else {
    formatedDate += " AM";
  }

  return formatedDate;
};

// Checks and returns whether the given appointment's date started, finished or yet to come
// by comparing the appointment date with the current date
export const isAppointmentDate = (appointment) => {
  const currentDateAndTime = getFormatedDate(moment()._d.toString());

  // Creating a moment object for both current date and appointment date to use moment's date comparison functions
  // Setting year, month, day of current date moment object
  let currentDate = getDateValues(currentDateAndTime);
  currentDate = moment()
    .year(currentDate.year)
    .month(currentDate.month)
    .date(currentDate.day);

  // Setting year, month, day of appointment date moment object
  let appointmentDate = getDateValues(appointment.date);
  appointmentDate = moment()
    .year(appointmentDate.year)
    .month(appointmentDate.month)
    .date(appointmentDate.day);

  // Setting hour, minute, second of current date moment object
  let currentTime = getTimeValues(currentDateAndTime);
  currentDate.second(currentTime.s);
  currentDate.minute(currentTime.m);
  currentDate.hour(getFormattedHours(currentTime));

  // Setting hour, minute, second of appointment date moment object
  let appointmentTime = getTimeValues(appointment.date);
  appointmentDate.second(appointmentTime.s);
  appointmentDate.minute(appointmentTime.m);
  appointmentDate.hour(getFormattedHours(appointmentTime));

  // Check if appointment date is yet to come
  if (currentDate.isBefore(appointmentDate)) {
    return {
      status: false,
      message: "early",
    };
  }

  // Check if appointment is done
  // An appointment is done if the current date is 
  // after 1 hour of the appoinmnent date
  appointmentDate.add(1, "hours");
  if (currentDate.isAfter(appointmentDate)) {
    return {
      status: false,
      message: "finished",
      expiryTime: appointmentDate._d.toString(),
    };
  }

  //if neither of the above is the case,
  // that means the current date meets the appointment date
  // and the users can join the appointment
  return {
    status: true,
    message: "joined",
    expiryTime: appointmentDate._d.toString(),
  };
};

// Received format: Thu Dec 01 2022 08:40:20 PM
// Returned format: {day: 1, month: 'Dec', year: 2022}
const getDateValues = (date) => {
  return {
    day: Number(date.substring(8, 10)),
    month: date.substring(4, 7),
    year: Number(date.substring(11, 15)),
  };
};

// Received format: Thu Dec 01 2022 08:41:18 PM
// Returned format: {h: 8, m: 41, s: 18, t: 'PM'}
const getTimeValues = (time) => {
  return {
    h: Number(time.substring(16, 18)),
    m: Number(time.substring(19, 21)),
    s: Number(time.substring(22, 24)),
    t: time.substring(25, 27),
  };
};

// Converts and returns hours from 12-hour-clock to 24-hour-clock format
// Received format: {h: 3, m: 0, s: 0, t: 'PM'}
// Returned format: 15
const getFormattedHours = (time) => {
  return time.t === "PM"
    ? time.h === 12
      ? time.h
      : time.h + 12
    : time.h === 12
    ? time.h - 12
    : time.h;
};