import Nav from "../components/Nav"
import Detail from "../views/Detail"
import Home from "../views/Home"
import {createBrowserRouter} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,

    },
    {
        element : <Nav/>,
        children: [
            {
                path: '/detail/:id',
                element : <Detail/>,

            }
        ]
    }

])

export default router
