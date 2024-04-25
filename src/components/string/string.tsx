import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-form";
import { reverseString } from "./utils/reverse-string";
import { ElementStates } from "../../types/element-states";

export type TArrString = {
  value: string;
  color: ElementStates;
}

export const StringComponent: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ inputValue: ""});
  const [ loader, setLoader ] = useState(false);
  const [ arr, setArr ] = useState<Array<TArrString>>([]);
  const stringArr: TArrString[] = values.inputValue.split('').map(value => ({
    value, color: ElementStates.Default
  }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await reverseString(stringArr, setArr, setLoader)
    setValues({inputValue: ""});
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          placeholder="Введите текст"
          maxLength={11}
          isLimitText={true}
          onChange={handleChange}
          value={values.inputValue}
          name="inputValue"
          disabled={loader}
        />
        <Button 
          text="Развернуть"
          type="submit"
          isLoader={loader}
          disabled={!values.inputValue}
        />
      </form>
      { arr.length > 0 && (
      <ul className={styles.animation}>
        {arr.map((curr: TArrString, index: number) => (
        <li key={index}>
          <Circle 
            letter={curr.value}
            state={curr.color}
          />
        </li>
        ))}
      </ul>)}
    </SolutionLayout>
  );
};
