type Todo = import("zod").TypeOf<
  typeof import("./schemas/todo.schema")["todoSchema"]
>;

type TodoUpdate = import("zod").TypeOf<
  typeof import("./schemas/todo.schema")["todoUpdateSchema"]
>;

type TodoCreate = import("zod").TypeOf<
  typeof import("./schemas/todo.schema")["todoCreateSchema"]
>;
