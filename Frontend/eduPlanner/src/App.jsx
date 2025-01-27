import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, BookOpen, CalendarDays, Users } from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";
import { Button } from "./Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Components/ui/card";
import { requireAnonymous } from "./features/auth/services/auth.service";
import "./index.css";

export async function loader(params) {
  await requireAnonymous();
}

export default function App() {
  return (
    <main className="flex-grow">
      <Hero />
      <Features />
      <Testimonials />
    </main>
  );
}

function Hero() {
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
}
