import {createBrowserRouter} from 'react-router-dom';
import {ChatView} from "Frontend/views/ChatView.js";

const router = createBrowserRouter([
      {path: '/', element: <ChatView/>},
]);

export default router;
