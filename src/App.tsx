
import  {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from "./screen/Homepage"
import SearchResultPage from "./screen/SearchResultPage"
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Homepage />
    },
    {
      path:"/search",
      element:<SearchResultPage />
    }
  ])
  return (
    <RouterProvider  router={router} />
  )
}

export default App
