import { TodoType, ITodoList, ITodoItem } from "../Types/Todo";
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
      <div className="h-full basis-1/2 border border-gray-600 rounded-md divide-y divide-gray-600">
        <h1 className="text-lg font-medium text-center py-2 select-none">{type}</h1>
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