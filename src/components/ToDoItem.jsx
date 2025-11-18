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
        <li className={`flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 ${ completed ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-700" }`}>
            <div className="flex items-center gap-3 flex-1">
                <input 
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    className="w-5 h-5 accent-blue-600"
                />
                {!isEditing ? (
                    <span
                        onDoubleClick={() => setIsEditing(true)}
                        className={`text-lg break-words ${ completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100" }`}
                    >
                        {text}
                    </span>
                ) : (
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") {
                                setIsEditing(false)
                                setEditText(text)
                            }
                        }}
                        autoFocus
                        className="flex-1 border rounded px-2 py-1 bg-white dark:bg-gray-600 dark:text-white"
                    />
                )}
            </div>
            <div className="flex items-center gap-2 ml-4">
                {!isEditing ? (
                    <>
                        <button 
                            onClick={() => {
                                setIsEditing(true)
                                setEditText(text)
                            }}
                            className="px-3 py-1 border rounded text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => {
                                onDelete(id)
                            }}
                            className="px-3 py-1 border rounded text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                            className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/40"
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