
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';

type ValidationResult = string | void;

export const lengthValidation = (value: string): ValidationResult => {
    if (value.length < 4) {
        return "Must be at least 4 characters";
    }
};

type FormValues = {
    [key: string]: any;
};

type FormErrors = {
    [key: string]: string[];
};

interface FormProps {
    [key: string]: ReturnType<typeof useInput>;
}

export const useForm = (inputs: FormProps = {}, submit: (e: React.SyntheticEvent) => void) => {
    let [errors, setErrors] = useState<FormValues>({});
    let [values, setValues] = useState<FormErrors>({});

    useEffect(() => {
        let newValues: FormValues = {};
        let newErrors: FormErrors = {};
        // @ts-ignore
        Object.entries(inputs).forEach(([k, v]) => {
            newValues[k] = v.value;
            newErrors[k] = v.errors;
        });
        if (values !== newValues) setValues(newValues);
        if (errors !== newErrors) setErrors(newErrors);
    });

    // @ts-ignore
    const isValidating = Object.values(inputs).some(input => input.isValidating);
    const isValid =
        // @ts-ignore
        !isValidating && Object.values(inputs).every(input => input.isValid);

    return {
        submit,
        values,
        errors,
        isValid,
        isValidating,
        reset: useCallback(() => {
            Object.values(inputs).forEach(input => input.reset());
        }, [inputs]),
        clear: useCallback(() => {
            Object.values(inputs).forEach(input => input.clear());
        }, [inputs])
    };
};

type Validation = (value: any) => Promise<ValidationResult> | ValidationResult;

interface UseInputOptions {
    validations?: Validation[];
}

export function useInput<T extends any>(
    initial: T,
    { validations = [] }: UseInputOptions
) {
    const [value, setValue] = useState<T>(initial);
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const onChange = useCallback(e => {
        if (e.target.type === "checkbox") {
            setValue(e.target.checked);
        } else {
            setValue(e.target.value);
        }
    }, []);

    useEffect(
        () => {
            setIsValidating(true);
            let newErrors: string[] = [];
            Promise.all(
                validations.map(async validation => {
                    const result = await validation(value);
                    if (result) {
                        newErrors.push(result);
                    }
                })
            );
            setErrors(newErrors);
            setIsValidating(false);
        },
        [value]
    );

    const isValid = errors.length === 0;

    return {
        value,
        setValue,
        errors,
        setErrors,
        clear: useCallback(() => {
            if (typeof initial === "string") {
                setValue("" as any);
            }
        },
            []
        ),
        reset: useCallback(() => setValue(initial), [initial]),
        onChange,
        touched,
        onBlur: useCallback(() => {
            setTouched(true);
        },
            []
        ),
        setTouched,
        isValid,
        isValidating
    };
}

interface InputContainerProps {
    children: any;
    label?: string;
    input: ReturnType<typeof useInput>;
}

export function InputContainer({
    children,
    label,
    input
}: InputContainerProps) {
    return (
        <div className="input">
            <div>
                {label && <label htmlFor="">{label}</label>} <br/>
                {children}
            </div>
            {input.touched &&
                input.errors &&
                input.errors.length > 0 && (
                    <div className="errors">
                        Error: {input.errors.map((error, i) => <li key={i}>{error}</li>)}
                    </div>
                )}
        </div>
    );
}
