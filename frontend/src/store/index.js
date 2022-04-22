import create from 'zustand'

const useStore = create(set => ({
  output: null,
  setOutput: (output) => set(state => ({ output })),
}))

export default useStore