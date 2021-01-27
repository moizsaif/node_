const sendTokenResponse = ({ user, statusCode, res }) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    return res.status(statusCode).cookie('token', token, options).json({ success: true, token });
};

module.exports = { sendTokenResponse };
