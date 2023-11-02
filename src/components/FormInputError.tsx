import React from "react";

export type FormInputErrorProps = {
    message?: string
}

export const FormInputError: React.FC<FormInputErrorProps> = ({message}) => {

    return (
        <div className={`text-xs text-red-600 ${message ? 'block' : 'invisible'}`}>{message || '&nbsp;'}</div>
    )
}

export default FormInputError;
