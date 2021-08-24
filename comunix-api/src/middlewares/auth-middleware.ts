import { authorize } from '../api/user/user-service';

export const authMiddleware = async (req, res, next) => {
    const { headers } = req;
    const { authorization: token } = headers;
    try {
        const isAuthorized = await authorize(token);
        if(isAuthorized){
            return next();
        }
    } catch (error) {
        console.log('Error while authorizaing user', { error, token });
    }
    return res.status(401).json('You are unauthorized to do this action');
};