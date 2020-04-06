const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res.status(401).json({
			errors: [
				{
					msg: 'No token, authorization denied',
				},
			],
		});
	}

	// Verify token
	try {
		await jwt.verify(token, config.get('JWT_SECRET'), (error, decoded) => {
			if (error) {
				res.status(401).json({
					errors: [{ msg: 'Token is not valid' }],
				});
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (error) {
		console.error('Something wrong with auth middleware');
		res.status(500).json({
			errors: [{ msg: 'Server Error' }],
		});
	}
};
