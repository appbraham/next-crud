"use client";

import { LucideSave } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";
import { Ticket, Ticketstatus } from "@/types/ticket.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { createTicket, updateTicket } from "@/app/tickets/tickets.api";
import { toast } from "sonner";
import Link from "next/link";

export const TicketForm = ({ ticket }: { ticket?: Ticket }) => {

    const router = useRouter();

    const { register, handleSubmit, setValue } = useForm<Ticket>({
        defaultValues: {
            title: ticket?.title,
            description: ticket?.description,
            status: ticket?.status,
            assignedTo: ticket?.assignedTo,
        }
    })

    const handleChange = (status: string) => {
        setValue("status", status as Ticketstatus)
    }

    const onSubmit: SubmitHandler<Ticket> = async (data) => {
        try {

            let response: unknown;

            //edit
            if (ticket?.id) {
                response = await updateTicket( ticket.id, {
                        title: data.title,
                        description: data.description,
                        assignedTo: data.assignedTo,
                        status: data.status
                    }
                );

                toast.success("Se ha editado una tarea", {
                    description: `Se ha editado la tarea a: ${data.title}`,
                })

            } else {

                response = await createTicket({
                    title: data.title,
                    description: data.description,
                    assignedTo: data.assignedTo,
                    status: data.status
                });
                toast.success("Se ha añadido una nueva tarea", {
                    description: `Se ha añadido la tarea ${data.title}`,
                })
            }

            console.log(response);
            router.push("/tickets");

        } catch (error) {
            toast.error("Error: No se pudo añadir la tarea")
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input {...register('title', { required: true })} id="title" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea {...register('description')} id="description" />
            </div>
            <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={ticket?.status} onValueChange={handleChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>State</SelectLabel>
                            <SelectItem value="TODO">To do</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="DONE">Done</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="assigned">Assigned to</Label>
                <Input {...register("assignedTo")} id="assigned" />
            </div>

            <div className="flex gap-4 justify-between">
                <Button type="submit"><LucideSave />
                    { ticket?.id ? "Editar Ticket" : "Save Ticket" }
                </Button>

                <Button asChild variant="outline">
                    <Link href={"/tickets"}>
                        Cancel
                    </Link>
                </Button>
            </div>
        </form>
    );
}