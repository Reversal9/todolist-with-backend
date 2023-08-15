import {Response, Request} from "express";
import {ITodo} from "../../types/todo";
import Todo from "../../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
    console.log(`[${req.method}] Attempted.`);
    try {
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({todos});
        console.log(`[${req.method}] Was successful.`);
    } catch (error) {
        console.log(`[${req.method}] Unsuccessful`, error);
        res.status(500).send({
            message: 'Error has occurred'
        });
    }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
    console.log(`[${req.method}] Attempted.`);
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">;
        console.log(req.body);
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        });

        const newTodo: ITodo = await todo.save();
        const allTodos: ITodo[] = await Todo.find();

        res
            .status(201)
            .json({message: "Todo added", todo: newTodo, todos: allTodos});

        console.log(`[${req.method}] Was successful.`);
    } catch (error) {
        console.log(`[${req.method}] Unsuccessful`, error);
        res.status(500).send({
            message: 'Error has occurred'
        });
    }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    console.log(`[${req.method}] Attempted.`);
    try {
        const {
            params: { id },
            body,
        } = req;
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allTodos: ITodo[] = await Todo.find();
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
        console.log(`[${req.method}] Was successful.`);
    } catch (error) {
        console.log(`[${req.method}] Unsuccessful`, error);
        res.status(500).send({
            message: 'Error has occurred'
        });
    }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    console.log(`[${req.method}] Attempted.`);
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        );
        const allTodos: ITodo[] = await Todo.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
        console.log(`[${req.method}] Was successful.`);
    } catch (error) {
        console.log(`[${req.method}] Unsuccessful`, error);
        res.status(500).send({
            message: 'Error has occurred'
        });
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo };