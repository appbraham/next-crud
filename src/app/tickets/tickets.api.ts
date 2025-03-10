/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ticket, TicketForm } from "@/types/ticket.interface";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getTickets = async (): Promise<{ tickets: Ticket[] }> => {
    
    try {

        const response = await fetch(`${URL}/tickets`);
        const data = await response.json();
        return data;

    } catch(error: any) {
        throw new Error(error);        
    }
}

export const createTicket = async (ticket: TicketForm):Promise<{message: string}> => {
    
    try {

        const response = await fetch(`${URL}/tickets`, {
            body: JSON.stringify(ticket),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()

        if(!response.ok) throw new Error(data.error);

        return data;


    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTicket = async (id: string): Promise<{message: string}> => {
    try{
        const response = await fetch(`${URL}/tickets/${id}`,{
            method: 'DELETE',
        });

        const data = await response.json();

        if(!response.ok) throw new Error(data.error);

        return data;

    } catch(error: any) {
        throw new Error(error)
    }
}

export const getTicket = async (id: string): Promise<{ ticket: Ticket }> => {
    
    try {

        const response = await fetch(`${URL}/tickets/${id}`);
        const data = await response.json();
        return data;

    } catch(error: any) {
        throw new Error(error);        
    }
}

export const updateTicket = async (id: string, ticket: TicketForm):Promise<{message: string}> => {
    
    try {

        const response = await fetch(`${URL}/tickets/${id}`, {
            body: JSON.stringify(ticket),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()

        if(!response.ok) throw new Error(data.error);

        return data;


    } catch (error: any) {
        throw new Error(error)
    }
}


