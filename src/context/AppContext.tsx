"use client"
import { createContext, useState } from "react";

type ProviderProps = {
    children: React.ReactNode; // 👈 children prop type
};


const AppContext = createContext<{
    selectedLocation: string;
    selectedConcepts: any[];
    setSelectedLocation: (arg: string) => void;
    setSelectedConcepts: (arg: any) => void;
}>({
    selectedLocation: '',
    selectedConcepts: [],
    setSelectedLocation: () => null,
    setSelectedConcepts: () => null
});


const AppContextProvider = (props: ProviderProps) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedConcepts, setSelectedConcepts] = useState([]);

    return (
        <AppContext.Provider value={{ selectedLocation, selectedConcepts, setSelectedLocation, setSelectedConcepts }}>
            {props.children}
        </AppContext.Provider>
    )
}
export {
    AppContext,
    AppContextProvider
};