import { socket } from "@/services/socket";
import { alertsAtom } from "@/store";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { MessageCircleWarning } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export type Alert = {
  deviceId: number
  deviceName: string
  measure: number
  measureType: string
  date: Date
}

export function Alerts() {
  const [alerts, setAlerts] = useAtom(alertsAtom)
  console.log(alerts)
  useEffect(() => {
    const unsubscribe = socket.on('alert', (alert) => {
      console.log("received")
      setAlerts((prev) => [...prev, alert])
    })

    return () => {
      unsubscribe.off("alert")
    }
  }, [setAlerts])

  return (
    <div className="flex flex-col-reverse flex-1 gap-y-2">
      {alerts.map((alert) => (
        <Alert key={alert.measure + String(alert.date)}>
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