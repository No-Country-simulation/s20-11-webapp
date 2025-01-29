import { cn } from "@/lib/utils";






export function EventDetailList({ cardClassName, events }) {
  //le pasé classname para pasar clases extra por props al usar el componente en EventListCoord


  return (
    <div className="listado-eventos pt-4 text-sm">
      {events.length > 0 ? (
        events.map((event, index) => {
          const eventDate = new Date(event.date);

          return (
            // TARJETITA
            <div
              className={cn(
                "tarjetita p-2 mb-3 bg-card border rounded-md border-card-border",
                cardClassName
              )}
              style={{
                /* borderLeftWidth: "8px",
                borderLeftColor: event.subject.color,
                "--subject-color": event.subject.color, */
                
                borderLeftWidth: "8px",
                borderLeftColor: `dark:${event.color.dark} : event.color.light`
              }}
              key={eventDate.getTime()}
            >
              <div className="">
                {/* MATERIA */}
                <p className="text-sm22 text-gray-700">{event.subject.name}</p>

                {/* LINEA DEL MEDIO */}
                <div className="linea-del-medio flex justify-between items-center ">
                  <p className=" text-xl text-gray-700 leading-tight-custom">
                    {event.title}
                  </p>
                  {/* FECHA Y HORA */}
                  <div className="fecha-y-hora text-right h-auto flex flex-col justify-center md:flex md:gap-0.5 md:flex-row">
                    {/* FECHA */}
                    <p className="text-xs whitespace-nowrap">
                      {new Intl.DateTimeFormat("es-ES", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })
                        .format(eventDate)
                        .replace(",", "") // Elimina la coma
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </p>
                    <span className=" hidden md:block text-xs">|</span>
                    {/* HORA */}
                    <p className="text-xs whitespace-nowrap">
                      {new Intl.DateTimeFormat("es-ES", {
                        hour: "numeric",
                        minute: "2-digit",
                      }).format(eventDate)}{" "}
                      hs
                    </p>
                  </div>
                </div>

                {/* DESCRIPCIÓN */}
                <p className="text-sm22 text-gray-700">{event.description}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No hay eventos para esta fecha.</p>
      )}
    </div>
  );
}
