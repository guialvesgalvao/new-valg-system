"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import { CreateApiForm } from "../forms/create-api-form";

export function CreateApiDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <Plus size={16} />
        Create new secret
      </Button>

      <DialogContent>
        <DialogTitle>Create new secret</DialogTitle>
        <DialogDescription>
          Create a new secret to use with your API key
        </DialogDescription>
        <Separator />

        <CreateApiForm onSave={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
