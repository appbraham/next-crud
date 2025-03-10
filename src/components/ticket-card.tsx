"use client";

import { Ticket, Ticketstatus } from "@/types/ticket.interface";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LucideTrash } from "lucide-react";
import { deleteTicket } from "@/app/tickets/tickets.api";
import { toast } from "sonner";
import { revalidate } from "@/lib/actions";
import Link from "next/link";
import { MouseEvent } from "react";

interface TicketCardProps {
    ticket: Ticket;    
}

const TICKET_STATUS_VARIANTS = {
    TODO: 'default',
    IN_PROGRESS: 'outline',
    DONE: 'success',
    REJECTED: 'destructive'
} as const;

const getStatusVariant = (status: Ticketstatus)
    : "default" | "destructive" | "outline" | "success" => {
    return TICKET_STATUS_VARIANTS[status]
}

const getStatusName = (status: Ticketstatus) => {
    
    const names = {
        TODO: 'To do',
        IN_PROGRESS: 'In progress',
        DONE: 'Done',
        REJECTED: 'Rejected'
    }
    return names[status] ?? 'Unknown';

}

export default function TicketCard({ ticket }: TicketCardProps) {

    const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        try {
            await deleteTicket(ticket.id);
            await revalidate("/tickets");
            toast.success("Tarea eliminada", {
                description: `Se ha eliminado la tarea ${ticket.title}`,                
            })    
        } catch(error) {
            console.log(error);
            
        }
    }    

    return (
        <Link href={`/tickets/${ticket.id}/edit`}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {ticket.title}
                        <Button onClick={ (event) => handleDelete(event) } className="cursor-pointer" aria-label="Delete button" variant={"ghost"}>
                            <LucideTrash />
                        </Button>
                    </CardTitle>
                    <CardDescription>{ticket.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><Badge variant={getStatusVariant(ticket.status)} >{getStatusName(ticket.status)}</Badge></p>
                </CardContent>
                <CardFooter>
                    <p>Assigned to: <span className="font-semibold">{ticket.assignedTo}</span></p>
                </CardFooter>
            </Card>
        </Link>
    )
}