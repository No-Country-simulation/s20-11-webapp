import App from "./App.jsx";
import Calendario from "./features/student/components/Calendario.jsx";
import HomeStudent from "./Components/HomeStudent.jsx";
import HomeCoordinator from "./Components/HomeCoordinator.jsx";
import Login from "./Components/Login.jsx";
import { Error } from "./Components/layout/error.jsx";
import Layout from "./Components/layout/layout.jsx";
import AssignClass, {
  assignClassAction,
  assignClassLoader,
} from "./features/courses/routes/block-assign-class.jsx";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/routes/course-details.jsx";
import CourseSchedule, {
  courseScheduleLoader,
} from "./features/courses/routes/course-schedule.jsx";
import CoursesLayout from "./features/courses/routes/courses-layout.jsx";
import CoursesList, {
  coursesListLoader,
} from "./features/courses/routes/courses-list.jsx";
import EventListCoord from './features/student/components/EventListCoord.jsx'
import DayDetail from './features/student/components/DayDetail.jsx'
import CreateEvent, { subjectLoader } from './features/student/routes/create-event.jsx';// arreglar


import StudentLayout from "./features/student/routes/student-layout.jsx";
export const routes = [
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      /* HOME DEL COORDINADOR */
      {
        path: "/courses",
        element: <CoursesLayout />,
        children: [
          {
            index: true,
            element: <CoursesList />,
            loader: coursesListLoader,
          },
          {
            path: ":courseId",
            element: <CourseDetails />,
            loader: courseDetailsLoader,
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
            element: <EventListCoord/>, 
            children: [
              {
                path: "create-event",
                element: <CreateEvent/>,
                loader: subjectLoader,                
              },              
            ],           
          }
        ],
      },

      /* HOME DEL ESTUDIANTE */
      {
        path: "/student",
        element: <StudentLayout/>,
        children: [
          {
            index: true,
            element: <HomeStudent />,
          },
          {
            path: "calendar",
            element: <Calendario />,
          },
          {
            path: "calendar/:date",
            element: <DayDetail/>                
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
