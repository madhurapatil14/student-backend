// routes/studentRoutes.js
import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// ➕ Add new student
router.post("/add", async (req, res) => {
  try {
    const { name, email, age, course } = req.body;
    const newStudent = new Student({ name, email, age, course });
    await newStudent.save();
    res.status(201).json({ message: "✅ Student added successfully!", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding student", error: error.message });
  }
});

// 📋 Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching students", error: error.message });
  }
});

// ❌ Delete student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "✅ Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting student", error: error.message });
  }
});

export default router; // 👈 this fixes your error
