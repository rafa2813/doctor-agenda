"use client";

import { MailIcon, PhoneIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);
  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">{patient.email}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline" className="flex items-center gap-1">
          <MailIcon className="h-4 w-4" />
          {patient.email}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <PhoneIcon className="h-4 w-4" />
          {patient.phoneNumber}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          {patient.sex === "male" ? (
            <User2Icon className="h-4 w-4" />
          ) : (
            <User2Icon className="h-4 w-4" />
          )}
          {patient.sex === "male" ? "Masculino" : "Feminino"}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-2">
        <Dialog
          open={isUpsertPatientDialogOpen}
          onOpenChange={setIsUpsertPatientDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <DialogContent>
            <UpsertPatientForm
              isOpen={isUpsertPatientDialogOpen}
              patient={patient}
              onSuccess={() => {
                toast.success("Paciente atualizado com sucesso");
                setIsUpsertPatientDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
