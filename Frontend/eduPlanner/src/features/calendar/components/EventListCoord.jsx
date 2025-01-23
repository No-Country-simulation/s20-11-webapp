import EventDetailList from "./EventDetailList";
import { useEvents } from "../../../Components/event-provider";
import { ResponsiveOutletModal } from "../../../Components/responsive-outlet-modal";

function EventListCoord() {
    
    const { events } = useEvents();
  
    const baseClasses =
    "select-none justify-center flex flex-col items-center p-2 rounded cursor-pointer w-[170px]";
    
    
   
    return (
      <div className="px-4 sm:px-8">
            <h2 className="pt-4 text-lg pb-4">Eventos</h2>
            {/* AGREGAR EVENTO */}
            <div className="">
                  <ResponsiveOutletModal
                    to={"create-event"}
                    trigger={
                      <div className={`${baseClasses} bg-primary text-white`}>
                        <h3 className="text-white">Agregar anuncio</h3>
                      </div>
                    }
                    title={"Nuevo anuncio"}
                    titleClassName="text-xl font-normal pb-3"
                  />
            </div>
            <div className="pt-2">
                <EventDetailList events={events} cardClassName="md:w-[670px]"/>
            </div>
            
    </div>
    );
  }
  
  export default EventListCoord;