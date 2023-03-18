import formidable from 'formidable'

export default async function handler(req, res) {
  const form = formidable({ multiples: false });
  const { pdf } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
  res.json(pdf)
}
