import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendario.css"; // Estilos personalizados
import { ResponsiveOutletModal } from "../../../Components/responsive-outlet-modal";
import { useEvents } from "../../../Components/event-provider";
import EventDetailCalendar from "./EventDetailCalendar";

function Calendario() {

  const { events } = useEvents();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate(); 

  console.log('events', events)

  const highlightedDates = Array.from(
    new Set(events.map((event) => event.date.toDateString()))
  ).map((dateStr) => new Date(dateStr));


  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (highlightedDates.some((d) => d.toDateString() === date.toDateString())) {
        return "highlight";
      }
    }
    return null;
  };


  const eventsForSelectedDate = events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );


  const baseClasses =
    "select-none justify-center flex flex-col items-center p-2 rounded hover:ring-2  hover:ring-primary cursor-pointer transition-all duration-300 border w-[20rem] md:w-[13rem] shadow text-foreground";


    const handleDateClick = (selectedDate) => {
      setDate(selectedDate);
    
      // Navegar a la página de detalles del día en mobile
      if (window.innerWidth < 768) {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
        navigate(`/day-detail/${formattedDate}`);  // Ruta relativa dentro de /calendar
      }
    };

 
  return (
    <main className="p-16 flex flex-col justify-center items-center">
      <h1 className="text-foreground font-semibold pb-12 font-lg">Calendario</h1>
      <div className="calendario-y-novedades flex flex-row gap-12">
        <Calendar
          onChange={handleDateClick}
          value={date}
          tileClassName={tileClassName}
          formatShortWeekday={(locale, date) =>
            ['L', 'M', 'M', 'J', 'V', 'S', 'D'][date.getDay()]
          }
        />
        <div className="titulo-y-eventos hidden md:block">
          <h3 className="font-semibold text-lg pb-3">Eventos del día</h3>
          <p className="fecha-seleccionada ">
            Fecha seleccionada: {date.toLocaleDateString('es-ES', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
              .replace(',', '.') // Reemplaza la coma por un punto
              .replace(/^\w/, (c) => c.toUpperCase())} {/* Convierte la primera letra en mayúscula */}
          </p>
          <div className="listado-eventos pt-4 text-sm">
            <EventDetailCalendar  events={eventsForSelectedDate}/>            
          </div>
        </div>
      </div>

      {/* PARA AGREGAR EVENTO no va mas */}
      {/* <div className="p-8">
        <ResponsiveOutletModal
          to={"create-event"}
          trigger={
            <div className={`${baseClasses} bg-background`}>
              <h3 className="font-bold text-muted-foreground">Agregar evento</h3>
            </div>
          }
          title={"Crear evento"}
        />
      </div> */}
    </main>
  );
}




export default Calendario;
