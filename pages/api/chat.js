import createChatResponse  from '../../utils/createChatResponse';
import { createApiRequest } from '../../utils/createApiRequest';

export default async function handler(req, res) {
    const { message } = req.body;
    const { apiKey } = req.query; // get apiKey from query params

    try {
        const response = await createApiRequest(message, apiKey);
        res.status(200).json(createChatResponse(response));
    } catch (error) {
        console.error(error);
        res.status(500).json(createChatResponse('Something went wrong!'));
    }
}
