import axios from "axios";
import { TodoDto } from "../interface/enum/toDo/toDo.interface";

export async function addToDo(data: TodoDto) {
  console.log("🚀 ~ file: todo.service.tsx:5 ~ addToDo ~ data:", data);
  try {
    const response = await axios.post("http://127.0.0.1:5000/todos", data);
    return response;
  } catch (error) {
    console.error("Error during POST request:", error);
    // Handle error as needed
  }
}

export async function listToDO() {
  try {
    const response = await axios.get("http://127.0.0.1:5000/todos");
    return response;
  } catch (error) {
    console.error("Error during POST request:", error);
    // Handle error as needed
  }
}

export async function updateToDo(data: TodoDto, id: string) {
  console.log("🚀 ~ file: todo.service.tsx:5 ~ addToDo ~ data:", data);
  try {
    const response = await axios.put(`http://127.0.0.1:5000/todos/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error during POST request:", error);
    // Handle error as needed
  }
}

export async function deleteToDo(id: any) {
  console.log("🚀 ~ file: todo.service.tsx:5 ~ addToDo ~ data:");
  try {
    const response = await axios.delete(`http://127.0.0.1:5000/todos/${id}`);
    return response;
  } catch (error) {
    console.error("Error during POST request:", error);
    // Handle error as needed
  }
}
