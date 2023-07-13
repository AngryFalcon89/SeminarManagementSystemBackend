import createError from 'http-errors';
import User from '../Models/User.model.js';
import { authSchema } from '../helpers/validation_schema.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../helpers/jwt_helper.js';
import client from '../helpers/init_redis.js';

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await authSchema.validateAsync(req.body);
    console.log(result);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) throw createError.Conflict(`${result.email} is already registered`);

    const user = new User(result);
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound('User not registered');

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized('Username/Password not valid');

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) return next(createError.BadRequest('Invalid Username/Password'));
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    client.DEL(userId)
      .then((val) => {
        console.log(val);
        console.log('hi Bilal, how are you?');
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err.message);
        throw createError.InternalServerError();
      });
  } catch (error) {
    next(error);
  }
};
