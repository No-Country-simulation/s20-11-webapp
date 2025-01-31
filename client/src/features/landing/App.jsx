import "@/App.css";
import ImagenPrincipal from "@/assets/ImagenPrincipal.png";
import Head from "@/assets/head.svg";
import Student from "@/assets/student.png";
import "@/index.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { requireAnonymous } from "../auth/services/auth.service";
import { AdminFeatures } from "./components/admin-features";
import { ScheduleSection } from "./components/schedule-section";

export async function loader() {
  await requireAnonymous();
}

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <StudentSection />
      <ScheduleSection />
      <AdminFeatures />
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <div
      className="p-20 h-[600px] w-full bg-cover bg-center flex flex-row justify-between items-center"
      style={{ backgroundImage: `url(${ImagenPrincipal})` }}
    >
      <h1 className="text-white w-[523px] text-5xl">
        Educplanner: La plataforma definitiva para la gestión escolar
      </h1>
      {/* <Login classNameMas="lg:!pt-0 !pt-0 w-[381px] !bg-card !rounded-md" /> */}
      <Outlet />
    </div>
  );
}

function Features() {
  return (
    <div className="mt-10 bg-muted dark:bg-muted/20 py-8 w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold text-primary pb-10">
        Dos roles, una solución
      </h2>
      <div className="flex flex-row gap-[100px] p-20">
        <div>
          <h4 className="text-xl font-semibold">Estudiante</h4>
          <p className="w-[300px]">
            Accede a tu horario semanal y mensual, visualiza los eventos
            importantes, recibe notificaciones, y gestiona tu perfil personal.
          </p>
        </div>
        <img src={Head} alt="" className="w-[195px] h-[195px]" />
        <div>
          <h4 className="text-xl font-semibold">Administrador</h4>
          <p className="w-[300px]">
            Gestiona el calendario académico completo, crea y publica eventos,
            gestiona estudiantes y profesores. Tiene control sobre el horario,
            materias y estudiantes, facilitando la administración diaria del
            centro educativo.
          </p>
        </div>
      </div>
    </div>
  );
}

function StudentSection() {
  return (
    <>
      <h2 className="text-4xl font-semibold text-primary pt-24 pb-12 pl-20">
        Interfaz del Estudiante: Organizada e Intuitiva
      </h2>
      <div className="flex pl-44 items-center gap-48">
        <p className="text-2xl w-[478px]">
          Visualiza tu horario semanal y mensual, con eventos importantes
          marcados. No te pierdas ni una clase o entrega, mantente al tanto de
          las actividades importantes.
        </p>
        <img src={Student} alt="" className="w-[602px] h-[300px]" />
      </div>
    </>
  );
}
