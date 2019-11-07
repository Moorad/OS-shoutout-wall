const express = require('express');

const app = express();

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running | port: '+(process.env.PORT || 4000));
});

app.get('/', (req,res) => {
	console.log(req);
})