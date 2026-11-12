import { useEffect, useState } from "react";

export default function UseLocalStorageState(key,initialValue){
        const [value,setValue] = useState(() => {
            try {
                const savedValue = localStorage.getItem(key);
                return savedValue === null 
                    ? initialValue
                    : JSON.parse(savedValue);
            } catch (error) {
                return initialValue;
            }
        });

        useEffect(() => {
            try {
                localStorage.setItem(key,JSON.stringify(value))
            } catch (error) {
                
            }
        },[key,value]);

        return [value,setValue];
}