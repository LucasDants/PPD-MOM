import { AddDeviceForm } from "./AddDeviceForm";
import { Alerts } from "./Alerts";
import { Separator } from "./ui/separator";

export function DeviceManager() {
  return (
    <aside className="border-r p-4 h-screen overflow-y-scroll">
      <header className="flex gap-4 sticky">
        <h1 className="text-xl font-semibold tracking-tight">Gerenciador de Equipamentos</h1>
        <AddDeviceForm />
      </header>
      <Separator className="my-4" />
      <Alerts />
    </aside>
  )
}