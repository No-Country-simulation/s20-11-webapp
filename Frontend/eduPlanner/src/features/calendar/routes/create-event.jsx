import { Spacer } from "@/Components/layout/spacer";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useLoaderData } from "react-router-dom";
import { subjectService } from "../../courses/services/subject.service";
import { useState } from "react";
import { useEvents } from "../../../Components/event-provider";


export async function subjectLoader() {
  const subjects = await subjectService.getSubjects();
  return { subjects };
}


export default function CreateEvent() {
  //TODO: THIS NEEDS TO BE A FORM
  const { subjects } = useLoaderData();
  const { addEvent } = useEvents();

  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState('');
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

  const handleSubmit = () => {
    if (!title.trim()) {
        alert("Por favor, ingresa un título.");
        return;
      }
    if (!description.trim()) {
      alert("Por favor, ingresa una descripción.");
      return;
    }
    if (!isValidDate(year, month, day)) {
        alert('Fecha inválida. Por favor selecciona un día válido para el mes y año elegidos.');
        return;
      }
  
      const newEvent = {
        subject,
        title,
        date: new Date(year, month, day, hour, minute),
        description,
      };
  
      addEvent(newEvent);
      alert("Evento agregado correctamente.");
  
      // Limpiar el formulario
      setSubject('')
      setTitle('')
      setDescription('');
      setYear(new Date().getFullYear());
      setMonth(0);
      setDay(1);
      setHour(0);
      setMinute(0);
    };



  return (
    <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="título">
              <p>Título</p>
              <input
              type="text"
              /* placeholder="Título" */
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded text-black"
              />
          </div>
          <div className="description">
              <p>Descripción</p>
              <input
              type="text"
              /* placeholder="Descripción" */
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded text-black"
              />
          </div>
            
            
            <Select
            value={subject ? subject.name : ''}
            onValueChange={(value) => {
                const selectedSubject = subjects.find((sub) => sub.name === value);
                setSubject(selectedSubject);
            }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una materia" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((sub) => (
                        <SelectItem key={sub.name} value={sub.name}>
                            <div className="flex items-center gap-2">
                            <div
                                style={{ backgroundColor: sub.color }}
                                className="size-4 rounded-full"
                            ></div>
                            {sub.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            
            {/* FECHAS */}            
            <div className="para-seleccionar-fecha ">
                <p>Día</p>
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
            </div>
            {/* HORA */}
            <div className="">
                <p>Hora</p>
                <div className="flex gap-2">
                    <select value={hour} onChange={(e) => setHour(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {hours.map(h => <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>)}
                    </select>

                    <select value={minute} onChange={(e) => setMinute(parseInt(e.target.value))} className="text-black border p-2 rounded">
                        {minutes.map(m => <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>)}
                    </select>
                </div>                
            </div>
        </div>      
      <Spacer size="4xs" />
      <Button variant='miboton' onClick={handleSubmit}>Publicar</Button>
    </div>
  );
}