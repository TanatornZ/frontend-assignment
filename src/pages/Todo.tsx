import { useState } from "react";
import { ITodoList , ITodoItem , TodoType} from "../Types/Todo";
import { TodoItem } from "../Components/TodoItem";
import { TypeList } from "../Components/TypeList";
import { todoData } from "../data";

function TodoPage() {
  const [todoList, setTodoList] = useState(todoData);
  const [fruitList, setFruitList] = useState<ITodoList>([]);
  const [vegatableList, setVegatableList] = useState<ITodoList>([]);
  const [timeouts, setTimeouts] = useState<{[key: string] : number}>({}); // Store timeout IDs


  const handleOnClickFromTodoList = (todo: ITodoItem) => {
    const newTodoList = todoList.filter((item) => item !== todo);
    setTodoList(newTodoList);

    var timeoutId : number
    if (todo.type === TodoType.Fruit) {
      setFruitList([...fruitList, todo]);
      
      timeoutId = setTimeout(() => {
        setTodoList((list) => [...list, todo]);
        setFruitList((list) => list.filter((i) => i !== todo));

        setTimeouts((prevTimeouts) => {
          const newTimeouts = { ...prevTimeouts };
          delete newTimeouts[todo.name]
          return newTimeouts;
        });
      }, 5000);
    } else {
      setVegatableList([...vegatableList, todo]);
      timeoutId = setTimeout(() => {
        setTodoList((list) => [...list, todo]);
        setVegatableList((list) => list.filter((i) => i !== todo));

        setTimeouts((prevTimeouts) => {
          const newTimeouts = { ...prevTimeouts };
          delete newTimeouts[todo.name]
          return newTimeouts;
        });
      }, 5000);
    }

    // set time outs id
    setTimeouts((prevTimeouts) => ({
      ...prevTimeouts,
      [todo.name]: timeoutId,
    }));
  };

  const handleOnClickFromTypeList = (todo: ITodoItem) => {
    const timeoutId = timeouts[todo.name];    // If a timeout exists, clear it
    if (timeoutId) {
      clearTimeout(timeoutId);

      // Remove the timeout ID from the state
      setTimeouts((prevTimeouts) => {
        const newTimeouts = { ...prevTimeouts };
        delete newTimeouts[todo.name];
        return newTimeouts;
      });
    }

    setTodoList([...todoList, todo]);
    if (todo.type === TodoType.Fruit) {
      setFruitList((list) => list.filter((item) => item !== todo));
    } else {
      setVegatableList((list) => list.filter((item) => item !== todo));
    }
  };

  return (
    <div className="bg-indigo-50 w-screen h-screen  min-w-xs">
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

export default TodoPage;