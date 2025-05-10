#!/usr/bin/env node

//1) Create a Todo app CLI too with following functionality
//show => return all todos
//add todoName => return new todo
//	delete todoId => delete todoitem
//	update todoId todoName => update each todo
//	use fs module and commander

const { Command } = require("commander");
const { readFile } = require("./utils");
const fs = require("fs/promises");

const program = new Command();
program.name("test cli with commander").description("test").version("1.0.0");

program
  .command("add")
  .argument("<todo>")
  .action(async (todo) => {
    console.log(todo);

    const data = await readFile("todo.json", true);
    const lastId = data[data.length - 1]?.id || 0;

    const newTodo = {
      id: lastId + 1,
      todo: todo,
    };

    data.push(newTodo);
    await fs.writeFile("todo.json", JSON.stringify(data));
  });

program
  .command("delete")
  .argument("<id>")
  .action(async (id) => {
    console.log(id);
    const data = await readFile("todo.json", true);

    const filteredTodo = data.filter((data) => data.id !== Number(id));

    await fs.writeFile("todo.json", JSON.stringify(filteredTodo));
  });

program
  .command("remake")
  .argument("<id>")
  .argument("<name>")
  .action(async (id, name) => {
    const data = await readFile("todo.json", true);
    const filteredTodo = data.filter((data) => data.id !== Number(id));

    const newTodo = {
      id: Number(id),
      newName: name,
    };

    filteredTodo.push(newTodo);

    await fs.writeFile("todo.json", JSON.stringify(filteredTodo));
  });

program.command("show").action(async () => {
  const data = await readFile("todo.json", true);
  console.log(data);
});

program.parse();
