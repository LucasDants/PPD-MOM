
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { socket } from "@/services/socket"
import { devicesAtom } from "@/store"
import dayjs from 'dayjs'
import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { generateMockMeasure } from "../utils/generateMockMeasure"
import { Alert } from "./Alerts"
import { CardDescription } from "./ui/card"

type LastMeasure = {
  measure: number
  date: Date
}

export type DeviceData = {
  id: number
  name: string
  measureType: string
  measureIntervalInSeconds: number
  maxSafeMeasure: number
  minSafeMeasure: number
  isOnline: boolean
}

type DeviceProps = {
  data: DeviceData
}

export function Device({ data }: DeviceProps) {
  const [lastMeasure, setLastMeasure] = useState<LastMeasure | null>(null)
  const setDevices = useSetAtom(devicesAtom)

  const { id, name, measureType, maxSafeMeasure, measureIntervalInSeconds, minSafeMeasure, isOnline } = data

  function onToggleOnline() {
    setDevices((prev) => prev.map((device) => {
      if (device.id === id) {
        return {
          ...device,
          isOnline: !device.isOnline
        }
      }

      return device
    }))
  }

  useEffect(() => {
    if (isOnline) {
      const intervalId = setInterval(() => {
        const measure = generateMockMeasure(minSafeMeasure, maxSafeMeasure)
        setLastMeasure({ measure, date: new Date() })
        console.log(measure)
        if (measure > maxSafeMeasure || measure < minSafeMeasure) {
          const alert: Alert = {
            deviceId: id,
            deviceName: name,
            measure,
            measureType,
            date: new Date()
          }
          console.log("emit")
          socket.emit("alert", alert)
        }
      }, measureIntervalInSeconds * 1000);


      return () => clearInterval(intervalId)
    }
  }, [isOnline, maxSafeMeasure, minSafeMeasure, measureIntervalInSeconds, id, name, measureType])

  return (
    <Card className="max-w-[400px] h-fit">
      <CardHeader>
        <CardTitle>{id} - {name}</CardTitle>
        <CardDescription>Esse equipamento mede {measureType}. Seus valores de funcionamento padrão estão entre {minSafeMeasure} {measureType} e {maxSafeMeasure} {measureType}.</CardDescription>
      </CardHeader>
      <CardContent>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Última Medição</Label>
            <p className="text-sm text-muted-foreground">
              {lastMeasure != null ? `[${dayjs(lastMeasure.date).format("DD/MM/YYYY HH:mm:ss")}] ${lastMeasure?.measure} ${measureType}` : "Sem medições realizadas"}
            </p>
          </div>
        </div>

      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className={isOnline ? "bg-green-600" : "bg-destructive"}
          size="sm"
          onClick={onToggleOnline}
        >
          {isOnline ? "Online" : "Offline"}
        </Button>
      </CardFooter>
    </Card>
  )
}
