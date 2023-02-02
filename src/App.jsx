import React from "react";
import "./App.css";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import { DogsProvider } from "./providers/DogList";

function App() {
  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <DogsProvider>
        <Section label={"Dogs: "}>
          <Dogs />
        </Section>
      </DogsProvider>
    </div>
  );
}

export default App;
