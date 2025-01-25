import { useAtomValue } from "jotai"
import { Device } from "./components/Device"
import { DeviceManager } from "./components/DeviceManager"
import { devicesAtom } from "./store"

function App() {
  const devices = useAtomValue(devicesAtom)

  return (
    <div className="flex flex-1 h-screen">
      <DeviceManager />
      <main className="grid grid-cols-4 auto-rows-min gap-4 p-4">
        {
          devices.map((device) => <Device key={device.id} data={device} />)
        }
      </main>
    </div>
  )
}

export default App
