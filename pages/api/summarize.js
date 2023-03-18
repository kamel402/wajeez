import axios from 'axios';

export default async function handler(req, res) {
  try {

    const { legalData, language } = req.body

    const headers = {
      'customer-id': process.env.CUSTOMER_ID,
        'x-api-key': process.env.X_API_KEY,
    }

    const response = await axios.post('https://experimental.willow.vectara.io/v1/completions',{
      model: "text-davinci-003",
      prompt: `Summarize the most important points from the following text in a way a 15 year old could understand with each point on a new line beginning with an asterisk in plain arabic:\n\n ` + legalData,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: headers
    }
  );
  res.status(200).json(response.data);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong.' });
}

  
}
