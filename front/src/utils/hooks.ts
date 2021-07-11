import React, { useState } from 'react';

// Creating a custom hook
export function useInput(defaultValue: any) {
    const [value, setValue] = useState(defaultValue);
    function onChange(e: any) {
        console.log(value)
        setValue(e.target.value);
    }

    return {
        value,
        onChange,
    };
}