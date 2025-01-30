import { ResponsiveOutletModal } from "@/components/responsive-outlet-modal.jsx";
/* import { TitleBar } from "@/components/title-bar.jsx"; */
import { EventDetailList } from "../../student/components/EventDetailList";
import { useLoaderData } from "react-router-dom";

export default function CourseEvents() {

  /* return (
    <>
      <TitleBar title="Eventos" />      
    </>
  ); */

  const { events/* , user  */} = useLoaderData();


const baseClasses ="select-none justify-center flex justify-center items-center rounded hover:ring-2  hover:ring-primary cursor-pointer transition-all duration-300 border w-[11rem] md:w-[11rem] shadow text-foreground";

  return (
    <div className="px-4 sm:px-8 sm:pt-10 md:pt-10 ">
      <h2 className="pt-4 text-3xl pb-10">Eventos</h2>

      {/* BOTON AGREGAR EVENTO */}      
      <div className="">
        <ResponsiveOutletModal
          to={"create-event"}
          trigger={
            <div className={`${baseClasses} px-2.5 py-1.5 bg-primary text-foreground flex flex-row items-center gap-2`}>
              <p className="text-2xl">+</p>
              <h3>Agregar Evento</h3>
            </div>
          }
          title={"Nuevo anuncio"}
          titleClassName="bg-card text-xl font-normal pb-3"
          contentClassName="bg-card"
        />
      </div>

      {/* LISTA DE EVENTOS */}
      <div className="">
        <h3 className="py-7 text-2xl">Próximos eventos</h3>
        <EventDetailList events={events} cardClassName="md:w-[670px]" />
      </div>
    </div>
  );
}
