import type { NextApiRequest, NextApiResponse } from "next";
import { todoCreateSchema, todoUpdateSchema } from "../../schemas/todo.schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todos = await getAllTodosFromDatabase();
    return res.json(todos);
  }

  if (req.method === "PATCH") {
    const body = todoUpdateSchema.parse(req.body);
    updateTodoInDatabase(body.id, body.done);
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const body = todoCreateSchema.parse(req.body);
    createTodoInDatabase(body);
    return res.status(200).end();
  }

  return res.status(501).end();
}

async function getAllTodosFromDatabase() {
  return _todos;
}

async function createTodoInDatabase(data: TodoCreate) {
  const id = Math.random().toString();
  _todos.push({
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    done: false,
    ...data,
  });
}

async function updateTodoInDatabase(id: string, done: boolean) {
  const todo = _todos.find((_) => _.id === id);
  if (todo) {
    todo.done = done;
    todo.updatedAt = new Date().toISOString();
  }
}

const _todos: Todo[] = [
  {
    id: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    done: false,
    text: "Do the dishes",
    important: false,
  },
  {
    id: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    done: false,
    text: "Clean the apartment",
    important: true,
  },
  {
    id: "3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    done: true,
    text: "Write your next blog",
    important: true,
  },
];
