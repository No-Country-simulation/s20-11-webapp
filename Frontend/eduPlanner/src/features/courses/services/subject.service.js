import { dummySubjects } from "../constant/dummy-subjects-data";

export const subjectService = {
  getSubjects: async () => {
    return dummySubjects;
  },
};
