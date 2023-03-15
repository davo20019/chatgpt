import fetch from 'isomorphic-unfetch';

export async function getChatResponse(apiKey, prompt) {
    const res = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt,
            max_tokens: 60,
            n: 1,
            stop: '\n',
        }),
    });

    const json = await res.json();

    return json.choices[0].text.trim();
}
