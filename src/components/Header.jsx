function Header(){
    return (
        <header className="text-center flex flex-col gap-2">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Simple To-Do Application</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add | Edit | Complete | Delete</p>
        </header>
    )
}

export default Header