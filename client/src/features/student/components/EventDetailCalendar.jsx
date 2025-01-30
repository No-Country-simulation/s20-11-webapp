import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

function EventDetailCalendar({ cardClassName, events }) {
  return (
    <div className="listado-eventos text-sm">
          {events.length > 0 ? (
            events.map((event) => {
              // Convertir la fecha desde "scheduledFor"
              const eventDate = new Date(event.scheduledFor);
    
              // Formatear fecha (ejemplo: "Lun 29 ene")
              const formattedDate = new Intl.DateTimeFormat("es-ES", {
                weekday: "short",
                day: "numeric",
                month: "short",
              }).format(eventDate).replace(",", "").replace(/^\w/, (c) => c.toUpperCase());
    
              // Formatear hora (ejemplo: "10:15 hs")
              const formattedTime = new Intl.DateTimeFormat("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(eventDate);
    
              return (
                <div
      className={cn(
        "tarjetita p-2 mb-3 bg-card border rounded-md border-card-border border-l-8 border-subject-color dark:border-subject-color",
        cardClassName // Permite clases adicionales desde props
      )}
      style={{
        borderLeftColor: event.color.light, // Color en modo claro
        "--tw-border-opacity": "1",
        "--subject-color": event.color.light, // Definir variable CSS personalizada
        "--subject-color-dark": event.color.dark
      }}
      
                  key={event.id}
                >
                  <div>
                    {/* MATERIA */}
                    <p className="text-sm22 text-foreground">{event.header}</p>
    
                    
                    {/* LINEA DEL MEDIO */}
                    <div className="linea-del-medio flex justify-between items-center ">
                      <p className=" text-xl text-foreground leading-tight-custom">
                        {event.title}
                      </p>
                      {/* FECHA Y HORA */}
                      <div className="fecha-y-hora text-right h-auto flex flex-col justify-center md:flex md:gap-0.5 md:flex-row">
                        {/* FECHA */}
                        <p className="text-xs whitespace-nowrap">{formattedDate}</p>
                        <span className=" hidden md:block text-xs">|</span>
                        {/* HORA */}
                        <p className="text-xs whitespace-nowrap">{formattedTime} hs</p>
                      </div>
                    </div>
    
    
                    {/* Mensaje del evento */}
                    <p className="text-sm text-foreground">{event.message}</p>
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


/* EventDetailCalendar.propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        subject: PropTypes.shape({
          name: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
  }; */

export default EventDetailCalendar;
