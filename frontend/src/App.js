import { useEffect, useState } from "react";
import MidiOutput from "./components/MidiOutput";
import OscInput from "./components/OscInput";
import { WebMidi } from "webmidi";

import Slider from "@mui/material/Slider";
import useStore from "../src/store"

function App() {
  useEffect(() => {
    window.electronApi.receive("osc", (data) => {
      console.log(data);
    });
  });
  const output = useStore(state => state.output)
  const [value, setValue] = useState(0);
  const onValueChange = (event, value) => {
    console.log(value);
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
