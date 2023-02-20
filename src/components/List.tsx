import { RiDeleteBin5Line, RiEdit2Line, RiCheckLine } from "react-icons/ri";
import { useState } from "react";
interface ListProps {
  todo: string;
  completed: boolean;
  index: number;
  setGambiarra: (event: any) => void;
  remove: (index: number) => void;
  gambiarra: number;
  list: { task: string; completed: boolean }[];
}
export default function List({
  todo,
  index,
  completed,
  setGambiarra,
  remove,
  gambiarra,
  list,
}: ListProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(todo);
  const handleCheck = (event: any, task: string) => {
    const todos = JSON.parse(localStorage.getItem("todoList") || "[]");
    // Encontra o índice do objeto que deseja atualizar (por exemplo, o objeto com task "Comprar pão")
    const index = todos.findIndex((todos: any) => todos.task === todo);
    // Se o objeto foi encontrado, atualize suas propriedades
    if (index !== -1) {
      todos[index].completed = event.target.checked;
      setGambiarra(gambiarra + 1);
    }
    setGambiarra(gambiarra - 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
  };
  const handleEdit = () => {
    if (editTask.length > 30) {
      return;
    }
    if (list.some((item) => item.task === todo)) {
      alert("Já existe uma tarefa com esse nome");
      return;
    }
    if (editTask.length === 0) {
      return;
    }
    const todos = JSON.parse(localStorage.getItem("todoList") || "[]");
    // Encontra o índice do objeto que deseja atualizar (por exemplo, o objeto com task "Comprar pão")
    const index = todos.findIndex((todos: any) => todos.task === todo);
    // Se o objeto foi encontrado, atualize suas propriedades
    if (index !== -1) {
      todos[index].task = editTask;
      setGambiarra(gambiarra + 1);
    }
    setGambiarra(gambiarra - 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
  };
  return (
    <div
      key={todo + index}
      className="flex flex-col p-4 bg-[#25273c] w-5/6 md:w-2/6 lg:w-1/2 rounded-tr m-auto break-all"
    >
      <div className="flex justify-between border-b-[1px] px-2 items-center border-[#42434b] mb-3">
        <div className="flex items-center">
          {edit ? null : (
            <>
              <div className="relative pr-2">
                <input
                  checked={completed}
                  onChange={(event) => handleCheck(event, todo)}
                  type="checkbox"
                />
              </div>
            </>
          )}
          {edit ? (
            <div className="relative">
              <input
                className="border-none bg-[#4a508a] rounded-sm mb-1 text-white focus:outline-0 pl-2 w-2/3"
                type="text"
                placeholder="Edit this task..."
                onChange={({ target: { value } }) => setEditTask(value)}
              ></input>
              <p
                className={
                  editTask.length > 25
                    ? "absolute top-0 pr-2 right-0 my-auto text-red-600"
                    : "absolute top-0 pr-2 right-0 my-auto text-white"
                }
              >
                {editTask.length}/25
              </p>
            </div>
          ) : (
            <p
              className={
                completed ? "line-through text-white pl-1" : "text-white pl-1"
              }
            >
              {todo}
            </p>
          )}
        </div>
        <div className="flex gap-1">
          {edit ? null : (
            <div onClick={() => setEdit(true)}>
              <RiEdit2Line className="text-white" />
            </div>
          )}
          {edit ? (
            <div>
              <RiCheckLine
                className="text-green-500"
                onClick={() => {
                  handleEdit();
                  setEdit(false);
                }}
              />
            </div>
          ) : null}
          <div onClick={() => remove(index)} className="flex cursor-pointer">
            <RiDeleteBin5Line className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
