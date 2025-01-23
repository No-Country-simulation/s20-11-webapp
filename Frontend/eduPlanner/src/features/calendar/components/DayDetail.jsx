import { useParams } from "react-router-dom";
import { useEvents } from "../../../Components/event-provider";
import EventDetailCalendar from "./EventDetailCalendar";

function DayDetail() {
  const { date } = useParams();
  const { events } = useEvents();

  const eventsForSelectedDate = events.filter(
    (event) => event.date.toISOString().split("T")[0] === date
  );
  
   // Convertir la fecha de la URL a un objeto Date
   const selectedDate = new Date(date);
 
  return (
    <div className="p-4">
        <p className="fecha-seleccionada text-xl">
           {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              
            })
              .replace(',', '')
              .replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <EventDetailCalendar events={eventsForSelectedDate}/>
    </div>
  );
}

export default DayDetail;