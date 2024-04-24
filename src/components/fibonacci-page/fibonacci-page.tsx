import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-form";
import { getFibonacciNumbers } from "./utils/get-fibonacci-numbers";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({ inputValue: ""});
  const [ loader, setLoader ] = useState(false);
  const [ result, setResult ] = useState<number[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const theFibonacciSequence = getFibonacciNumbers(Number(values.inputValue));
    await setFibonacciArr(theFibonacciSequence);
    setLoader(false);
  }

  const setFibonacciArr = async (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setResult(arr.slice(0, i + 1));
    };
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          placeholder="Введите число"
          type="number"
          max={19}
          isLimitText={true}
          onChange={handleChange}
          value={values.inputValue}
          name="inputValue"
          disabled={loader}
        />
        <Button 
          text="Рассчитать"
          type="submit"
          isLoader={loader}
          disabled={!values.inputValue || Number(values.inputValue) <=0 || Number(values.inputValue) > 19}
        />
      </form>
      { result.length > 0 && (
      <ul className={styles.animation}>
        {result.map((number, index: number) => (
        <li key={index}>
          <Circle 
            index={index}
            letter={number.toString()}
            state={ElementStates.Default}
          />
        </li>
        ))}
      </ul>)}
    </SolutionLayout>
  );
};
