import { useState } from "react";
import { ITodoList, ITodoItem, TodoType, ITimeouts } from "../types/Todo";
import { TodoItem } from "../components/TodoItem";
import { TypeList } from "../components/TypeList";
import { todoData } from "../data";

function TodoPage() {
  const [todoList, setTodoList] = useState(todoData);
  const [fruitList, setFruitList] = useState<ITodoList>([]);
  const [vegetableList, setVegetableList] = useState<ITodoList>([]);
  const [timeoutsList, setTimeoutsList] = useState<ITimeouts>({}); // Store timeout IDs

  const handleOnClickFromTodoList = (todo: ITodoItem) => {
    const newTodoList = todoList.filter((item) => item !== todo);
    setTodoList(newTodoList);

    let timeoutId;
    if (todo.type === TodoType.Fruit) {
      setFruitList([...fruitList, todo]);

      timeoutId = setTimeout(() => {
        setTodoList((list) => [...list, todo]);
        setFruitList((list) => list.filter((i) => i !== todo));
        setTimeoutsList((prevTimeouts) => {
          const newTimeouts = { ...prevTimeouts };
          delete newTimeouts[todo.name];
          return newTimeouts;
        });
      }, 5000);
    } else {
      setVegetableList([...vegetableList, todo]);
      timeoutId = setTimeout(() => {
        setTodoList((list) => [...list, todo]);
        setVegetableList((list) => list.filter((i) => i !== todo));
        setTimeoutsList((prevTimeouts) => {
          const newTimeouts = { ...prevTimeouts };
          delete newTimeouts[todo.name];
          return newTimeouts;
        });
      }, 5000);
    }

    // set time outs id
    setTimeoutsList((prevTimeouts) => ({
      ...prevTimeouts,
      [todo.name]: timeoutId,
    }));
  };

  const handleOnClickFromTypeList = (todo: ITodoItem) => {
    const timeoutId = timeoutsList[todo.name]; // If a timeout exists, clear it
    if (timeoutId) {
      clearTimeout(timeoutId);

      // Remove the timeout ID from the state
      setTimeoutsList((prevTimeouts) => {
        const newTimeouts = { ...prevTimeouts };
        delete newTimeouts[todo.name];
        return newTimeouts;
      });
    }

    setTodoList([...todoList, todo]);
    if (todo.type === TodoType.Fruit) {
      setFruitList((list) => list.filter((item) => item !== todo));
    } else {
      setVegetableList((list) => list.filter((item) => item !== todo));
    }
  };

  console.log("timeoutsList :>> ", timeoutsList);

  return (
    <div className="bg-indigo-50 max-w-screen min-h-screen min-w-xs">
      <div className="max-w-5xl mx-auto p-4 md:p-6 md:px-10">
        <h1 className="text-2xl lg:text-4xl font-bold  text-blue-950 text-center">
          Todo list
        </h1>
        <div className="flex flex-col mt-4 md:mt-6 lg:flex-row-reverse gap-4">
          <div className="flex w-full max-w-xl h-[350px] lg:h-[400px] gap-2 lg:gap-4 lg:shrink-0 mx-auto">
            <TypeList
              type={TodoType.Fruit}
              list={fruitList}
              onClickItem={handleOnClickFromTypeList}
            />
            <TypeList
              type={TodoType.Vegetable}
              list={vegetableList}
              onClickItem={handleOnClickFromTypeList}
            />
          </div>

          <div className="flex gap-2 flex-wrap lg:gap-4 justify-center content-baseline mx-auto lg:basis-1/2">
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

export default TodoPage;
