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
    <div>
        <p className="fecha-seleccionada ">
            Fecha seleccionada: {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
              .replace(',', '.') // Reemplaza la coma por un punto
              .replace(/^\w/, (c) => c.toUpperCase())} {/* Convierte la primera letra en mayúscula */}
        </p>
        <EventDetailCalendar events={eventsForSelectedDate}/>
    </div>
  );
}

export default DayDetail;