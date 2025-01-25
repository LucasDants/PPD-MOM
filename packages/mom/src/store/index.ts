import { Alert } from '@/components/Alerts'
import { DeviceData } from '@/components/Device'
import { atom } from 'jotai'

export const devicesAtom = atom<DeviceData[]>([])

export const alertsAtom = atom<Alert[]>([])