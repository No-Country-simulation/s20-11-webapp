import { dummySubjects } from "../constant/dummy-subjects-data";

export const subjectService = {
  getSubjects: async () => {
    return dummySubjects;
  },
  assignSubjectToBlock: async (blockId, subjectId) => {
    console.log(`Assigned subject ${subjectId} to block ${blockId}`);
  },
};
