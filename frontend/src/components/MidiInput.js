import { useEffect, useState } from "react";
import { WebMidi } from "webmidi";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import useStore from "../../src/store";
import styled from "@emotion/styled";

const Container = styled.div`
  * {
    margin-left: 8px;
  }
`;

function isValidIp(str) {
  // Regular expression to check if string is a IP address
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  return regexExp.test(str);
}

function MidiInput() {
  const [inputs, setInputs] = useState([]);
  const input = useStore((state) => state.input);
  const setInput = useStore((state) => state.setInput);
  const inputChannel = useStore((state) => state.inputChannel);
  const setInputChannel = useStore((state) => state.setInputChannel);
  const oscHost = useStore((state) => state.oscHost);
  const oscOutAddress = useStore((state) => state.oscOutAddress);
  const oscOutPort = useStore((state) => state.oscOutPort);
  const setOscHost = useStore((state) => state.setOscHost);
  useEffect(() => {
    WebMidi.enable()
      .then(() => {
        setInputs(WebMidi.inputs);
        // WebMidi.outputs[0].channels[1].sendControlChange(1, 127);
      })
      .catch((err) => console.log(err));
  }, []);
  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const onChannelChange = (event) => {
    setInputChannel(event.target.value);
  };
  const onOscHostChanged = (event) => {
    const host = event.target.value;
    setOscHost(event.target.value);
    if (isValidIp(host)) {
      window.electronApi.send("setOscHost", host);
    }
  };
  const getInputs = () => {
    setInputs(WebMidi.inputs);
  };
  return (
    <Container>
      <span>midi2osc</span>
      <Select value={input ? input : ""} label="input" onChange={onInputChange}>
        {inputs.map((input) => {
          return (
            <MenuItem value={input} key={input._midiInput.id}>
              {input._midiInput.name}
            </MenuItem>
          );
        })}
      </Select>
      <IconButton color="primary" component="span" onClick={getInputs}>
        <RefreshIcon />
      </IconButton>
      <Select value={inputChannel} label="channel" onChange={onChannelChange}>
        {Array.from(Array(16).keys()).map((_, index) => {
          return (
            <MenuItem value={index + 1} key={index + 1}>
              {index + 1}
            </MenuItem>
          );
        })}
      </Select>
      <ArrowRightAltIcon></ArrowRightAltIcon>
      <TextField label="host" value={oscHost} onChange={onOscHostChanged} />
      <span>{oscOutPort}</span>
      <span>{oscOutAddress}</span>
    </Container>
  );
}

export default MidiInput;
