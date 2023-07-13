import JWT from 'jsonwebtoken';
import createError from 'http-errors';
//import environment variable 
import dotenv from 'dotenv';
dotenv.config({path: './env' });

import client from "./init_redis.js"

export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
        expiresIn: '1d',
        issuer: 'CS.zhcet@amu',
        audience: userId,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message)
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return next(createError.Unauthorized());
  }
  
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.match(/\S+/g);
  const token = bearerToken[1];
  console.log(token)
  
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
    }
    req.payload = payload;
    next();
  });
};

export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1y',
        issuer: 'CS.zhcet@amu',
        audience: userId,
      }
  
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        client.SET(userId, token, (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
        });
        resolve(token);
      });
    });
};

  export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;

        client.GET(userId)
        .then((result) => {
          if (refreshToken === result) {
            resolve(userId);
          } else {
            reject(createError.Unauthorized());
          }
        })
        .catch((err) => {
          console.log(err.message);
          reject(createError.InternalServerError());
        });
      });
    });
};