import App from "./App.jsx";
import Calendario from "./Components/Calendario.jsx";
import HomeStudent from "./Components/HomeStudent.jsx";
import Login from "./Components/Login.jsx";
import Layout from "./Components/layout/layout.jsx";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/routes/course-details.jsx";
import CourseSchedule, {
  courseScheduleLoader,
} from "./features/courses/routes/course-schedule.jsx";
import CoursesLayout from "./features/courses/routes/courses-layout.jsx";
import CoursesList from "./features/courses/routes/courses-list.jsx";
export const routes = [
  {
    element: <Layout />,
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

// <><BrowserRouter>
//       <Routes>

//         {
//           <Route
//             path="/login" element={
//               <div>
//                 <Login />
//               </div>
//             }
//           />
//         }
//         {
//           <Route
//             path="/homestudent" element={
//               <div>
//                 <HomeStudent/>
//               </div>
//             }
//           />
//         }
//         {
//           <Route
//             path="/homecoordinator" element={
//               <div>
//                 <HomeCoordinator/>
//               </div>
//             }
//           />
//         }
//         {
//           <Route
//             path="/calendar" element={
//               <div>
//                 <Calendario/>
//               </div>
//             }
//           />
//         }
//     </Routes>
//   </BrowserRouter>
