import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Layout from "../pages/Layout";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Landing/>
            }
        ]
    },
    {
        path:"*",
        element:(
            <>
                <h1>404 Page not found</h1>
            </>
        )
    }
])

export default router;