const express = require("express");
const pool = require("../db");
const router = express.Router();

//creating a todo
router.post("/new", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//getting all
router.get("/", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.json(todos.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//getting a todo with id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//updating a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("todo was updated!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//deleting a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
