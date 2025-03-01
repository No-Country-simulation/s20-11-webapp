import { useIsMobile } from "@/hooks/use-mobile.jsx";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./Calendario.css"; // Estilos que perzonalicé del componente de shadcn
import EventDetailCalendar from "./EventDetailCalendar";

function Calendario() {

  // const { events } = useEvents();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate(); 

  console.log('events', events)

  const isMobile = useIsMobile();

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
      if (isMobile) {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Para que se vea YYYY-MM-DD
        navigate(`/student/calendar/${formattedDate}`);  // Ruta relativa a /student/calendar
      }
    };

 
  return (
    
    <div className="md:px-28 md:pt-12 sm:p-">   
         
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
        
        <div className="titulo-y-eventos hidden md:block md:pt-12 md:w-full">          
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
      {/* <div className="">
         <Outlet />   
      </div> */}
       
    </div>
    
  );
}




export default Calendario;
