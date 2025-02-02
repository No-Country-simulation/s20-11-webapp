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
    <section className="min-h-[calc(100vh-75px)]">
      <Header/>       
      <Hero/>
      <div id="login-mobile" className="md:hidden p-8 sm:px-32">
          <Outlet/>
      </div>
      <Features/>
      <StudentSection/>
      <ScheduleSection/>
      <AdminFeatures/>
      {/* <Footer/> */}
    </section>    
  );
}

function Hero() {
  return (
    <>
        <div id="mobile-y-tablet"
          className="md:hidden p-4 h-[250px] sm:h-[300px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${ImagenPrincipal})` }}
        >
          <h1 className="text-white w-[300px] sm:w-[400px] text-2xl sm:text-3xl  mt-24" >
            Educplanner: La plataforma definitiva para la gestión escolar
          </h1>          
        </div>
        
        <div id="desktop"
        className="hidden md:p-20 md:h-[600px] md:min-h-[calc(100vh-75px)] md:w-full md:bg-cover md:bg-center md:flex md:flex-row md:justify-between md:items-center"
        style={{ backgroundImage: `url(${ImagenPrincipal})` }}
      >
        <h1 className="text-white w-[523px] text-5xl">
          Educplanner: La plataforma definitiva para la gestión escolar
        </h1>        
        <Outlet/>
      </div>
  </>
  );
}

function Features() {
  return (
    <div className="mt-2 md:mt-10 bg-muted py-8 w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-primary pb-6 md:pb-10">
        Dos roles, una solución
      </h2>
      <div className="p-4 md:p-20 flex flex-col gap-8 md:flex-row md:gap-[100px] items-center">
        <div>
          <h4 className="text-center md:text-start text-xl font-semibold">Estudiante</h4>
          <p className="text-center md:text-start text-xl md:text-base w-[320px] sm:w-[450px] md:w-[300px]">
            Accede a tu horario semanal y mensual, visualiza los eventos
            importantes, recibe notificaciones, y gestiona tu perfil personal.
          </p>
        </div>
        <img src={Head} alt="" className="w-[195px] h-[195px]" />
        <div>
          <h4 className="text-center md:text-start text-xl font-semibold">Administrador</h4>
          <p className="text-center md:text-start text-xl md:text-base w-[320px] sm:w-[450px] md:w-[300px]">
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
      <h2 className="text-center md:text-start text-3xl md:text-4xl font-semibold text-primary pt-10 pb-8 md:pt-24 md:pb-12 md:pl-20">
        Interfaz del Estudiante: Organizada e Intuitiva
      </h2>
      <div className="flex flex-col md:flex-row md:pl-44 justify-center items-center gap-8 md:gap-36">
        <p className="text-center md:text-start text-xl md:text-xl w-[320px] sm:w-[478px] md:w-[600px]">
          Visualiza tu horario semanal y mensual, con eventos importantes
          marcados. No te pierdas ni una clase o entrega, mantente al tanto de
          las actividades importantes.
        </p>
        <img src={Student} alt="" className="w-[360px] sm:w-[602px] sm:h-[300px]" />
      </div>
    </>
  );
}
