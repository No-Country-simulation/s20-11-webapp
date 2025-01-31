import Compu from "@/assets/Compu.png";

const features = [
  "Visualiza tu horario semanal de clases de forma clara y concisa.",
  "Mantente al tanto de tus responsabilidades académicas.",
  "Planifica tus actividades y asegúrate de no perderte ninguna clase.",
];

export function ScheduleSection() {
  return (
    <>
      <h2 className="text-4xl font-semibold text-primary pt-24 pb-12 pl-20">
        Horario semanal: Siempre a tiempo
      </h2>
      <div className="bg-muted dark:bg-muted/20 mx-20 flex flex-row gap-[100px] items-center pr-[30px]">
        <img src={Compu} alt="" className="w-[383px] h-[408px]" />
        <div className="flex flex-col gap-[50px]">
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
      <div className="w-[45px] h-[45px] bg-gradient-to-br from-tertiary to-primary rounded-lg flex flex-row justify-center items-center">
        <p className="text-white text-lg">{index}</p>
      </div>
      <p className="text-2xl">{feature}</p>
    </div>
  );
}
