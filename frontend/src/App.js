import { useEffect, useState } from "react";
import MidiOutput from "./components/MidiOutput";
import OscInput from "./components/OscInput";

import Slider from "@mui/material/Slider";
import useStore from "../src/store";

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
    <div>
      <OscInput></OscInput>
      <MidiOutput></MidiOutput>
      <Slider
        aria-label="Volume"
        value={value}
        onChange={onValueChange}
        min={0}
        max={127}
      />
    </div>
  );
}

export default App;
