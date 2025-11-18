import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Add student
router.post("/add", async (req, res) => {
  try {
    const { name, roll, course, email } = req.body;

    const newStudent = new Student({ name, roll, course, email });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
});

export default router;
