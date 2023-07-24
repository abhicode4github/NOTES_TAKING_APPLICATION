import logo from "./logo.svg";
import "./App.css";
import { NotePage } from "./modules/notes/pages/NotePage";
import { DashBoard } from "./modules/dashboard/pages/DashBoard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./shared/store/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DashBoard />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
