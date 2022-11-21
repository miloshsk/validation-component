import React, {FC, useState} from 'react';
import classes from './Form.module.scss';

interface FormProps {
    showModal: (value: boolean) => void;
}

const Form: FC<FormProps> = ({showModal}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const checkValidate = (value: string) => {
        const opened = '({[<';
        const closed = ')}]>';
        const arr = value.split('').filter((el) => {
            return opened.indexOf(el) > -1 || closed.indexOf(el) > -1;
        });

        if (!arr.length) return false;

        const stack = [];
        const map: { [index: string]: string } = {
            ')': '(',
            '}': '{',
            ']': '[',
            '>': '<',
        };

        for (let i = 0; i < arr.length; i++) {
            if (opened.indexOf(arr[i]) > -1) {
                stack.push(arr[i])
            } else if (map[arr[i]]) {
                if (map[arr[i]] === stack[stack.length - 1]) {
                    stack.pop();
                }
            }
        }

        return stack.length === 0;
    }

    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const isValid = checkValidate(e.target.value);
        setIsValid(isValid);
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        showModal(true);
        setInputValue('');
        setIsValid(true);
    }

    const setActiveButton = () => {
        return inputValue.length !== 0 && isValid;
    }

    return (
        <form onSubmit={submitForm} className={classes.form}>
            <label>
                <input value={inputValue}
                       onChange={changeInputValue}
                       className={`${classes.input} ${!isValid && classes.error}`}
                       type="text"/>
            </label>
            {!isValid && <p className={classes.errorMessage}>введите валидное значение</p>}
            <button className={`${classes.button} ${!setActiveButton() && classes.disabled}`}
                    type="submit">
                Сохранить
            </button>
        </form>
    );
};

export default Form;