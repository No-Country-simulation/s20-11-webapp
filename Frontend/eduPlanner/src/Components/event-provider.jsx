import { createContext, useContext, useState, useEffect } from "react";
import { calendarService } from "../features/calendar/services/calendar.service";

// Crear el contexto
const EventsContext = createContext();

// Proveedor del contexto
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Cargar eventos desde el servicio al montar
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await calendarService.getEvents();
        setEvents(eventData);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  // Función para agregar un nuevo evento
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

// Hook personalizado para usar el contexto de eventos en cualquier parte de la aplicación
export const useEvents = () => useContext(EventsContext);