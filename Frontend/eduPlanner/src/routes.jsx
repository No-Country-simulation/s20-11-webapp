import App from "./App.jsx";
import Calendario from "./Components/Calendario.jsx";
import HomeStudent from "./Components/HomeStudent.jsx";
import Login from "./Components/Login.jsx";
import { Error } from "./Components/layout/error.jsx";
import Layout from "./Components/layout/layout.jsx";
import AssignClass, {
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
                path: "assign-class",
                element: <AssignClass />,
                loader: assignClassLoader,
              },
            ],
          },
        ],
      },
      {
        path: "/homestudent",
        element: <HomeStudent />,
      },
      {
        path: "/calendar",
        element: <Calendario />,
      },
      {
        path: "/schedule",
        element: <CoursesLayout />,
      },
    ],
  },
];
