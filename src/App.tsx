import { useRef } from "react";
import About from "./components/About";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Services from "./components/Services";
import "./styles/App.scss";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  return (
    <div className="app" ref={appRef}>
      <Header />
      <Landing appRef={appRef} />
      <About appRef={appRef} />
      <Services appRef={appRef} />
    </div>
  );
}

export default App;
