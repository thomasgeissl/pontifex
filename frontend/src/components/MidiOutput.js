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
  const outputChannel = useStore((state) => state.outputChannel);
  const setOutputChannel = useStore((state) => state.setOutputChannel);
  useEffect(() => {
    WebMidi.enable()
      .then(() => {
        setOutputs(WebMidi.outputs);
      })
      .catch((err) => console.log(err));
  }, []);
  const onOutputChange = (event) => {
    setOutput(event.target.value);
  };
  const onChannelChange = (event) => {
    setOutputChannel(event.target.value);
  };
  const getOutputs = () => {
    console.log(WebMidi.outputs);
    setOutputs(WebMidi.outputs);
  };
  return (
    <div>
      osc2midi
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
      <Select value={outputChannel} label="channel" onChange={onChannelChange}>
        {Array.from(Array(16).keys()).map((_, index) => {
          return (
            <MenuItem value={index + 1} key={index + 1}>
              {index + 1}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

export default MidiOutput;
