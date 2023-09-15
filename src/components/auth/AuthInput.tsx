interface AuthInputProps {
    label: string
    value: any
    required?: boolean
    notShowed?: boolean
    type?: 'text' | 'email' | 'password'
    onChange: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return props.notShowed ? null : (
        <div className={`flex flex-col mt-4`}>
            <label>{props.label}</label>
            <input 
                type={props.type ?? 'text'}
                value={props.value}
                onChange={e => props.onChange?.(e.target.value)}
                required={props.required}
                className={`
                    px-4 py-3 rounded-lg mt-2
                    bg-gray-100 focus:bg-gray-300
                    border focus:border-blue-400
                    focus:outline-none
                `}
            />
        </div>
    )
}