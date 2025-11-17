import { useState } from "react"

function ToDoItem({ todo, onDelete, onToggle, onEdit }){
    // deconstructing todo
    const { id, text, completed } = todo
    // state: editing todo
    const [isEditing, setIsEditing] = useState(false)
    // state: edit todo text
    const [editText, setEditText] = useState(text)

    // function: handle save
    const handleSave = () => {
        const trimmed = editText.trim()
        if (!trimmed) return
        onEdit(id, trimmed)
        setIsEditing(false)
    }

    return (
        <li className={`flex items-center justify-between border rounded-lg px-4 py-3 ${ todo.completed ? "bg-green-50" : "bg-gray-50" }`}>
            <div className="flex items-center gap-3 flex-1">
                <input 
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                />
                {!isEditing ? (
                    <span
                        onDoubleClick={() => setIsEditing(true)}
                        className={`text-lg' ${ completed ? "line-through text-gray-500" : "" }`}
                    >
                        {text}
                    </span>
                ) : (
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border rounded px-2 py-1 flex-1"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") {
                                setIsEditing(false)
                                setEditText(text)
                            }
                        }}
                    />
                )}
            </div>
            <div>
                {!isEditing ? (
                    <>
                        <button 
                            onClick={() => {
                                setIsEditing(true)
                                setEditText(text)
                            }}
                            className="px-3 py-1 border rounded text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => {
                                onDelete(id)
                            }}
                            className="px-3 py-1 border rounded text-red-600 border-red-300 hover:bg-red-50"
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={handleSave}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button 
                            onClick={() => {
                                setIsEditing(false)
                                setEditText(text)
                            }}
                            className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </li>
    )    
}

export default ToDoItem