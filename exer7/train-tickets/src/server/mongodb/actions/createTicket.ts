import Ticket from '../models/Ticket'

async function createTicket(ticketData) {
    const newTicket = new Ticket(ticketData);
    await newTicket.save();
}