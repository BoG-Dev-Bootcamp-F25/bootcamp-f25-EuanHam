import mongoose from "mongoose";
import createTicket from '../../../server/mongodb/actions/createTicket';

export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { lineColor, station, userID } = body ?? {};

        if (
            typeof lineColor !== 'string' ||
            typeof station !== 'string' ||
            typeof userID !== 'string' ||
            !mongoose.isValidObjectId(userID)
        ) {
            return new Response("Invalid input", { status: 500});
        }
        
        await createTicket(lineColor, station, userID);

        // lineColor, station, userID

        return new Response("Success", { status: 200});
    } catch (error) {
        return new Response("Failed", { status: 500});
    }
};