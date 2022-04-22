import create from "zustand";

const useStore = create((set) => ({
  output: null,
  value: 0,
  setOutput: (output) => set((state) => ({ output })),
  setValue: (value) => set((state) => ({ value })),
}));

export default useStore;
