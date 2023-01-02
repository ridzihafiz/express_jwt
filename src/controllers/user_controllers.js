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
