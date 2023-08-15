import axios, { AxiosResponse, AxiosError } from "axios";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            "/todos"
        );
        return todos;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error has occurred');
        }
    }
}

export const addTodo = async (
    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            status: false,
        };
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            "/todos",
            todo
        );
        return saveTodo;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error has occurred');
        }
    }
};

export const updateTodo = async (
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true,
        };
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `/todos/${todo._id}`,
            todoUpdate
        );
        return updatedTodo;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error has occurred');
        }
    }
};

export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `/todos/${_id}`
        );
        return deletedTodo;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error has occurred');
        }
    }
};