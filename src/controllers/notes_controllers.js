import { request, response } from "express";
import db from "../../prisma/connection";

// read notes
export const notes_read = async (req = request, res = response) => {
  try {
    const data = await req.body;
    const result = await db.notes.findMany({
      where: {
        user_id: data.user_id,
      },
    });
    res.status(200).json({
      success: true,
      notes: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// create notes
export const notes_create = async (req = request, res = response) => {
  try {
    const data = await req.body;
    const createNote = await db.notes.create({
      data: {
        title: data.title,
        content: data.content,
        user_id: data.user_id,
      },
    });
    res.status(201).json({
      success: true,
      message: "Successfully note created in Database",
      note: createNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
