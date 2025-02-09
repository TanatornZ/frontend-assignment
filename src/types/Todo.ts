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

type ITimeouts = {[key: string] : NodeJS.Timeout}

export { TodoType };
export type { ITodoItem, ITodoList, ITodoType , ITimeouts };
