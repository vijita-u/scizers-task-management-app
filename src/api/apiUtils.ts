import apiInstance from "./api";
import { DataType } from "../utils/types";


// GET request - Fetch all tasks
export const fetchTasks = async (): Promise<DataType[]> => {
    try {
        const response = await apiInstance.get<DataType[]>("/tasks");
        return response.data;
    } catch (error) {
        console.log("Error fetching task: ", error)
        throw error
    }

}

// POST request - Add a new task        
export const addTasks = async (newTask: DataType): Promise<DataType> => {
    try {
        const response = await apiInstance.post<DataType>("/tasks", newTask);
        return response.data;
    } catch (error) {
        console.log("Error adding task: ", error)
        throw error
    }

}

// PUT request - Update a task
export const updateTask = async (id: string, updatedTask: DataType): Promise<DataType> => {
    try {
        const response = await apiInstance.put<DataType>(`/tasks/${id}`, updatedTask);
        return response.data;
    } catch (error) {
        console.log("Error updating task: ", error)
        throw error;
    }

}

// DELETE request - Delete a task
export const deleteTask = async (id: string): Promise<void> => {
    try {
        await apiInstance.delete(`/tasks/${id}`)
    } catch (error) {
        console.log("Error deleting task: ", error)
        throw error;
    }

}