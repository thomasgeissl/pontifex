import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import useStore from "../../src/store";

function MidiOutput() {
  const [outputs, setOutputs] = useState([]);
  const output = useStore((state) => state.output);
  const setOutput = useStore((state) => state.setOutput);
  useEffect(() => {
    WebMidi.enable()
      .then(() => {
        setOutputs(WebMidi.outputs);
        WebMidi.outputs[0].channels[1].sendControlChange(1, 127);
      })
      .catch((err) => console.log(err));
  }, []);
  const onOutputChange = (event) => {
    setOutput(event.target.value);
  };
  const getOutputs = () => {
    console.log(WebMidi.outputs);
    setOutputs(WebMidi.outputs);
  };
  return (
    <div>
      <Select
        value={output ? output : ""}
        label="output"
        onChange={onOutputChange}
      >
        {outputs.map((output) => {
          return (
            <MenuItem value={output} key={output._midiOutput.id}>
              {output._midiOutput.name}
            </MenuItem>
          );
        })}
      </Select>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={getOutputs}
      >
        <RefreshIcon />
      </IconButton>
    </div>
  );
}

export default MidiOutput;
