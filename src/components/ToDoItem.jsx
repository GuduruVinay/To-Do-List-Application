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
        <li>
            <div>
                <input 
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                />
                {!isEditing ? (
                    <span onDoubleClick={() => setIsEditing(true)}>
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
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => {
                                onDelete(id)
                            }}
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleSave}>
                            Save
                        </button>
                        <button onClick={() => {
                            setIsEditing(false)
                            setEditText(text)
                        }}>
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </li>
    )    
}

export default ToDoItem