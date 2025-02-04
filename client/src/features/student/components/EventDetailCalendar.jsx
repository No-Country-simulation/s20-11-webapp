import { format } from "date-fns";
import { es } from "date-fns/locale";



function EventDetailCalendar({ events }) {



  //Formateo la fecha
  const formatScheduledForDate = (scheduledFor) => format(
    new Date(scheduledFor),
    "EEE d MMM",
    { locale: es }
  );

   //Formateo la hora
   const formatScheduledForHour = (scheduledFor) => format(
    new Date(scheduledFor),
    "HH:mm") + " hrs";
 
    


    return (
      <div className="listado-eventos flex flex-col gap-2 text-sm w-full">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="flex w-full gap-4" key={event.id}>
              <div className="border bg-card rounded-lg shadow flex w-full min-h-[100px] items-center gap-3 justify-between overflow-hidden transition-all hover:shadow-md group">
                <div id="marca-color-lateral"
                  style={{                    
                    "--border-color-light": event.color.light,
                    "--border-color-dark": event.color.dark,                  
                  }}
                  className="w-2 h-full bg-[--border-color-light] dark:bg-[--border-color-dark] group-hover:bg-[--border-color-dark] dark:group-hover:bg-[--border-color-light] transition-colors"
                />
                <div className="flex p-4 justify-between flex-1 gap-4 items-center">
                  <div>
                    <p className="text-xs pb-1.5">{event.header}</p>
                    <p className="font-semibold pb-1.5">{event.title}</p>
                    <p className="text-xs">{event.message}</p>
                  </div>
                  <div className="text-nowrap text-sm text-center">
                    <div className="font-semibold">{formatScheduledForHour(event.scheduledFor)}</div>
                    <div className="text-muted-foreground text-xs capitalize">
                      {formatScheduledForDate(event.scheduledFor)}
                    </div>
                  </div>
                </div>
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
