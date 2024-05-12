import React, { FormEvent, useState, useEffect, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-form";
import { reverseString, setCircleState } from "./utils/reverse-string";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export const StringComponent: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ inputValue: ""});
  const [ steps, setSteps ] = useState<string[][]>([]);
  const [ loader, setLoader ] = useState(false);
  const [ curr, setCurr ] = useState(0);
  const timeInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    getRevercedString(values.inputValue!);
    setValues({inputValue: ""});
  }

  const getRevercedString = (string: string) => {
    const allSteps = reverseString(string);
    setSteps(allSteps);
    setCurr(0);

    if (allSteps.length && string.length > 1) {
      timeInterval.current = setInterval(() => {
        setCurr((step) => {
          const nextStep = step + 1;
          if (nextStep >= allSteps.length -1 && timeInterval.current) {
            setLoader(false);
            clearInterval(timeInterval.current);
          }
          return nextStep;
        });
      }, SHORT_DELAY_IN_MS);
    } else {
      setLoader(false);
    } 
  };

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
      <ul className={styles.animation}>
        {steps[curr]?.map((letter, index) => (
        <li key={index}>
          <Circle 
            letter={letter}
            state={setCircleState(index, curr, steps[curr].length)}
          />
        </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
