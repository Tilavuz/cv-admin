import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ToastContextType {
    text: string;
    handleToast: (text: string) => void;
}

const defaultValue: ToastContextType = {
    text: '',
    handleToast: () => {}
}

export const toastContext = createContext<ToastContextType>(defaultValue);

interface ToastProviderProps {
    children: ReactNode; 
}

export default function ToastContext({ children }: ToastProviderProps) {
    const [text, setText] = useState<string>('')
    const { toast } = useToast()

    function handleToast(text: string) {
        setText(text)
    }

    useEffect(() => {
        if(text !== '') {
            toast({
                description: text
            })
        }
    }, [text])

    return (
        <toastContext.Provider value={{ text, handleToast }}>
            {children}
            <Toaster />
        </toastContext.Provider>
    );
}
