'use client'

export function HeaderSystemMaximize() {
    const handleMaximize = () => {
        window.ipc.maximizeWindow();
    };

    return (
        <button
            onClick={handleMaximize}
            className="flex items-center justify-center w-10 h-10 text-white rounded-md hover:bg-essential-warning active:bg-yellow-700 focus:outline-none"
            aria-label="Maximize"
            id="maximize"
        >
            <span className="text-lg">&#9744;</span> {/* Usando o símbolo de maximizar */}
        </button>
    );
}
