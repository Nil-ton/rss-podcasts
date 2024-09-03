import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import App from "./app";
import Layout from "./layout";

export const RouterProvider = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<App />} />
            </Route>
        </Routes>
    </Router>
}