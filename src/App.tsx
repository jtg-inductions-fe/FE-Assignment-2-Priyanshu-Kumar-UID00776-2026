import { RouterProvider } from 'react-router-dom';

import { appRouter } from './routes/appRouter';

const App = () => <RouterProvider router={appRouter} />;

export default App;
