import { dummyCourseData } from "../constant/dummy-course-data.js";
import { dummyScheduleData } from "../constant/dummy-schedule-data.js";


export const courseService = {
  getCourseDetails: async (courseId) => {
    return dummyCourseData;
  },

  getCourseSchedule: async (courseId) => {
    return dummyScheduleData;
  },
};
