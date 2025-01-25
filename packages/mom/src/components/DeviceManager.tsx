import { alertsAtom } from "@/store";
import { useSetAtom } from "jotai";
import { AddDeviceForm } from "./AddDeviceForm";
import { Alerts } from "./Alerts";
import { Separator } from "./ui/separator";

export function DeviceManager() {
  const setAlerts = useSetAtom(alertsAtom)

  return (
    <aside className="border-r p-4">
      <header className="flex gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Gerenciador de Equipamentos</h1>
        <AddDeviceForm />
      </header>
      <Separator className="my-4" />
      <Alerts />
    </aside>
  )
}