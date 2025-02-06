import { useEffect, useState } from "react";

type ITodoType = "Fruit" | "Vegetable";

type ITodoItem = {
  type: ITodoType;
  name: string;
};

type ITodoList =
  | {
      type: ITodoType;
      name: string;
    }[]
  | [];

enum TodoType {
  Fruit = "Fruit",
  Vegetable = "Vegetable",
}

const todoData: ITodoList = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

function App() {
  const [todoList, setTodoList] = useState(todoData);
  const [fruitList, setFruitList] = useState<ITodoList>([]);
  const [vegatableList, setVegatableList] = useState<ITodoList>([]);

  const handleOnClickFromTodoList = (todo: ITodoItem) => {
    const newTodoList = todoList.filter((item) => item !== todo);
    setTodoList(newTodoList);
    if (todo.type === TodoType.Fruit) {
      setFruitList([...fruitList, todo]);
      setTimeout(() => {
        setTodoList((list) => [...list, todo]);
        setFruitList((list) => list.filter((i) => i !== todo));
      }, 5000);
    } else {
      setVegatableList([...vegatableList, todo]);
      setTimeout(() => {
        setTodoList((list) => [...list, todo]);
        setVegatableList((list) => list.filter((i) => i !== todo));
      }, 5000);
    }
  };

  const handleOnClickFromTypeList = (todo: ITodoItem) => {
    setTodoList([...todoList, todo]);
    if (todo.type === TodoType.Fruit) {
      setFruitList((list) => list.filter((item) => item !== todo));
    } else {
      setVegatableList((list) => list.filter((item) => item !== todo));
    }
  };

  return (
    <div className="bg-indigo-100 w-screen h-screen  min-w-xs">
      <div className="max-w-5xl mx-auto p-4 md:p-6 md:px-10">
        <h1 className="text-2xl font-bold  text-indigo-900 text-center">
          Todo list
        </h1>
        <div className="flex flex-col mt-4 md:mt-6 lg:flex-row-reverse gap-4">
          <div className="flex w-full max-w-xl h-[350px] gap-2 lg:shrink-0 mx-auto">
            <TypeList
              type={TodoType.Fruit}
              list={fruitList}
              onClickItem={handleOnClickFromTypeList}
            />
            <TypeList
              type={TodoType.Vegetable}
              list={vegatableList}
              onClickItem={handleOnClickFromTypeList}
            />
          </div>

          <div className="flex gap-2 flex-wrap content-baseline mx-auto lg:basis-1/2 lg:shrink-0/">
            {todoList.map((todo, index) => (
              <TodoItem
                key={`todo ${index}`}
                onClick={handleOnClickFromTodoList}
                todo={todo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

const TypeList = ({
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

const TodoItem = ({
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
