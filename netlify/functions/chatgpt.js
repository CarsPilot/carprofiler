
const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);
    const messages = body.messages;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 300,
        temperature: 0.85
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
