import mongoose from 'mongoose';
import updateTicketsByUser from '../../../server/mongodb/actions/updateTicketByUser';

export const PATCH = async (
    req: Request
): Promise<Response> => {

    // ticketID, userID needed
    try {
        const body = await req.json();
        const { ticketID, userID } = body ?? {};

        console.log("Body received");

        if (
            typeof ticketID !== 'string' ||
            !mongoose.isValidObjectId(ticketID) || 
            typeof userID !== 'string' ||
            !mongoose.isValidObjectId(userID)
        ) {
            return new Response("Invalid input", { status: 400});
        }
        
        const updated = await updateTicketsByUser(ticketID, userID);
        if (!updated) {
            return new Response("Failed to update ticket");
        }
        return new Response("Success", { status: 200});
    } catch (error) {
        return new Response("Failed", { status: 500});
    }
};