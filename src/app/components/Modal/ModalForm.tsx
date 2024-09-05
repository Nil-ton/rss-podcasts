'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { stateManager } from "../../stateManager";
import { useState } from "react";

const createSchema = z.object({
    url: z.string().url('Insira uma URL válida') // Adiciona validação de URL
});

type FormData = z.infer<typeof createSchema>;

export function DialogForm() {
    const setIsOpen = stateManager.useDialogControl((state) => state.setIsOpen)
    const setRecentlyPodcasts= stateManager.useRecentlyAddedPodcasts((state) => state.setItems)
    const setPodcastss= stateManager.usePodcasts((state) => state.setItems)
    const [isLoading, setIsloadingRequest] = useState(false)
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        resolver: zodResolver(createSchema),
    });

    // Defina o tipo da função onSubmit
    const onSubmit = async (data: FormData) => {
        try {
            setIsloadingRequest(true)
            await window.ipc.handle('rss-save', data.url)
            await setRecentlyPodcasts(1, 4)
            await setPodcastss()
            setIsOpen(false)
        } catch (error) {
            const errorMessage = error.message.replace(/Error invoking remote method 'rss-save': Error: /, '');
            setError("url", { message: errorMessage });
        }
        setIsloadingRequest(false)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end my-4 rounded-lg">
            <input
                {...register('url')}
                type="text"
                className="w-full px-4 py-2 text-white bg-background-elevated-highligh border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="Cole o URL RSS aqui"
                data-test="rss-url-input"
            />

            {errors.url && (
                <p className="text-essential-negative text-sm mt-1">{errors.url.message}</p>
            )}

            <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} type="button" className="mt-4 px-6 py-2 bg-background-elevated-highligh text-white rounded-md hover:bg-background focus:outline-none focus:ring-0 focus:ring-blue-500 transition duration-200 ease-in-out">
                    Fechar
                </button>
                
                <button data-test="rss-save-button" type="submit" disabled={isLoading} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out">
                    {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
            </div>

        </form>
    );
}
