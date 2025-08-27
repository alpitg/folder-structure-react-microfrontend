import "./App.css";

import { Provider } from "react-redux";
import RoutesApp from "./routes/routes";
import store from "./app/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RoutesApp />
      </Provider>
    </div>
  );
}

export default App;
