import { Spacer } from "@/Components/layout/spacer";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useLoaderData } from "react-router-dom";
import { subjectService } from "../../courses/services/subject.service";
import { useState } from "react";
import { useEvents } from "../../../Components/event-provider";
/* PARA DATE PICKER */
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react" 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { es } from "date-fns/locale";



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

  /* PARA DATE PICKER */
  const [date, setDate] = useState(null);


  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);


  // Generar opciones de select 
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

    

  const handleSubmit = () => {
    if (!title.trim()) {
        alert("Por favor, ingresa un título.");
        return;
      }
    if (!description.trim()) {
      alert("Por favor, ingresa una descripción.");
      return;
    }    

    if (!date) {
      alert("Por favor, selecciona una fecha.");
      return;
    }
  
    const fullDate = new Date(date);
    fullDate.setHours(hour);
    fullDate.setMinutes(minute);
  
    const formattedDate = fullDate.toISOString();  // Convierte la fecha al formato estándar ISO
  

      const newEvent = {
        subject,
        title,
        date: formattedDate,
        description,
      };
  
      addEvent(newEvent);
      alert("Evento agregado correctamente.");
  
      // Limpiar el formulario
      setTitle('')
      setDescription('');     
      setSubject('')
      setDate(null)       
      setHour(0);
      setMinute(0);
    };



  return (
    <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="título">
              <p className="text-sm22">Título</p>
              <input
              type="text"              
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-card-border p-2 rounded text-black"
              />
          </div>
          <div className="description">
              <p className="text-sm22">Descripción</p>
              <input
              type="text"              
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-card-border p-2 rounded text-black"
              />
          </div>
            
            
            <Select
            value={subject ? subject.name : ''}
            onValueChange={(value) => {
                const selectedSubject = subjects.find((sub) => sub.name === value);
                setSubject(selectedSubject);
            }}
            >
                <SelectTrigger className="w-full border border-gray-400">
                    <SelectValue placeholder="Selecciona una materia" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((sub) => (
                        <SelectItem key={sub.name} value={sub.name}>
                            <div className="flex items-center gap-2">
                            <div
                                style={{ backgroundColor: sub.color }}
                                className=" size-4 rounded-full"
                            ></div>
                            {sub.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            
            {/* FECHAS CON DATE PICKER */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "d 'de' MMMM yyyy", { locale: es }) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>


            {/* HORA */}
            <div className="">
                <p className="text-sm22">Hora</p>
                <div className="flex gap-2">
                    <select value={hour} onChange={(e) => setHour(parseInt(e.target.value))} className="border border-card-border text-black border p-2 rounded">
                        {hours.map(h => <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>)}
                    </select>

                    <select value={minute} onChange={(e) => setMinute(parseInt(e.target.value))} className="border border-card-border text-black border p-2 rounded">
                        {minutes.map(m => <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>)}
                    </select>
                </div>                
            </div>
        </div>      
      <Spacer size="4xs" />
      <Button variant='primary' onClick={handleSubmit}>Publicar</Button>
    </div>
  );
}