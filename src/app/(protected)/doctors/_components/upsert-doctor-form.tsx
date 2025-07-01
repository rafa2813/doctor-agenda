import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { deleteDoctor } from "@/actions/delete-doctor";
import { upsertDoctor } from "@/actions/upsert-doctors";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctorsTable } from "@/db/schema";

import { medicalSpecialties } from "../_constants";

const formSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Nome é obrigadtório." }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória." }),
    appointmentPrice: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório." }),
    availableFromWeekDay: z.string().min(1, {
      message: "Dia inicial da semana de disponibilidade é obrigatório.",
    }),
    availableToWeekDay: z.string().min(1, {
      message: "Dia final da semana de disponibilidade é obrigatório.",
    }),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de início de disponibilidade é obrigatória." }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de término de disponibilidade é obrigatória." }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "A hora de início deve ser anterior à hora de término.",
      path: ["availableToTime"],
    },
  );

interface UpsertDoctorFormProps {
  doctor?: typeof doctorsTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertDoctorForm = ({ doctor, onSuccess }: UpsertDoctorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: doctor?.name ?? "",
      specialty: doctor?.specialty ?? "",
      appointmentPrice: doctor?.appointmentPriceInCents
        ? doctor.appointmentPriceInCents / 100
        : 0,
      availableFromWeekDay: doctor?.availableFromWeekDay?.toString() ?? "1",
      availableToWeekDay: doctor?.availableToWeekDay?.toString() ?? "5",
      availableFromTime: doctor?.availableFromTime ?? "",
      availableToTime: doctor?.availableToTime ?? "",
    },
  });

  const upsertDoctorAction = useAction(upsertDoctor, {
    onSuccess: () => {
      toast.success("Médico adicionado com sucesso");
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao adicionar médico");
    },
  });

  const handleDeleteDoctorClick = () => {
    if (!doctor) return;
    deleteDoctorAction.execute({ id: doctor.id });
  };

  const deleteDoctorAction = useAction(deleteDoctor, {
    onSuccess: () => {
      toast.success("Médico deletado com sucesso.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao deletar médico.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertDoctorAction.execute({
      ...values,
      id: doctor?.id,
      appointmentPriceInCents: values.appointmentPrice * 100,
      availableFromWeekDay: parseInt(values.availableFromWeekDay),
      availableToWeekDay: parseInt(values.availableToWeekDay),
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{doctor ? doctor.name : "Adicionar médico"}</DialogTitle>
        <DialogDescription>
          {doctor
            ? "Edite as informações desse médico."
            : "Adicione um novo médico."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Input Nome do Médico */}
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

          {/* Input Especialidade */}
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Especialidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalSpecialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Preço da Consulta */}
          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço da consulta</FormLabel>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  customInput={Input}
                  prefix="R$"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Dia Inicial da Semana de Disponibilidade */}
          <FormField
            control={form.control}
            name="availableFromWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia inicial da semana de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Segunda-feira</SelectItem>
                    <SelectItem value="2">Terça-feira</SelectItem>
                    <SelectItem value="3">Quarta-feira</SelectItem>
                    <SelectItem value="4">Quinta-feira</SelectItem>
                    <SelectItem value="5">Sexta-feira</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                    <SelectItem value="7">Domingo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Dia Final da Semana de Disponibilidade */}
          <FormField
            control={form.control}
            name="availableToWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia final da semana de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Segunda-feira</SelectItem>
                    <SelectItem value="2">Terça-feira</SelectItem>
                    <SelectItem value="3">Quarta-feira</SelectItem>
                    <SelectItem value="4">Quinta-feira</SelectItem>
                    <SelectItem value="5">Sexta-feira</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                    <SelectItem value="7">Domingo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Hora de Início de Disponibilidade */}
          <FormField
            control={form.control}
            name="availableFromTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de início de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma hora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Manhã</SelectLabel>
                      <SelectItem value="08:00:00">08:00</SelectItem>
                      <SelectItem value="08:30:00">08:30</SelectItem>
                      <SelectItem value="09:00:00">09:00</SelectItem>
                      <SelectItem value="09:30:00">09:30</SelectItem>
                      <SelectItem value="10:00:00">10:00</SelectItem>
                      <SelectItem value="10:30:00">10:30</SelectItem>
                      <SelectItem value="11:00:00">11:00</SelectItem>
                      <SelectItem value="11:30:00">11:30</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Tarde</SelectLabel>
                      <SelectItem value="12:00:00">12:00</SelectItem>
                      <SelectItem value="12:30:00">12:30</SelectItem>
                      <SelectItem value="13:00:00">13:00</SelectItem>
                      <SelectItem value="13:30:00">13:30</SelectItem>
                      <SelectItem value="14:00:00">14:00</SelectItem>
                      <SelectItem value="14:30:00">14:30</SelectItem>
                      <SelectItem value="15:00:00">15:00</SelectItem>
                      <SelectItem value="15:30:00">15:30</SelectItem>
                      <SelectItem value="16:00:00">16:00</SelectItem>
                      <SelectItem value="16:30:00">16:30</SelectItem>
                      <SelectItem value="17:00:00">17:00</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Noite</SelectLabel>
                      <SelectItem value="18:00:00">18:00</SelectItem>
                      <SelectItem value="18:30:00">18:30</SelectItem>
                      <SelectItem value="19:00:00">19:00</SelectItem>
                      <SelectItem value="19:30:00">19:30</SelectItem>
                      <SelectItem value="20:00:00">20:00</SelectItem>
                      <SelectItem value="20:30:00">20:30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input Hora de Término de Disponibilidade */}
          <FormField
            control={form.control}
            name="availableToTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de término de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma hora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Manhã</SelectLabel>
                      <SelectItem value="08:00:00">08:00</SelectItem>
                      <SelectItem value="08:30:00">08:30</SelectItem>
                      <SelectItem value="09:00:00">09:00</SelectItem>
                      <SelectItem value="09:30:00">09:30</SelectItem>
                      <SelectItem value="10:00:00">10:00</SelectItem>
                      <SelectItem value="10:30:00">10:30</SelectItem>
                      <SelectItem value="11:00:00">11:00</SelectItem>
                      <SelectItem value="11:30:00">11:30</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Tarde</SelectLabel>
                      <SelectItem value="12:00:00">12:00</SelectItem>
                      <SelectItem value="12:30:00">12:30</SelectItem>
                      <SelectItem value="13:00:00">13:00</SelectItem>
                      <SelectItem value="13:30:00">13:30</SelectItem>
                      <SelectItem value="14:00:00">14:00</SelectItem>
                      <SelectItem value="14:30:00">14:30</SelectItem>
                      <SelectItem value="15:00:00">15:00</SelectItem>
                      <SelectItem value="15:30:00">15:30</SelectItem>
                      <SelectItem value="16:00:00">16:00</SelectItem>
                      <SelectItem value="16:30:00">16:30</SelectItem>
                      <SelectItem value="17:00:00">17:00</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Noite</SelectLabel>
                      <SelectItem value="18:00:00">18:00</SelectItem>
                      <SelectItem value="18:30:00">18:30</SelectItem>
                      <SelectItem value="19:00:00">19:00</SelectItem>
                      <SelectItem value="19:30:00">19:30</SelectItem>
                      <SelectItem value="20:00:00">20:00</SelectItem>
                      <SelectItem value="20:30:00">20:30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <DialogFooter>
            {doctor && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash className="h-4 w-4" />
                    Deletar médico
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja deletar este médico?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso irá deletar o médico
                      permanentemente e remover seus dados de nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteDoctorClick}
                      disabled={deleteDoctorAction.isPending}
                    >
                      Deletar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button type="submit" disabled={upsertDoctorAction.isPending}>
              {upsertDoctorAction.isPending
                ? "Salvando..."
                : doctor
                  ? "Salvar"
                  : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
