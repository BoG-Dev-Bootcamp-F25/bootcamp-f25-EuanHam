import mongoose from "mongoose";
import readTicketsByUser from '../../../server/mongodb/actions/readTicketsByUser';


// http://localhost:3000/api/lookUpTickets?userID=6903f0716f859522ae151fed
// try this^^^
export const GET = async (
    req: Request
): Promise<Response> => {
    try {
        const url = new URL(req.url);
        const userID = url.searchParams.get('userID');

        if (!userID || !mongoose.isValidObjectId(userID)) {
        return new Response("Invalid input - missing or invalid userID", { status: 400 });
        }

        const tickets = await readTicketsByUser(userID);

        return new Response(JSON.stringify(tickets), {
        status: 200,
        headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("lookUpTickets error:", error);
        return new Response("Failed in read tickets", { status: 500 });
    }
};