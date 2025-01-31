import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, BookOpen, CalendarDays, Users } from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { requireAnonymous } from "./features/auth/services/auth.service";
import "./index.css";
import ImagenPrincipal from "./assets/ImagenPrincipal.png"
import Head from "./assets/head.svg"
import Student from "./assets/student.png"
import Compu from "./assets/Compu.png"
import Pencil from "./assets/Pencil.svg"
import Time from "./assets/Time.svg"
import Eventos from "./assets/Eventos.svg"
import User from "./assets/User.svg"
import Materias from "./assets/Materias.svg"
import IconHorario from "./assets/Icon-horario.svg"
import Header from "./components/layout/Header";
import Login from "./features/auth/routes/login";

export async function loader(params) {
  await requireAnonymous();
}

export default function App() {
  return (
    <>
    <Header/>
    <div className="">
      <div
        className="p-20 h-[600px] w-full bg-cover bg-center flex flex-row justify-between items-center"
        style={{ backgroundImage: `url(${ImagenPrincipal})` }}
        
      >
        <h1 className="text-white w-[523px] text-5xl">Educplanner: La plataforma definitiva para la gestión escolar</h1>
        <Login classNameMas="lg:!pt-0 !pt-0 w-[381px] bg-card !rounded-md" />
      </div>
      <div className="mt-10 bg-muted py-8 w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold text-primary pb-10">Dos roles, una solución</h2>
          <div className="flex flex-row gap-[100px] p-20">
              <div>
                <h4 className="text-xl font-semibold">Estudiante</h4>
                <p className="w-[300px]">Accede a tu horario semanal y mensual, visualiza los eventos importantes, recibe notificaciones, y gestiona tu perfil personal.</p>
              </div>
              <img src={Head} alt="" className="w-[195px] h-[195px]" />
              <div>
                <h4 className="text-xl font-semibold">Administrador</h4>
                <p className="w-[300px]">Gestiona el calendario académico completo, crea y publica eventos, gestiona estudiantes y profesores. Tiene control sobre el horario, materias y estudiantes, facilitando la administración diaria del centro educativo.</p>
              </div>
          </div>          
      </div>
          <h2 className="text-4xl font-semibold text-primary pt-24 pb-12 pl-20">Interfaz del Estudiante: Organizada e Intuitiva</h2>
          <div className="flex pl-44 items-center gap-48">
            <p className="text-2xl w-[478px]">Visualiza tu horario semanal y mensual, con eventos importantes marcados. No te pierdas ni una clase o entrega, mantente al tanto de las actividades importantes.</p>
            <img src={Student} alt="" className="w-[602px] h-[300px]" />
          </div>
          <h2 className="text-4xl font-semibold text-primary pt-24 pb-12 pl-20">Horario semanal: Siempre a tiempo</h2>
          <div className="bg-muted mx-20 flex flex-row gap-[100px] items-center pr-[30px]">
            <img src={Compu} alt="" className="w-[383px] h-[408px]" />
            <div className="flex flex-col gap-[50px]">
                <div className="flex flex-row gap-5 items-center">
                    <div className="w-[45px] h-[45px] bg-gradient-to-br from-tertiary to-primary rounded-lg flex flex-row justify-center items-center">
                      <p className="text-white text-lg">1</p>
                    </div>
                    <p className="text-2xl">Visualiza tu horario semanal de clases de forma clara y concisa.</p>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <div className="w-[45px] h-[45px] bg-gradient-to-br from-tertiary to-primary rounded-lg flex flex-row justify-center items-center">
                      <p className="text-white text-lg">2</p>
                    </div>
                    <p className="text-2xl">Mantente al tanto de tus responsabilidades académicas.</p>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <div className="w-[45px] h-[45px] bg-gradient-to-br from-tertiary to-primary rounded-lg flex flex-row justify-center items-center">
                      <p className="text-white text-lg">3</p>
                    </div>
                    <p className="text-2xl">Planifica tus actividades y asegúrate de no perderte ninguna clase.</p>
                </div>
            </div>
          </div>
          <h2 className="text-4xl font-semibold text-primary pt-24 pb-12 pl-20">Panel administrador: Control total</h2>
          <div className="flex flex-row justify-center items-center gap-[30px] p-10">
              <div className="p-[10px] bg-muted w-[450px] flex flex-row gap-[30px] items-center border border-primary rounded-md">
                  <img src={Pencil} alt="" className="w-[66px] h-[66px]" />
                  <div className="flex flex-col justify-center gap-[15px]">
                    <h4 className="text-xl font-semibold">Elige el curso</h4>
                    <p className="w-[340px] ">Accede a la información del curso que necesitas editar.</p>
                  </div>
              </div>
              <div className="p-[10px] bg-muted w-[450px] flex flex-row gap-[30px] items-center border border-primary rounded-md">
                  <img src={Time} alt="" className="w-[66px] h-[66px]" />
                  <div className="flex flex-col justify-center gap-[15px]">
                    <h4 className="text-xl font-semibold">Gestión Integral</h4>
                    <p className="w-[340px] ">Gestiona los horarios, materias, eventos y estudiantes de cada curso.</p>
                  </div>
              </div>
          </div>
          <div className="py-20 px-[80px] flex flex-row">
              <div className="p-[10px] w-[282px] flex flex-col gap-[20px] items-center justify-center ">
                  <img src={Eventos} alt="" className="w-[66px] h-[66px]" />
                  <div className="flex flex-col justify-center items-center">
                    <h4 className="text-xl font-semibold">Eventos</h4>
                    <p className="w-[200px] text-center">Crea y publica eventos para los estudiantes.</p>
                  </div>
              </div>
              <div className="p-[10px] w-[282px] flex flex-col gap-[20px] items-center justify-center ">
                  <img src={User} alt="" className="w-[66px] h-[66px]" />
                  <div className="flex flex-col justify-center items-center">
                    <h4 className="text-xl font-semibold">Estudiantes</h4>
                    <p className="w-[200px] text-center">Agrega nuevos estudiantes al curso.</p>
                  </div>
              </div>
              <div className="p-[10px] w-[282px] flex flex-col gap-[20px] items-center justify-center ">
                  <img src={IconHorario} alt="" className="w-[66px] h-[66px]" />
                  <div className="flex flex-col justify-center items-center">
                    <h4 className="text-xl font-semibold">Horario</h4>
                    <p className="w-[200px] text-center">Edita el horario semanal del curso.</p>
                  </div>
              </div>
              <div className="p-[10px] w-[282px] flex flex-col gap-[20px] items-center justify-center ">
                  <img src={Materias} alt="" className="w-[66px] h-[66px]" />
                  <div className="flex flex-col justify-center items-center">
                    <h4 className="text-xl font-semibold">Materias</h4>
                    <p className="w-[200px] text-center">Reubica Materias y Profesores</p>
                  </div>
              </div>
          </div>
    </div>
    <Footer/>
    </>
  );
}

