"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertPatientForm from "../_components/upsert-patient-form";

const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4" />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientForm
        isOpen={isOpen}
        onSuccess={() => {
          toast.success("Paciente adicionado com sucesso");
          setIsOpen(false);
        }}
      />
    </Dialog>
  );
};

export default AddPatientButton;
