import React from 'react';

import OnBoarding from 'pages/OnBoarding';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OnBoarding />} />
            </Routes>
        </BrowserRouter>
    </>
);

export default App;
