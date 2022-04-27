import { useEffect, useState } from "react";
import MidiInput from "./components/MidiInput";
import MidiOutput from "./components/MidiOutput";
import OscInput from "./components/OscInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";
import useStore from "../src/store";
import { List, ListItem } from "./components/List";
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
  const input = useStore((state) => state.input);
  const inputChannel = useStore((state) => state.inputChannel);
  const output = useStore((state) => state.output);
  const outputChannel = useStore((state) => state.outputChannel);
  const value = useStore((state) => state.value);
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    window.electronApi.receive("osc2midi", (data) => {
      const [msg, value] = data;
      output?.channels[10].sendControlChange(1, value);
      setValue(value);
    });
  });
  useEffect(() => {
    if (inputChannel) {
      input?.channels[inputChannel].addListener("noteon", (event) => {
        console.log(event);
        window.electronApi.send("midi2osc", {
          type: event.type,
          channel: inputChannel,
          note: event.note.number,
          velocity: event.rawVelocity,
        });
      });
    }
  }, [input, inputChannel]);

  const onValueChange = (event, value) => {
    if (output && outputChannel) {
      output?.channels[outputChannel].sendControlChange(1, value);
    }
    setValue(value);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {/* <OscInput></OscInput> */}
        <List>
          <ListItem>
            <MidiInput></MidiInput>
          </ListItem>
          <ListItem>
            <MidiOutput></MidiOutput>
          </ListItem>
        </List>
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
