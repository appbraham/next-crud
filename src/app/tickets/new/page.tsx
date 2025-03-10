import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketForm } from '../../../components/ticket-form';
import { Ticket } from "@/types/ticket.interface";
import { getTicket } from "../tickets.api";

interface Params {
    params: Promise<{ id: string }>
}

export default async function NewTicket({ params }: Params) {

    //?
    const id = (await params).id

    let data: { ticket: Ticket } | undefined;

    if(id) {
        data = await getTicket(id);
        console.log(data);
    }

    
    

    return (
        <div className="max-w-lg mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <TicketForm ticket={data?.ticket} />
                </CardContent>
            </Card>
        </div>
    )
}