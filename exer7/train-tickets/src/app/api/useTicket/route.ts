import mongoose from "mongoose";
import deleteTicket from '../../../server/mongodb/actions/deleteTicket';

export const DELETE = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { ticketID } = body ?? {};

        if (
            typeof ticketID !== 'string' ||
            !mongoose.isValidObjectId(ticketID)
        ) {
            return new Response("Invalid input", { status: 500});
        }
        
        await deleteTicket(ticketID);


        return new Response("Success", { status: 200});
    } catch (error) {
        return new Response("Failed", { status: 500});
    }
};