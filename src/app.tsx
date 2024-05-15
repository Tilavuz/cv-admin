import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"

// Layouts
import RootLayout from "./layouts/root-layout"

// Pages
const ErrorPage = lazy(() => import("./pages/error-page"))
const Posting = lazy(() => import("./pages/posting"))
const ProjectPage = lazy(() => import("./pages/project-page"))
import Dashboard from "./pages/dashboard"
import Loading from "./components/loading"
import { useCookies } from "react-cookie"
import Login from "./pages/login"

export default function App() {

  const [cookies] = useCookies(['accessToken'])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<Loading />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'posting',
          element: (
            <Suspense fallback={<Loading />}>
              <Posting />
            </Suspense>
          )
        },
        {
          path: "projects/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProjectPage />
            </Suspense>
          )
        }
      ]
    }
  ])

  const loginRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    }
  ])

  return <RouterProvider router={ !cookies.accessToken || cookies.accessToken === 'undefined' ? loginRouter : router } />
}
