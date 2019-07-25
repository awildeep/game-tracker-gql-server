import jwt from 'jsonwebtoken';

const createToken = async ({ user_id, email, username }, secret, expiresIn) => {
    return await jwt.sign(
        { user_id, email, username },
        secret,
        {expiresIn}
    );
};

export default createToken;