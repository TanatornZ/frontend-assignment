import { TodoType, ITodoList, ITodoItem } from "../types/Todo";
import { TodoItem } from "./TodoItem";

export const TypeList = ({
  type,
  list,
  onClickItem,
  
}: {
  type: TodoType;
  list: ITodoList;
  onClickItem: (todo: ITodoItem) => void;
}) => {
  return (
    <div className="h-full basis-1/2 border border-gray-600 rounded-sm shadow divide-y divide-gray-600">
      <h1 className="text-lg lg:text-2xl font-medium text-center py-2 select-none text-blue-950">
        {type}
      </h1>
      <div className="p-2 flex flex-col gap-2 justify-center items-center">
        {list?.length > 0 &&
          list?.map((item, index) => (
            <TodoItem
              todo={item}
              key={index}
              onClick={() => onClickItem(item)}
            />
          ))}
      </div>
    </div>
  );
};
