import { Spacer } from "@/components/layout/spacer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { subjectService } from "../../courses/services/subject.service";
/* PARA DATE PICKER */
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { requireAdmin } from "../../auth/services/auth.service"

export async function subjectLoader({ params }) {
  await requireAdmin();
  const subjects = await subjectService.getSubjects(params.courseId);

  return { subjects }; // Eliminamos array innecesario en la asignación
}

export default function CreateEvent() {
  const { subjects } = useLoaderData();
  console.log("Subjects en CreateEvent:", subjects); // 🔥 Verifica la estructura

  const subjectsList = subjects.data || []; // ✅ Asegurar que sea un array

  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  // Opciones para select de hora y minutos
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !date || !subject) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const fullDate = new Date(date);
    fullDate.setHours(hour);
    fullDate.setMinutes(minute);
  
    const newEvent = {
      subject,
      title,
      date: fullDate.toISOString(), 
      description,
    };

    console.log("Evento creado:", newEvent);
    alert("Evento agregado correctamente.");

    // Limpiar el formulario
    setTitle('');
    setDescription('');
    setSubject(null);
    setDate(null);
    setHour(0);
    setMinute(0);
  };

  return (
    <div className="flex flex-col gap-2 bg-card">
      <div className="flex flex-col gap-4">
        <div className="titulo">
          <p className="text-sm22">Título</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-card-border dark:bg-background dark:text-foreground p-2 rounded"
          />
        </div>

        <div className="description">
          <p className="text-sm22">Descripción</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-card-border dark:bg-background dark:text-foreground p-2 rounded"
          />
        </div>

        {/* SELECCIÓN DE MATERIA */}
        <Select
          value={subject ? subject.name : ""}
          onValueChange={(value) => {
            const selectedSubject = subjectsList.find((sub) => sub.name === value);
            setSubject(selectedSubject || null);
          }}
        >
          <SelectTrigger className="w-full border border-card-border">
            <SelectValue placeholder="Selecciona una materia" />
          </SelectTrigger>
          <SelectContent>
            {subjectsList.map((sub) => (
              <SelectItem key={sub.id} value={sub.name}>
                <div className="flex items-center gap-2">
                <div
                    className="size-4 rounded-full"
                    style={{
                      backgroundColor: `var(--color-${sub.id})`,
                    }}
                  />
                  <style>
                    {`
                      :root {
                        --color-${sub.id}: ${sub.color.light};
                      }
                      @media (prefers-color-scheme: dark) {
                        --color-${sub.id}: ${sub.color.dark};
                      }
                    `}
                  </style>
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
              variant={"daypicker"}
              className={cn(
                "w-full flex !justify-start !text-left font-normal border border-card-border",
                !date && "text-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "d 'de' MMMM yyyy", { locale: es }) : <span>Selecciona una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        {/* HORA */}
        <div className="">
          <p className="text-sm22">Hora</p>
          <div className="flex gap-2">
            <select
              value={hour}
              onChange={(e) => setHour(parseInt(e.target.value))}
              className="border border-card-border dark:bg-background dark:text-foreground p-2 rounded"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h.toString().padStart(2, "0")}
                </option>
              ))}
            </select>

            <select
              value={minute}
              onChange={(e) => setMinute(parseInt(e.target.value))}
              className="border border-card-border dark:bg-background dark:text-foreground p-2 rounded"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Spacer size="4xs" />
      <Button variant="primary" onClick={handleSubmit}>
        Publicar
      </Button>
    </div>
  );
}