import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendario.css"; // Estilos que perzonalicé del componente de shadcn
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
        return date.toDateString() === new Date().toDateString() ? "highlight react-calendar__tile--active" : "highlight";
      }
    }
    return null;
  };


  const eventsForSelectedDate = events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );




    const handleDateClick = (selectedDate) => {
      setDate(selectedDate);
    
      // Para ir a la página de detalles del día en mobile
      if (window.innerWidth < 743) {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Para que se vea YYYY-MM-DD
        navigate(`/day-detail/${formattedDate}`); 
      }
    };

 
  return (
    
    <div className="p-4 md:px-28 md:pt-12 sm:p-8">   
         
      <div className="calendario-y-novedades flex flex-row sm:flex-col gap-40 sm:gap-6 md:flex-row md:gap-40">
        <div>
            <h1 className="text-foreground pb-12 text-3xl text-left">Calendario</h1>
            <Calendar
              onChange={handleDateClick}
              value={date}
              tileClassName={tileClassName}
              formatShortWeekday={(locale, date) =>
                ['L', 'M', 'M', 'J', 'V', 'S', 'D'][date.getDay()]
              }
              formatMonthYear={(locale, date) =>
                date.toLocaleDateString('es-ES', {
                  month: 'long', 
                  year: 'numeric'
                }).replace(/^./, (str) => str.toUpperCase()).replace('de ', '') 
              }
            />
        </div>
        
        <div className="titulo-y-eventos hidden sm:block md:pt-12 md:w-full">          
          <p className="fecha-seleccionada text-xl">
           {date.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              
            })
              .replace(',', '') 
              .replace(/^\w/, (c) => c.toUpperCase())} 
          </p>
          <div className="listado-eventos pt-4 text-sm sm:w-full w-[595px]">
            <EventDetailCalendar  events={eventsForSelectedDate}/>            
          </div>
        </div>
      </div>      
    </div>
    
  );
}




export default Calendario;
