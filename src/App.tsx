import "./App.css";
import { Typography } from "antd";
import Body from "./components/Body";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-title">
      <Typography.Title align="left">Task Management App</Typography.Title>
      </header>
      <Body />
    </div>
  );
};

export default App;
