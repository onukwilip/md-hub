import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Services from "./components/Services";
import "./styles/App.scss";
import Contact from "./components/Contact";
import Loader from "./components/Loader";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (document.readyState === "complete") handleLoading();

    window.addEventListener("load", handleLoading);

    return () => {
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      <Header appRef={appRef} />
      <div className="app" ref={appRef}>
        <Landing appRef={appRef} />
        <About appRef={appRef} />
        <Services appRef={appRef} />
        <Contact appRef={appRef} />
      </div>
    </>
  );
}

export default App;
