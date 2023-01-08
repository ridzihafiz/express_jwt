import { request, response } from "express";
import db from "../../prisma/connection";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

// create user

export const user_register = async (req = request, res = response) => {
  try {
    // membaca request body
    const data = await req.body;

    // tulis data dari body ke database
    const result = await db.users.create({
      data: data,
    });

    const { SECRET_KEY } = process.env;

    // generated token
    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      SECRET_KEY
    );

    // kembalikan response json
    res.status(201).json({
      success: true,
      message: "user has been created in Database",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login user

export const user_login = async (req = request, res = response) => {
  try {
    // ambil body
    const data = await req.body;
    // console.log(data);

    // check email
    const checkEmail = await db.users.findUnique({
      where: {
        email: data.email,
      },
    });

    // if email cannot found in database
    if (!checkEmail) {
      return res.status(404).json({
        success: false,
        message: "email is not found",
      });
    }

    // if password are not same
    if (data.password !== checkEmail.password) {
      return res.status(401).json({
        success: false,
        message: "password is wrong",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: checkEmail.id,
        email: checkEmail.email,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      success: true,
      message: "login succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
