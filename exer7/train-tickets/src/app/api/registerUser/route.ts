import createUser from '../../../server/mongodb/actions/createUser';

export const POST = async (
    req: Request
): Promise<Response> => {
    try {
        const body = await req.json();
        const { name, age } = body ?? {};

        if (typeof name !== 'string' || typeof age !== 'number') {
            return new Response("Invalid input", { status: 500});
        }
        
        await createUser(name, age);

        return new Response("Success", { status: 200});
    } catch (error) {
        return new Response("Failed", { status: 500});
    }
};