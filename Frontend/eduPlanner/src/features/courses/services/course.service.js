import { dummyCourseData } from "../constant/dummy-course-data.js";
import { dummyCoursesList } from "../constant/dummy-courses-list.js";
import { dummyScheduleData } from "../constant/dummy-schedule-data.js";

export const courseService = {
  getAllCourses: async () => {
    return dummyCoursesList;
  },
  getCourseDetails: async (courseId) => {
    return dummyCourseData;
  },

  getCourseSchedule: async (courseId) => {
    return dummyScheduleData;
  },
};
