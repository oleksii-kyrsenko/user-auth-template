const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Connect Database

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) =>
	error ? console.log(error) : console.log(`Server started on port ${PORT}`)
);
