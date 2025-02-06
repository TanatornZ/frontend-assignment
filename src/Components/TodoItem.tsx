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
      className="p-2 border border-gray-600 rounded-md px-4 w-fit text-sm h-fit cursor-pointer hover:bg-blue-600 hover:text-white lg:text-lg select-none shadow"
      onClick={() => {
        onClick(todo);
      }}
    >
      <h1 className="select-none">{todo.name}</h1>
    </div>
  );
};
