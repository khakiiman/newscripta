import clsx from "clsx"

const Input = ({ label, id, type, required, register, errors, disabled }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    type={type}
                    disabled={disabled}
                    id={id}
                    autoComplete={id}
                    {...register(id, { required })}
                    className={clsx(`
                 input
                form-input
                block 
                w-full 
                rounded-md 
                border-0 
                py-1.5 
                px-1
                text-gray-900 
                shadow-sm 
                ring-1 
                ring-inset 
                ring-gray-300 
                placeholder:text-gray-400 
                focus:ring-2 
                focus:ring-inset 
                focus:ring-gray-600 
                sm:text-sm 
                sm:leading-6`,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
}

export default Input