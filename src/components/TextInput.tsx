interface TextInputProps {
    id?: string;
    name: string;
    type?: 'text' | 'email';
    required?: boolean;
}

const TextInput = ({ id, type = 'text', name, required }: TextInputProps) => {
    return (
        <input
            id={id}
            className="block w-full text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green"
            type={type}
            name={name}
            required={required}
        />
    );
}

export default TextInput;