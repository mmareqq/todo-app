import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
   res.send('Hellow world!');
});

app.listen(port, () => {
   console.log(`Hello world listening on port ${port}`);
});
