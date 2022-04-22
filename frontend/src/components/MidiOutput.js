import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useStore from "../../src/store"


function MidiOutput() {
  const [outputs, setOutputs] = useState([])
  // const [output, setOutput] = useState(null)
  const output = useStore(state => state.output)
  const setOutput = useStore(state => state.setOutput)
  useEffect(() => {
    WebMidi.enable()
      .then(() => {
        console.log("outputs", WebMidi.outputs);
        setOutputs(WebMidi.outputs)
        WebMidi.outputs[0].channels[1].sendControlChange(1, 127);
      })
      .catch((err) => console.log(err));
  }, []);
  const onOutputChange = (event) =>{
    setOutput(event.target.value)
  }
  return (
    <div>
	    midi output
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={output ? output : ""}
          label="output"
          onChange={onOutputChange}
        >
          {outputs.map(output =>{
            return <MenuItem value={output} key={output._midiOutput.id}>{output._midiOutput.name}</MenuItem>
          })}
        </Select>
    </div>
  );
}

export default MidiOutput;
