import { TitleBar } from "@/components/title-bar.jsx";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, Eye, Plus } from "lucide-react";
import { Spacer } from "../../../components/layout/spacer";
import { Button } from "../../../components/ui/button";

export default function CourseEvents() {


  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center ">
        <TitleBar title="Eventos" />
        <Button className="w-full sm:w-fit">
          <Plus /> Publicar Evento
        </Button>
      </div>
      <Spacer size="3xs" />
      <div className="flex flex-col gap-2">
        <Card>
          <CardHeader className="sm:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Registro de Eventos</CardTitle>
              <CardDescription>
                Historial de eventos publicados para el curso{" "}
                <span className="font-semibold">Quinto C</span>.
              </CardDescription>
            </div>
            <TableFilters />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Cabecera</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Descripción
                  </TableHead>
                  <TableHead className="hidden lg:table-cell text-right">
                    Horario programado
                  </TableHead>
                  <TableHead className="hidden lg:table-cell text-right">
                    Fecha publicación
                  </TableHead>
                  <TableHead className="lg:hidden"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <EventRow />
                <EventRow />
                <EventRow />
                <EventRow />
                <EventRow />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function TableFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Input />
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Activos</SelectItem>
          <SelectItem value="dark">Expirados</SelectItem>
          <SelectItem value="system">Todos</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Materia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Matemáticas</SelectItem>
          <SelectItem value="dark">Ciencias</SelectItem>
          <SelectItem value="system">Biología</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function EventRow() {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <EventRowHeader />
      </TableCell>
      <TableCell className="font-semibold text-nowrap">
        Prueba potencias
      </TableCell>
      <TableCell className="hidden lg:table-cell text-nowrap">
        Potencias de base y exponente entero, Multiplicación y división de
        potencias
      </TableCell>
      <TableCell className="hidden lg:table-cell text-right">
        17/04/2025 12:30hrs
      </TableCell>
      <TableCell className="hidden lg:table-cell text-right">
        17/04/2025 10:30hrs
      </TableCell>
      <TableCell className="lg:hidden text-right">
        <EventDetailsButton />
      </TableCell>
    </TableRow>
  );
}

function EventDetailsButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles evento : Prueba potencias</DialogTitle>
        </DialogHeader>
        <div>
          <EventRowHeader />
          <Spacer size="5xs" />
          <div className="text-lg">Prueba potencias</div>
          <div className="text-muted-foreground">
            Potencias de base y exponente entero, Multiplicación y división de
            potencias
          </div>
          <Spacer size="4xs" />
          <div className="flex justify-between text-sm  gap-2">
            <div className="flex justify-center flex-col items-center ">
              <div className="text-muted-foreground">Agendado para: </div>
              <div className="flex gap-2  font-bold">
                <Calendar size={18} /> 17/04/2025 12:30hrs
              </div>
            </div>
            <div className="flex justify-center flex-col items-center ">
              <div className="text-muted-foreground">Creado el: </div>
              <div className="flex gap-2 font-bold">
                <Clock size={18} />
                17/04/2025 10:30hrs
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EventRowHeader() {
  return <Badge>Matemáticas</Badge>;
}

function EventCard(event) {
  return (
    <div
      onClick={() => setIsOpen((open) => !open)}
      className="transition-all bg-card py-2 px-4 rounded border border-l-8 border-l-red-300 flex items-center justify-between text-nowrap max-w-2xl text-ellipsis "
    >
      <div className="min-w-0">
        <div className="text-muted-foreground text-sm">Matemáticas</div>
        <div className="text-lg">Prueba potencias</div>
        <div className="text-muted-foreground  overflow-hidden text-ellipsis whitespace-nowrap">
          Potencias de base y exponente entero Multiplicacion y division de
          potencias.
        </div>
      </div>
      <div className="flex-shrink-0">12:30 hrs</div>
    </div>
  );
}
