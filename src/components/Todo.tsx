import { useState, useEffect, ChangeEvent } from "react";
import { FormEvent } from "react";
import List from "./List";
export default function Todo() {
  const [todo, setTodo] = useState<string>("");
  const [list, setList] = useState<{ task: string; completed: boolean }[]>([]);
  const [gambiarra, setGambiarra] = useState<number>(0);
  useEffect(() => {
    if (localStorage.getItem("todoList") !== null) {
      setList(JSON.parse(localStorage.getItem("todoList") as string));
    } else {
      localStorage.setItem("todoList", JSON.stringify([]));
    }
  }, [gambiarra]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if(todo.length > 25) {
      setTodo(value.slice(0, 25)); 
    }
    setTodo(value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.length > 30) {
      return;
    }
    if (list.some((item) => item.task === todo)) {
      alert("Já existe uma tarefa com esse nome");
      return;
    }
    if (todo.length === 0) {
      return;
    }
    setList([...list, { task: todo, completed: false }]);
    localStorage.setItem(
      "todoList",
      JSON.stringify([...list, { task: todo, completed: false }])
    );
    setTodo("");
  };
  const handleDelete = (index: number) => {
    console.log("entrou");
    list.splice(index, 1);
    console.log(list);
    setList([...list]);
    localStorage.setItem("todoList", JSON.stringify([...list]));
    setGambiarra(0);
  };
  const deleteCompletes = () => {
    const filteredList = list.filter((item) => item.completed !== true);
    setList(filteredList);
    localStorage.setItem("todoList", JSON.stringify(filteredList));
    setGambiarra(0);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 bg-[#25273c]">
        <div className="flex gap-1 p-4 bg-[#25273c] w-5/6 md:w-2/6 lg:w-1/2 rounded-md absolute top-32 left-0 right-0 mx-auto">
          <div className="flex items-center w-3/4">
            <input
              className="border-none bg-[#25273c] text-white focus:outline-0 w-10/12 md:w-10/12 lg::w-10/12"
              type="text"
              max={25}
              value={todo}
              placeholder="Create a new todo..."
              onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
            ></input>
            <p
              className={
                todo.length > 25
                  ? "absolute top-4 pr-2 right-0 my-auto text-red-600"
                  : "absolute top-4 pr-2 right-0 my-auto text-white"
              }
            >
              {todo.length}/25
            </p>
          </div>
          <button type="submit" className="hidden"></button>
        </div>
        <div className="flex-col bg-transparent absolute top-52 left-0 right-0 mx-auto">
          {list.map((item, index: number) => {
            return (
              <div key={index}>
                <List
                  todo={item.task}
                  completed={item.completed}
                  index={index}
                  remove={() => handleDelete(index)}
                  setGambiarra={setGambiarra}
                  gambiarra={gambiarra}
                  list={list}
                />
              </div>
            );
          })}
          {list.length > 0 ? (
            <>
              <div className="flex w-5/6 md:w-2/6 lg:w-1/2 m-auto rounded-bl-md rounded-br-md p-2 text-white justify-between px-2 items-center mb-3 bg-[#25273c]">
                <p>{list.length} Tarefas</p>
                <div
                  onClick={() => deleteCompletes()}
                  className="text-white cursor-pointer"
                >
                  Apagar Completas
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </form>
  );
}
