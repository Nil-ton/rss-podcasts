'use client'

export function HeaderSystemClose() {
    const handleClose = () => {
        window.ipc.closeWindow();
    };

    return (
        <button
            onClick={handleClose}
            className="flex items-center justify-center w-10 h-10 bg-red-700 text-white rounded-md hover:bg-essential-negative active:bg-essential-negative focus:outline-none"
            aria-label="Close"
            id="close"
        >
            <span className="text-lg">&times;</span> {/* Usando o símbolo × para fechar */}
        </button>
    );
}
