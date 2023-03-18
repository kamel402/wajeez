import axios from 'axios';

async function convertPdfToText(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('https://api.pdf.co/v1/pdf/convert/to/text', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-api-key': 'kamel1419@gmail.com_63d6103eb0212d9383a5d2f5fc765ae18b7676a33e21c91c89d2149eee574f6cbae7ef66'
    }
  });

  return response.data;
}

export default convertPdfToText;