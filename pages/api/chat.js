import createChatResponse  from '../../utils/createChatResponse';
import { createApiRequest } from '../../utils/createApiRequest';

export default async function handler(req, res) {

    const { message, apiKey } = req.body;

    try {
        const response = await createApiRequest(message, apiKey);
        res.status(200).json(createChatResponse(response));
    } catch (error) {
        res.status(500).json(createChatResponse('Something went wrong!'));
    }
}
