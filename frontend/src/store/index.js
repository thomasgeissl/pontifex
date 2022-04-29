import create from "zustand";

const useStore = create((set) => ({
  input: null,
  inputChannel: 11,
  oscHost: "127.0.0.1",
  oscOutPort: 9020,
  oscOutAddress: "/kls/io/midi2osc",
  output: null,
  outputChannel: 10,
  value: 0,
  setInput: (input) => set((state) => ({ input })),
  setInputChannel: (inputChannel) => set((state) => ({ inputChannel })),
  setOscHost: (oscHost) => set((state) => ({ oscHost })),
  setOutput: (output) => set((state) => ({ output })),
  setOutputChannel: (outputChannel) => set((state) => ({ outputChannel })),
  setValue: (value) => set((state) => ({ value })),
}));

export default useStore;
