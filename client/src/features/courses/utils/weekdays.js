export const WEEKDAY_TRANSLATIONS = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export const formatClassDays = (days) => {
  const sortedDays = [...days].sort((a, b) => {
    const order = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];
    return order.indexOf(a) - order.indexOf(b);
  });
  return sortedDays.map((day) => WEEKDAY_TRANSLATIONS[day]).join(", ");
};

export const formatClassDaysToArray = (days) => {
  const sortedDays = [...days].sort((a, b) => {
    const order = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];
    return order.indexOf(a) - order.indexOf(b);
  });
  return sortedDays.map((day) => WEEKDAY_TRANSLATIONS[day]);
};
