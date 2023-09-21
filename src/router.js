import { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import Loader from './components/utility/Loader'

const routes = [
    {
        path: "/dashboard",
        exact: true,
        component: lazy(() => import("./components/Dashboard"))
    },
    {
        path: "/contacts/:country/:even",
        exact: false,
        component: lazy(() => import("./components/Dashboard/Contacts"))
    }
]

export default function Pages() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
                <Router>
                    <Routes>
                        {
                            routes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        element={<route.component />} />
                                );
                            })
                        }
                    </Routes>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}