
import { format } from "date-fns";
import { es } from "date-fns/locale";


function EventDetailCalendar({ events }) {


  //🤖 chatgpt: Cambia el formato para que se vea si: "Viernes 2 enero, 2024 a las 20:00 hrs"
  const formatScheduledFor = (scheduledFor) => format(
    new Date(scheduledFor),
    "EEE d MMM",
    { locale: es }
  );


  return (
    <div className="listado-eventos pt-4 text-sm">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            className="p-3 mb-2 border-[--color-dark] border rounded-md flex justify-between items-center"
            style={{
              "--color-light": event.color.light,
              "--color-dark": event.color.dark,
            }}
            key={event.id}
          >
            <div>
              <p className="text-xs pb-1.5">{event.header}</p>
              <p className="font-semibold pb-1.5">{event.title}</p>
              <p className="text-xs">{event.message}</p>
            </div>
            <div className="text-right">
              <p className="text-xs">
                {formatScheduledFor(event.scheduledFor)}
                
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay eventos para esta fecha.</p>
      )}
    </div>
  );
}

export default EventDetailCalendar;
