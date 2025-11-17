import ToDoItem from "./ToDoItem"

function ToDoList({ todos, onDelete, onToggle, onEdit }){
    if (todos.length === 0) {
        return <p className="text-center text-gray-500 mt-6">No Tasks Yet !</p>
    }

    return (
        <ul className="mt-6 space-y-3">
            {
                todos.map((todo) => (
                    <ToDoItem
                        key={todo.id} 
                        todo={todo}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                    />
                ))
            }
        </ul>
    )
}

export default ToDoList