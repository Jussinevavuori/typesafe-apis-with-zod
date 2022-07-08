import type { NextPage } from 'next'
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { todosSchema } from '../schemas/todo.schema';

async function fetchTodos(): Promise<Todo[]> {
	const response = await fetch("/api/todos");
	const json = await response.json();

	const parsed = todosSchema.safeParse(json);
	if (parsed.success) {
		return parsed.data;
	}

	// Handle errors
	console.error(parsed.error)
	return [];
}

async function createTodo(body: TodoCreate) {
	await fetch("/api/todos", {
		body: JSON.stringify(body),
		headers: { "Content-type": "application/json" },
		method: "POST",
	})
}

async function updateTodo(body: TodoUpdate) {
	await fetch("/api/todos", {
		body: JSON.stringify(body),
		headers: { "Content-type": "application/json" },
		method: "PATCH",
	})
}

const Home: NextPage = () => {
	const { data } = useQuery("todos", fetchTodos)

	const qc = useQueryClient();

	const create = useMutation(createTodo, { onSettled() { qc.invalidateQueries("todos") } });
	const update = useMutation(updateTodo, { onSettled() { qc.invalidateQueries("todos") } });

	const [text, setText] = useState("");
	const [important, setImportant] = useState(false);

	return <div>
		<ul>
			{
				(data ?? []).map((item) => (
					<li key={item.id} className={item.important ? "important" : ""}>
						<label htmlFor={item.id}>
							<input
								id={item.id}
								type="checkbox"
								checked={item.done}
								onChange={() => update.mutate({ id: item.id, done: !item.done })}
							/>
							{item.text}
							{item.important ? " ⚠️" : ""}
						</label>
					</li>
				))
			}
		</ul>

		<form onSubmit={(e) => {
			e.preventDefault();
			create.mutate({ text, important })
			setText("");
			setImportant(false);
		}}>
			<p>
				New Todo
			</p>
			<input value={text} onChange={e => setText(e.target.value)} />
			<label htmlFor="important">
				<input
					id="important"
					type="checkbox"
					checked={important}
					onChange={() => setImportant(_ => !_)}
				/>
				Important
			</label>
			<button type="submit">
				Submit
			</button>
		</form>
	</div >
}

export default Home
