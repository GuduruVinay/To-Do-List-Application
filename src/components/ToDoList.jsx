import ToDoItem from "./ToDoItem"

function ToDoList({ todos }){
    if (todos.length === 0) {
        return (
            <p>No tasks yet. Add one above!</p>
        )
    }

    return (
        <ul>
            {
                todos.map((todo) => (
                    <ToDoItem
                        key={todo.id} 
                        todo={todo}
                    />
                ))
            }
        </ul>
    )
}

export default ToDoList