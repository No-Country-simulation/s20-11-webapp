import Eventos from "@/assets/Eventos.svg";
import IconHorario from "@/assets/Icon-horario.svg";
import Materias from "@/assets/Materias.svg";
import Pencil from "@/assets/Pencil.svg";
import Time from "@/assets/Time.svg";
import User from "@/assets/User.svg";

const adminFeatures = [
  {
    icon: Eventos,
    title: "Eventos",
    description: "Crea y publica eventos para los estudiantes.",
  },
  {
    icon: User,
    title: "Estudiantes",
    description: "Agrega nuevos estudiantes al curso.",
  },
  {
    icon: IconHorario,
    title: "Horario",
    description: "Edita el horario semanal del curso.",
  },
  {
    icon: Materias,
    title: "Materias",
    description: "Reubica Materias y Profesores.",
  },
];

const adminCards = [
  {
    img: Pencil,
    title: "Elige el curso",
    description: "Accede a la información del curso que necesitas editar.",
  },
  {
    img: Time,
    title: "Gestión Integral",
    description:
      "Gestiona los horarios, materias, eventos y estudiantes de cada curso.",
  },
];

export function AdminFeatures() {
  return (
    <div className="z-10 container mx-auto flex flex-col">
      <h2 className="text-3xl md:text-4xl lg:text-4xl text-center lg:text-start font-semibold text-primary px-4 pt-10 md:pt-20 lg:pt-24 pb-6 lg:pb-12">
        Panel administrador: Control total
      </h2>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-[30px] p-2 lg:p-10">
        {adminCards.map((card) => (
          <AdminCard key={card.title} {...card} />
        ))}
      </div>
      <div className="py-20 px-6 lg:px-[60px] flex flex-row justify-center flex-wrap gap-8 lg:gap-0">
        {adminFeatures.map((feat) => (
          <AdminFeature key={feat.title} {...feat} />
        ))}
      </div>
    </div>
  );
}

function AdminCard({ img, title, description }) {
  return (
    <div className="p-[20px] bg-muted w-[320px] md:w-[450px] flex flex-row gap-[30px] items-center border border-primary rounded-lg">
      <img src={img} alt="" className="w-[40px] h-[40px] md:w-[66px] md:h-[66px]" />
      <div className="flex flex-col justify-center gap-[10px] lg:gap-[15px]">
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="w-[230px] md:w-[340px] ">{description}</p>
      </div>
    </div>
  );
}

function AdminFeature({ icon, title, description }) {
  return (
    <div className="p-[10px] w-[282px] flex flex-col gap-[20px] items-center justify-center ">
      <img src={icon} alt="" className="w-[66px] h-[66px]" />
      <div className="flex flex-col justify-center items-center">
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="w-[200px] text-center">{description}</p>
      </div>
    </div>
  );
}
