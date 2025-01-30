import {useParams} from "react-router-dom";
import EventDetailCalendar from "./EventDetailCalendar";
import { useLoaderData } from "react-router-dom";

function DayDetail() {
    const {date} = useParams();    

    const { events/* , user  */} = useLoaderData();

    const eventsForSelectedDate = events.data.filter(
        (event) => new Date(event.scheduledFor).toISOString().split("T")[0] === date
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