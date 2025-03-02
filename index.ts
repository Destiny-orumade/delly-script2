interface ITodoItem {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: Date;
  }
  
  class TodoList {
    private todos: ITodoItem[] = [];
    private idCounter: number = 1;
  
    // Utility method to find a todo by ID
    private findTodoById(id: number): ITodoItem | undefined {
      return this.todos.find(todo => todo.id === id);
    }
  
    // Add a new todo item
    public addTodo(text: string, dueDate?: Date): void {
      if (!text.trim()) {
        console.error("Error: Todo text cannot be empty.");
        return;
      }
      const newTodo: ITodoItem = {
        id: this.idCounter++,
        text,
        completed: false,
        dueDate,
      };
      this.todos.push(newTodo);
      console.log(`Added: "${text}"${dueDate ? " (Due: " + dueDate.toDateString() + ")" : ""}`);
    }
  
    // Mark a todo as completed
    public completeTodo(id: number): void {
      const todo = this.findTodoById(id);
      if (!todo) {
        console.error(`Error: Todo with ID ${id} not found.`);
        return;
      }
      if (todo.completed) {
        console.warn(`Warning: Todo with ID ${id} is already completed.`);
        return;
      }
      todo.completed = true;
      console.log(`Completed: "${todo.text}"`);
    }
  
    // Remove a todo item
    public removeTodo(id: number): void {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        console.error(`Error: Todo with ID ${id} not found.`);
        return;
      }
      this.todos.splice(index, 1);
      console.log(`Removed todo with ID ${id}`);
    }
  
    // List all todos
    public listTodos(): void {
      if (this.todos.length === 0) {
        console.log("No todos available.");
        return;
      }
      console.log("Todo List:");
      this.todos.forEach(todo => {
        console.log(
          `${todo.id}: [${todo.completed ? "✓" : " "}] ${todo.text}` +
          (todo.dueDate ? ` (Due: ${todo.dueDate.toDateString()})` : "")
        );
      });
    }
  
    // Filter todos by completion status
    public filterTodos(completed: boolean): ITodoItem[] {
      return this.todos.filter(todo => todo.completed === completed);
    }
  
    // Update the text of an existing todo
    public updateTodoText(id: number, newText: string): void {
      if (!newText.trim()) {
        console.error("Error: New text cannot be empty.");
        return;
      }
      const todo = this.findTodoById(id);
      if (!todo) {
        console.error(`Error: Todo with ID ${id} not found.`);
        return;
      }
      todo.text = newText;
      console.log(`Updated Todo ID ${id} to: "${newText}"`);
    }
  
    // Clear all completed todos
    public clearCompletedTodos(): void {
      if (this.todos.every(todo => !todo.completed)) {
        console.warn("Warning: No completed todos to clear.");
        return;
      }
      this.todos = this.todos.filter(todo => !todo.completed);
      console.log("Cleared all completed todos.");
    }
  }
  
  // Example usage
  const myTodoList = new TodoList();
  myTodoList.addTodo("Learn TypeScript", new Date("2025-03-10"));
  myTodoList.addTodo("Build a project");
  myTodoList.listTodos();
  myTodoList.completeTodo(1);
  myTodoList.listTodos();
  myTodoList.updateTodoText(1, "Master TypeScript");
  myTodoList.listTodos();
  myTodoList.removeTodo(2);
  myTodoList.listTodos();
  myTodoList.clearCompletedTodos();
  myTodoList.listTodos();
  