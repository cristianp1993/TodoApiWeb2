const router = require("express").Router();
const { connectClient } = require("../db/postgres");
const todo = require("../src/Models/todoModel");

// Index
router.get("/", async (req, res) => {
    const client = await connectClient();
    try {
        const result = await client.query("SELECT * FROM todos");
        res.render('todos/index', { todos: result.rows });
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.end();
    }
});

router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const completed = req.body.completed === '1' ? true : false; 
        await todo.create({ title: req.body.title, completed });
        console.log("Creada la tarea:", req.body.title + " *-* " + req.body.completed);
        res.redirect('/todosPanel')
    } catch (error) {
        res.status(500).send(error.message)
    }
   
});


router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await todo.findByPk(taskId);
        if (!deletedTask) {
            return res.status(404).send("Tarea no encontrada");
        }

        await deletedTask.destroy();
        console.log("Tarea eliminada:", taskId);
        res.redirect('/todosPanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const row = await todo.findByPk(id);

        if (!row) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await row.update({ title, completed });

        console.log('Tarea actualizada:', row);
        res.status(200).json(row);
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
module.exports = router;