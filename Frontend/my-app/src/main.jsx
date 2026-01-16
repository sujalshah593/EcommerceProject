import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { AuthProvider } from "./context/AuthContext";
import TruckLoader from "./components/TruckLoader.jsx";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <TruckLoader />
        </div>
      }
    >
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
