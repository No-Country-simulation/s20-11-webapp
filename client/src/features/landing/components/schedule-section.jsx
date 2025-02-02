import Compu from "@/assets/Compu.png";

const features = [
  "Visualiza tu horario semanal de clases de forma clara y concisa.",
  "Mantente al tanto de tus responsabilidades académicas.",
  "Planifica tus actividades y asegúrate de no perderte ninguna clase.",
];

export function ScheduleSection() {
  return (
    <>
      <h2 className="text-3xl md:text-4xl text-center md:text-start font-semibold text-primary px-4 md:px-0 pt-10 pb-8 md:pt-24 md:pb-12 md:pl-20">
        Horario semanal: Siempre a tiempo
      </h2>
      <div className="bg-muted mx-0 md:mx-20 flex flex-col md:flex-row gap-10 md:gap-[100px] items-center md:pr-[30px] pb-8 md:pb-0" >
        <img src={Compu} alt="" className="w-[383px] h-[408px]" />
        <div className="p-8 md:p-0 flex flex-col gap-8 md:gap-[50px]">
          {features.map((feature, index) => (
            <FeatureLine index={index + 1} feature={feature} />
          ))}
        </div>
      </div>
    </>
  );
}

function FeatureLine({ index, feature }) {
  return (
    <div className="flex flex-row gap-5 items-center">
      <div className="w-[45px] h-[45px] bg-gradient-to-br from-tertiary to-primary rounded-sm md:rounded-lg flex flex-row justify-center items-center p-4">
        <p className="text-white text-lg overflow-hidden text-ellipsis">{index}</p>
      </div>
      <p className="text-xl md:text-2xl">{feature}</p>
    </div>
  );
}
