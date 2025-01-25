import { alertsAtom } from "@/store";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { MessageCircleWarning } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export type Alert = {
  deviceId: number
  deviceName: string
  measure: number
  measureType: string
  date: Date
}

export function Alerts() {
  const alerts = useAtomValue(alertsAtom)

  return (
    <div className="flex flex-col-reverse justify-end border-r p-4">
      {alerts.map((alert) => (
        <Alert>
          <MessageCircleWarning className="h-4 w-4" />
          <AlertTitle>Alerta!</AlertTitle>
          <AlertDescription>
            O dispositivo {alert.deviceName} mediu {alert.measure} {alert.measureType} em {dayjs(alert.date).format("DD/MM/YYYY HH:mm:ss")}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}