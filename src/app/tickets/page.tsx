import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import TicketCard from '../../components/ticket-card';
import { getTickets } from "./tickets.api";
import Link from "next/link";

export default async function TicketPage() {

    const { tickets } = await getTickets();

    return (
        <div className="max-w-screen-lg mx-auto p-8">
            <header className="flex justify-between mb-8">
                <h1 className="text-3xl font-bold">Tickets</h1>

                <Button asChild>
                    <Link href="/tickets/new">
                        Add Ticket<LucidePlusCircle />
                    </Link>
                </Button>
            </header>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                { 
                    tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ ticket }/>
                    ))
                }
            </div>
        </div>    
    );
}
