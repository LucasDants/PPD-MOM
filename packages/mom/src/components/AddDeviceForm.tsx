import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { devicesAtom } from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSetAtom } from "jotai"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nome do equipamento deve ter pelo menos 3 caracteres",
  }),
  measureType: z.string().min(1, "Tipo de medida é obrigatório"),
  measureIntervalInSeconds: z.string().min(1, "Valor de intervalo é obrigatório").transform((value) => Number(value)),
  maxSafeMeasure: z.string().min(1, "Valor máximo da medida é obrigatório").transform((value) => Number(value)),
  minSafeMeasure: z.string().min(1, "Valor mínimo da medida é obrigatório").transform((value) => Number(value)),
  isOnline: z.boolean().default(false),
})

export function AddDeviceForm() {
  const [isOpen, setIsOpen] = useState(false)
  const deviceId = useRef(0)
  const setDevices = useSetAtom(devicesAtom)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isOnline: false,
    },
  })

  function handleToggleOpen() {
    setIsOpen((prev) => !prev)
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    setDevices((prev) => [...prev, { ...data, id: deviceId.current++ }])
    handleToggleOpen()
    form.reset()
  }

  return (
    <Sheet open={isOpen} onOpenChange={open => setIsOpen(open)}>

      <Button variant="outline" size="sm" onClick={handleToggleOpen}>+</Button>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Equipamento</SheetTitle>
        </SheetHeader>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="measureType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medida</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="measureIntervalInSeconds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intervalo de medições (segundos)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minSafeMeasure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medida mínima</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="maxSafeMeasure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medida Máxima</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">Adicionar</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
