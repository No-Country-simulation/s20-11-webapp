import HomeStudent from "./components/HomeStudent.jsx";
import { Error } from "./components/layout/error.jsx";
import Layout from "./components/layout/layout.jsx";
import Login, {
  loginAction,
  loginLoader,
} from "./features/auth/routes/login.jsx";
import { logoutAction, logoutLoader } from "./features/auth/routes/logout.jsx";
import Register, {
  registerAction,
  registerLoader,
} from "./features/auth/routes/register.jsx";
import AssignClass, {
  assignClassAction,
  assignClassLoader,
} from "./features/courses/routes/block-assign-class.jsx";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/routes/course-details.jsx";
import CourseEvents, {
  courseEventsLoader,
} from "./features/courses/routes/course-events.jsx";
import CourseSchedule, {
  courseScheduleLoader,
} from "./features/courses/routes/course-schedule.jsx";
import CourseStudents, {
  courseStudentsAction,
  courseStudentsLoader,
} from "./features/courses/routes/course-students.jsx";
import CourseSubjects, {
  courseSubjectsAction,
  courseSubjectsLoader,
} from "./features/courses/routes/course-subjects.jsx";
import CreateCourseRoute, {
  createCourseAction,
  createCourseLoader,
} from "./features/courses/routes/courses-create.jsx";
import CoursesLayout, {
  coursesLayoutLoader,
} from "./features/courses/routes/courses-layout.jsx";
import CoursesList, {
  coursesListLoader,
} from "./features/courses/routes/courses-list.jsx";
import App, { loader } from "./features/landing/App.jsx";
import Profile, { profileLoader } from "./features/profile/routes/profile.jsx";
import Calendario from "./features/student/components/Calendario.jsx";
import DayDetail from "./features/student/components/DayDetail.jsx";
import CreateEvent, {
  subjectLoader,
} from "./features/student/routes/create-event.jsx"; // arreglar

import StudentLayout, {
  studentLayoutLoader,
} from "./features/student/routes/student-layout.jsx";
import { eventLoader } from "./features/student/services/eventLoader.js";
export const routes = [
  {

  
    path: "/",
    element: <App />,

    errorElement: <Error />,
    loader: loader,
    children: [
      {

        index: true,
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
    ],
  },
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/logout",
        action: logoutAction,
        loader: logoutLoader,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
        loader: registerLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader,
      },

      /* HOME DEL COORDINADOR */
      {
        path: "/courses",
        element: <CoursesLayout />,
        loader: coursesLayoutLoader,
        children: [
          {
            path: "", // En lugar de INDEX, uso un path vacio para no tomar el outlet por defecto
            element: <CoursesList />,
            loader: coursesListLoader,
            children: [
              {
                path: "create",
                element: <CreateCourseRoute />,
                action: createCourseAction,
                loader: createCourseLoader,
              },
            ],
          },
          {
            path: ":courseId",
            element: <CourseDetails />,
            loader: courseDetailsLoader,
          },
          {
            path: ":courseId/subjects",
            element: <CourseSubjects />,
            loader: courseSubjectsLoader,
            action: courseSubjectsAction,
          },
          {
            path: ":courseId/students",
            element: <CourseStudents />,
            loader: courseStudentsLoader,
            action: courseStudentsAction,
          },
          {
            path: ":courseId/schedule",
            element: <CourseSchedule />,
            loader: courseScheduleLoader,
            children: [
              {
                path: "assign-class/:blockId",
                element: <AssignClass />,
                loader: assignClassLoader,
                action: assignClassAction,
              },
            ],
          },
          {
            path: ":courseId/events",
            element: <CourseEvents />,
            loader: courseEventsLoader,
            children: [
              {
                path: "create-event",
                element: <CreateEvent />,
                loader: subjectLoader,
              },
            ],
          },
        ],
      },

      /* HOME DEL ESTUDIANTE */
      {
        path: "/student",
        element: <StudentLayout />,
        loader: studentLayoutLoader,
        children: [
          {
            index: true,
            element: <HomeStudent />,
            loader: eventLoader,
          },
          {
            path: "calendar",
            element: <Calendario />,
          },
          {
            path: "calendar/:date",
            element: <DayDetail />,
          },
          /* {
            path: "schedule",
            element: //Aca falta el componente de horario estudiante
          }, */
        ],
      },

      {
        path: "/schedule", // ESTO QUÉ ONDA?
        element: <CoursesLayout />,
      },
    ],
  },
];
