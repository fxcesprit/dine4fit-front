import type { FC } from 'react'
import { Button, Stack } from 'react-bootstrap'
import './InputField.css'

interface ISearchProps {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

const InputField: FC<ISearchProps> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск' }) => (
    <div className="inputField">
        <form onSubmit={onSubmit}>
            <Stack direction='horizontal'>
                <input value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
            </Stack>
        </form>
    </div>
)

export default InputField