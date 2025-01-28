import { dummyEvents} from "../constant/dummy-events-data";

export const calendarService = {
  getEvents: async () => {
    return dummyEvents;
  },
};