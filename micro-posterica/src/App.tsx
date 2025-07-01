import "./App.css";

import { Provider } from "react-redux";
import RoutesApp from "./components/auth/routes";
import store from "./app/store";

function App() {
  // Check for dark mode preference in localStorage
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";

  return (
    <div data-bs-theme={isDarkMode ? "dark" : "light"}>
      <Provider store={store}>
        <RoutesApp />
      </Provider>
    </div>
  );
}

export default App;
