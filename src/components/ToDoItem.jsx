import { useState, useEffect, useRef } from "react"

function ToDoItem({ todo, onDelete, onToggle, onEdit }){
    // deconstructing todo
    const { id, text, completed } = todo
    // state: editing todo
    const [isEditing, setIsEditing] = useState(false)
    // state: edit todo text
    const [editText, setEditText] = useState(text)
    // state: menu
    const [menuOpen, setMenuOpen] = useState(false)

    const menuRef = useRef(null)

    // effect: close menu
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    // function: handle save
    const handleSave = () => {
        const trimmed = editText.trim()
        if (!trimmed) return
        onEdit(id, trimmed)
        setIsEditing(false)
    }

    return (
        <li className={`flex items-center justify-between border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 ${ completed ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-700" }`}>
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
                        className={`text-base sm:text-lg break-all whitespace-normal flex-1 ${ completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100" }`}
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
                        className="flex-1 border rounded px-2 py-2 bg-white dark:bg-gray-600 dark:text-white"
                    />
                )}
            </div>
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                    ⫶
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-600 rounded-lg z-50">
                        {!isEditing ? (
                            <div>
                                <button 
                                    onClick={() => {
                                        setIsEditing(true)
                                        setEditText(text)
                                        setMenuOpen(false)
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => {
                                        onDelete(id)
                                    }}
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button 
                                    onClick={() => {
                                        setMenuOpen(false)
                                        handleSave()
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false)
                                        setEditText(text)
                                        setMenuOpen(false)
                                    }}
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </li>
    )    
}

export default ToDoItem