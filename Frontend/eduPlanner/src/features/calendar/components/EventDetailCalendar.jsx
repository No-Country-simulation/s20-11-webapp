import PropTypes from "prop-types";

function EventDetailCalendar({ events }) {
  return (
    <div className="listado-eventos pt-4 text-sm">
      {events.length > 0 ? (
        events.map((event, index) => (
          <div
            className="p-3 mb-2 border rounded-md flex justify-between items-center"
            style={{
              borderLeftWidth: "6px",
              borderLeftColor: event.subject.color,
              "--subject-color": event.subject.color,
            }}
            key={index}
          >
            <div>
              <p className="text-xs pb-1.5">{event.subject.name}</p>
              <p className="font-semibold pb-1.5">{event.title}</p>
              <p className="text-xs">{event.description}</p>
            </div>
            <div className="text-right">              
              <p className="text-xs">
                {event.date.getHours()}:{event.date.getMinutes().toString().padStart(2, "0")} hs
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

EventDetailCalendar.propTypes = {
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
  };

export default EventDetailCalendar;
