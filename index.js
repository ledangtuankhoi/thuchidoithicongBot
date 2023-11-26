const express = require('express');
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace YOUR_GOOGLE_SHEET_ID and YOUR_GOOGLE_SHEET_API_KEY with your actual Google Sheet ID and API Key
const doc = new GoogleSpreadsheet('YOUR_GOOGLE_SHEET_ID');
doc.useApiKey('YOUR_GOOGLE_SHEET_API_KEY');

app.post('/submit-form', async (req, res) => {
  try {
    const { data } = req.body;

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(data);

    res.status(200).send('Data submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
