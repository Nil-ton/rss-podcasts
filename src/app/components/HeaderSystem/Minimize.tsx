'use client'
export function HeaderSystemMinimize() {
    const handleMinimize = () => {
        window.ipc.minimizeWindow();
    };

    return (
        <button
            onClick={handleMinimize}
            className="flex items-center justify-center w-10 h-10 text-white rounded-md hover:bg-gray-600 active:bg-gray-500 focus:outline-none"
            aria-label="Minimize"
            id="minimize"
        >
            <span className="text-lg">-</span>
        </button>
    );
}