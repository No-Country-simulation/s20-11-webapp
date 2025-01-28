import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, KeyRound, Mail, UserX } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { Spacer } from "@/components/layout/spacer.js";
import { TitleBar } from "@/components/title-bar.jsx";
import { requireAdmin } from "../../auth/services/auth.service";
import {
  REGISTER_STUDENT_INTENT,
  RegisterStudent,
  registerStudentAction,
} from "../components/register-student";
import { courseService } from "../services/course.service";
import { studentsService } from "../services/students.service";

export async function courseStudentsLoader({ params }) {
  await requireAdmin();

  const [course, students] = await Promise.all([
    courseService.getCourseDetails(params.courseId),
    studentsService.getAllStudents(params.courseId),
  ]);

  return {
    course,
    students: students.data,
  };
}

export async function courseStudentsAction({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case REGISTER_STUDENT_INTENT: {
      return registerStudentAction(formData, params.courseId);
    }
  }
  return null;
}

export default function CourseStudents() {
  const { course, students } = useLoaderData();
  return (
    <>
      <TitleBar title={`${course.name} - Alumnos`} />
      <Spacer size="3xs" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-6 ">
        <div className="col-span-1 w-full">
          <RegisterStudent courseName={course.name} />
        </div>
        <div className="col-span-2 w-full">
          <StudentsTable students={students} />
        </div>
      </div>
    </>
  );
}

function StudentsTable({ students }) {
  const parseFullName = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return firstName || lastName || null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{students.length} Alumnos registrado(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Correo Electrónico / Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium text-sm">
                  <StudentData
                    name={parseFullName(student.firstName, student.lastName)}
                    email={student.email}
                    photoUrl={student.profilePhotoThumbnail}
                  />
                </TableCell>
                <TableCell>
                  <Badge>Activo</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <StudentOptions
                    student={{
                      name: parseFullName(student.firstName, student.lastName),
                      email: student.email,
                      photoUrl: student.profilePhotoThumbnail,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StudentOptions({ student }) {
  const fallback = student?.name?.charAt(0) ?? student?.email?.charAt(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <EyeIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Acciones</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src={student.photoUrl} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="text-center text-sm">
              <p className="font-bold">{student.name}</p>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full justify-between">
            <Button>
              <KeyRound className="mr-2 h-4 w-4" />
              Reiniciar contraseña
            </Button>

            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Enviar correo
            </Button>
            <Button variant="destructive">
              <UserX className="mr-2 h-4 w-4" />
              Desactivar cuenta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StudentData({ name, email, photoUrl }) {
  const fallback = name?.charAt(0) ?? email?.charAt(0);

  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={photoUrl} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-muted-foreground">{name ?? ""}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}
