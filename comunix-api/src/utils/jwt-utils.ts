import jwt from 'jsonwebtoken';

const { JWT_PRIVATE_KEY } = process.env;

export const generateJwtToken = (user) => {
    return jwt.sign({ ...user }, JWT_PRIVATE_KEY);
}

export const decodeJwtToken = (token) => {
    const user = jwt.verify(token, JWT_PRIVATE_KEY);
    return user;
}