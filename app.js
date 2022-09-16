const axios = require('axios'),
	express = require('express'),
	app = express(),
	hostname = 'localhost',
	port = 3000;

function error(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Error#404: page no exists!');
}

app.get('/rates', (req, res) => {
	if (typeof req.query.currency === 'undefined') {
		error(res);
	}
	axios
	.get('https://api.coincap.io/v2/rates/'+req.query.currency)
	.then(axiosRes => {
		res.setHeader('Content-Type', 'application/json');
		res.send({usd: axiosRes.data.data.rateUsd});
	})
	.catch(() => {
		error(res);
	});
});

app.all('/*', (req, res) => {
	error(res);
});

app.listen(port, hostname, () => {
	console.log(`Server running http://${hostname}:${port}/`);
});