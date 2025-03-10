export type Ticketstatus = "TODO" | "IN_PROGRESS" | "DONE" | "REJECTED";

export interface Ticket {
    id: string;
    title: string;
    description?: string;
    status: Ticketstatus;
    assignedTo: string;
}

export type TicketForm = Omit<Ticket, "id">;