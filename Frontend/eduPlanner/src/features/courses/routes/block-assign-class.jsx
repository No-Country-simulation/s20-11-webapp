import { Spacer } from "@/Components/layout/spacer";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useLoaderData } from "react-router-dom";
import { subjectService } from "../services/subject.service";

export async function assignClassLoader() {
  const subjects = await subjectService.getSubjects();
  return { subjects };
}

export default function AssignClass() {
  //TODO: THIS NEEDS TO BE A FORM
  const { subjects } = useLoaderData();

  return (
    <div className="flex flex-col gap-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona una materia" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem key={subject.id} value={subject.id}>
              <div className="flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: subject.color,
                  }}
                  className="size-4 rounded-full"
                ></div>{" "}
                {subject.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Spacer size="4xs" />
      <Button onClick={() => alert("Sin Implementar 😢")}>Asignar</Button>
    </div>
  );
}
