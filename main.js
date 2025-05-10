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

program.parse();
