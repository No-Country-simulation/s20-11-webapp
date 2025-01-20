import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendario.css"; // Estilos personalizados

function Calendario() {

  const [date, setDate] = useState(new Date());

  const [eventsArray, setEventsArray] = useState([
    { date: new Date(2025, 0, 20, 16, 0), description: 'Exámen de matemáticas' },
    { date: new Date(2025, 0, 25, 10, 0), description: 'Trabajo práctico de matemáticas' }
  ]);

  // Estados del formulario
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);


  // Generar opciones de select
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  
  // Validar fecha antes de agregar evento
  const isValidDate = (year, month, day) => {
    const testDate = new Date(year, month, day);
    return testDate.getFullYear() === year && testDate.getMonth() === month && testDate.getDate() === day;
  };



  // Función agregar evento
  const handleAddEvent = () => {
    if (!description.trim()) {
      alert('Por favor, ingresa una descripción para el evento.');
      return;
    }

    if (!isValidDate(year, month, day)) {
      alert('Fecha inválida. Por favor selecciona un día válido para el mes y año elegidos.');
      return;
    }

    const newEvent = {
      date: new Date(year, month, day, hour, minute),
      description
    };

    setEventsArray([...eventsArray, newEvent]);
    alert('Evento agregado correctamente.');

    // Limpiar el formulario
    setDescription('');
    setYear(new Date().getFullYear());
    setMonth(0);
    setDay(1);
    setHour(0);
    setMinute(0);
  };


  
  // ARRAY DE EVENTOS
  /* const eventsArray = [
    { date: new Date(2025, 0, 20, 16, 0), description: 'Exámen de matemáticas' },
    { date: new Date(2025, 0, 25, 10, 0), description: 'Trabajo práctico de matemáticas' },
    { date: new Date(2025, 0, 20, 18, 0), description: 'Reunión de padres' } // Evento en la misma fecha
  ];
  console.log('eventsArray', eventsArray) */


  

// Obtener solo las fechas únicas de eventsArray (sin importar hora del evento)
const highlightedDates = Array.from(
    new Set(eventsArray.map(event => event.date.toDateString()))
  ).map(dateStr => new Date(dateStr));
console.log('highLightedDates', highlightedDates)


  // Función para agregar clases CSS a días con eventos
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (highlightedDates.some(d => d.toDateString() === date.toDateString())) {
        return 'highlight';
      }
    }
    return null;
  };


  // Filtrar eventos para la fecha seleccionada en el calendario
  const eventsForSelectedDate = eventsArray.filter(event =>
    event.date.toDateString() === date.toDateString()
  );


  return (
    <main className="p-16 flex flex-col justify-center items-center">
        <h1 className="text-foreground font-semibold pb-12 font-lg">Calendario</h1>
        <div className="calendario-y-novedades flex flex-row gap-12">
            <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            formatShortWeekday={(locale, date) =>
                ['L', 'M', 'M', 'J', 'V', 'S', 'D'][date.getDay()]
            }
            />
            <div className="titulo-y-eventos">
                <h3 className="font-semibold text-lg pb-3">Eventos del día</h3>
                <p className="fecha-seleccionada ">
                    Fecha seleccionada: {date.toLocaleDateString('es-ES', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                    })
                    .replace(',', '.') // Reemplaza la coma por un punto
                    .replace(/^\w/, (c) => c.toUpperCase())} {/* Convierte la primera letra en mayúscula */}
                </p>
                <div className="listado-eventos pt-4 text-sm">
                        <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
                        {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map((event, index) => (
                            <li className="pb-2" key={index}>{event.date.getHours()}:{event.date.getMinutes().toString().padStart(2, '0')}hs - {event.description}</li>
                        ))
                        ) : (
                            <li>No hay eventos para esta fecha.</li>
                        )}
                        </ul>
                </div>          
            </div>
        </div>

        {/* PARA AGREGAR EVENTO */}
        <div className="p-8">
            <h2 className="text-lg font-semibold mb-4">Agregar nuevo evento</h2>

            <div className="flex flex-col gap-4">
                <input
                type="text"
                placeholder="Descripción del evento"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded text-black"
                />

                <div className="flex gap-2">
                    <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {months.map((m, index) => <option key={m} value={m}>{index + 1}</option>)}
                    </select>

                    <select value={day} onChange={(e) => setDay(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="flex gap-2">
                    <select value={hour} onChange={(e) => setHour(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {hours.map(h => <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>)}
                    </select>

                    <select value={minute} onChange={(e) => setMinute(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {minutes.map(m => <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>)}
                    </select>
                </div>

                <button onClick={handleAddEvent} className="bg-button text-white p-2 rounded">
                Agregar evento
                </button>
            </div>

            {/* <h3 className="listado-total-eventos mt-6 font-semibold">Eventos</h3>
            <ul>
                {eventsArray.map((event, index) => (
                <li key={index}>
                    {event.date.toLocaleDateString('es-ES')} - {event.date.getHours()}:{event.date.getMinutes().toString().padStart(2, '0')} - {event.description}
                </li>
                ))}
            </ul> */}
        </div>      
    </main>
  );
}


export default Calendario;
