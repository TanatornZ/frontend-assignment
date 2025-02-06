import { ITodoItem } from "../Types/Todo";

export const TodoItem = ({
    todo,
    onClick,
  }: {
    todo: ITodoItem;
    onClick: (todo: ITodoItem) => void;
  }) => {
    return (
      <div
        className="p-2 border rounded-md px-4 text-sm w-fit h-fit cursor-pointer select-none"
        onClick={() => {
          onClick(todo);
        }}
      >
        <h1 className="select-none">{todo.name}</h1>
      </div>
    );
  };
  