/* function Hero() {
  return (
    <section className="py-20  text-foreground">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Gestiona tus cursos con facilidad
        </h1>
        <p className="text-xl mb-8">
          EducPlanner: La herramienta perfecta para coordinadores y profesores
        </p>
        <Link viewTransition to="/register">
          <Button size="lg" variant="primary">
            Regístrate gratis
          </Button>
        </Link>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Gestión de cursos",
    description:
      "Registra y administra fácilmente múltiples cursos con facilidad.",
    icon: BookOpen,
  },
  {
    title: "Horarios flexibles",
    description:
      "Define y ajusta los horarios de tus cursos según tus necesidades.",
    icon: CalendarDays,
  },
  {
    title: "Administra tus estudiantes",
    description:
      "Registra y gestiona a tus estudiantes de manera intuitiva y eficiente.",
    icon: Users,
  },
  {
    title: "Notificaciones",
    description:
      "Mantén a tus estudiantes informados con notificaciones instantáneas.",
    icon: Bell,
  },
];

function Features() {
  return (
    <section id="caracteristicas" className="py-20 ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Características principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "María González",
    role: "Coordinadora Académica",
    content:
      "EducPlanner ha revolucionado la forma en que gestionamos nuestros cursos. Es intuitivo y ahorra mucho tiempo.",
    avatar: "MG",
  },
  {
    name: "Carlos Rodríguez",
    role: "Profesor de Matemáticas",
    content:
      "La facilidad para crear horarios y enviar notificaciones a los estudiantes es increíble. Altamente recomendado.",
    avatar: "CR",
  },
];

function Testimonials() {
  return (
    <section id="testimonios" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lo que dicen nuestros usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} */
