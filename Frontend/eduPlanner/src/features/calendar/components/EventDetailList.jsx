import PropTypes from "prop-types";

function EventDetailList({ events }) {

  return (
    <div className="listado-eventos pt-4 text-sm">
      {events.length > 0 ? (
        events.map((event, index) => (
          <div
            className="p-2 mb-3 border rounded-md flex justify-between items-center bg-gray-100"
            style={{
              borderLeftWidth: "8px",
              borderLeftColor: event.subject.color,
              "--subject-color": event.subject.color,
            }}
            key={event.date.getTime()}
          >
            <div>
              <p className="text-xs text-gray-700">{event.subject.name}</p>
              <p className="font-semibold text-gray-700">{event.title}</p>
              <p className="text-xs text-gray-700">{event.description}</p>
            </div>
            <div className="text-right flex gap-2">
              <p className="text-xs">
                {new Intl.DateTimeFormat("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(event.date).replace(/^\w/, (c) => c.toUpperCase())}  
              </p>
              <span className="text-xs">|</span>
              <p className="text-xs">
                {new Intl.DateTimeFormat("es-ES", {
                  hour: "numeric",
                  minute: "2-digit",
                }).format(event.date)} hs
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

EventDetailList.propTypes = {
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

export default EventDetailList;