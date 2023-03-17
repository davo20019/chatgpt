import createChatResponse from '../../utils/createChatResponse';
import { createApiRequest } from '../../utils/createApiRequest';

export default async function handler(req, res) {

    const requestBody = await req.text();
    const body = JSON.parse(requestBody);

    const { message, apiKey, isImageRequest } = body;

    try {
        const response = await createApiRequest(message, apiKey, isImageRequest);
        const successResponse = new Response(JSON.stringify(createChatResponse(response)), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        return successResponse;
    } catch (error) {
        const errorResponse = new Response(JSON.stringify(createChatResponse('Something went wrong!')), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
        return errorResponse;
    }
}
