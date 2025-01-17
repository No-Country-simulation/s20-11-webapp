import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendario() {
  const [date, setDate] = useState(new Date());
  return (
    <main className="p-16 flex flex-col justify-center items-center">
      <h1 className="text-foreground font-semibold pb-4">React Calendar</h1>
      <Calendar
        className={`bg-background text-foreground`}
        onChange={setDate}
        value={date}
      />
      <p className="text-foreground">
        Fecha seleccionada: {date.toDateString()}
      </p>
    </main>
  );
}

export default Calendario;
