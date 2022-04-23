import { useEffect, useState } from "react";
import MidiOutput from "./components/MidiOutput";
import OscInput from "./components/OscInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";
import useStore from "../src/store";
import "./style.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(24, 24, 24);
  color: rgb(192, 192, 192);
`;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const output = useStore((state) => state.output);
  const value = useStore((state) => state.value);
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    window.electronApi.receive("osc", (data) => {
      const [msg, value] = data;
      output?.channels[10].sendControlChange(1, value);
      setValue(value);
    });
  });
  const onValueChange = (event, value) => {
    output?.channels[10].sendControlChange(1, value);
    setValue(value);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {/* <OscInput></OscInput> */}
        <MidiOutput></MidiOutput>
        <Slider
          aria-label="Volume"
          value={value}
          onChange={onValueChange}
          min={0}
          max={127}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
