import { calendarService } from "./calendar.service"
import { profileService } from "../../profile/services/profile.service"

export async function eventLoader() {
  const events = await calendarService.getEvents(); // Llamado a eventos
  const user = await profileService.getProfileInfo();  // Llamado a perfil

  return { events, user }; // Retornamos ambos
}