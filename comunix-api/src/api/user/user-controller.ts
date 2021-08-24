import * as userService from './user-service';

export const login = async (req, res, next) => {
    const { body } = req;
    try {
        const token = await userService.login(body);

        if(token){
            return res.status(200).json(token);
        } else {
            return res.status(401).json('User does not exist');
        }
    } catch (err) {
        console.log('Error while logging in', { err });
        return next(err);
    }
}

export const register = async (req, res, next) => {
    const { body } = req;
    try {
        const user = await userService.register(body);
        return res.status(200).json(user);
    } catch (err) {
        console.log('Error in user registration', { err });
        return next(err);
    }
}