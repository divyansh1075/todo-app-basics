import Todo from '../models/todo.js'


export const getTodos = async (req, res) => {
    
    try{
        const todos = await Todo.find({
            user : req.user.id
        });
        res.json(todos);

    } catch(error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const createTodo = async (req, res) => {
    
    const text = req.body.text;
    try{
        const todo = await Todo.create({
            text : text,
            completed : false,
            ref : req.user.id
        })

        res.json(todo);

    } catch(error) {
        
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteTodo = async (req, res) => {
    
    const id = req.params.id;
    try{
        const todo = await Todo.findOne({
            _id : id,
            user : req.user.id
        })

        await todo.deleteOne();

        res.json(todo);
    
    } catch(error) {

        res.status(500).json({
            message : error.message
        })
    }
}

export const updateTodo = async (req, res) => {

    const id = req.params.id;
    try {
        const todo = await Todo.findById(id);

        todo.completed = !todo.completed;
        await todo.save();

        res.json(todo);

    } catch(error) {
        res.status(500).json({
            messsage: error.message
        })
    }
}

export const editText = async (req, res) => {
    
    const text = req.body.text;
    const id = req.params.id;
    try{
        const todo = await Todo.findById(id);
        todo.text = text;
        await todo.save();

        res.json(todo);

    } catch(err) {
        res.status(500).json({
            messaeg: err.message
        })
    }
    
}