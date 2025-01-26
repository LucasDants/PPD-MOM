import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { Device } from "./components/Device"
import { DeviceManager } from "./components/DeviceManager"
import { socket } from "./services/socket"
import { devicesAtom } from "./store"

function App() {
  const devices = useAtomValue(devicesAtom)

  useEffect(() => {
    socket.connect()

    return () => { socket.disconnect() }
  }, [])

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
