import React, { useState, FormEvent, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-form";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TStackItem, buttonsNames } from "../../types/elements";
import { Stack } from "./utils/stack-class";
import { delay } from "../../utils/utils";


export const StackPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ inputValue: ""});
  const [ loader, setLoader ] = useState(false);
  const [ arr, setArr ] = useState<TStackItem[]>([]);
  const [ stack ] = useState(new Stack<TStackItem>());
  const [ activeButton, setActiveButton ] = useState<buttonsNames | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.add);
    stack.push({
      value: values.inputValue!,
      color: ElementStates.Changing,
    });
    setArr([...stack.elements()]);
    setValues({ inputValue: "" })
    await delay(SHORT_DELAY_IN_MS);
    stack.element()!.color = ElementStates.Default;
    setActiveButton(null);
    setLoader(false);
  };

  const handleRemove = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.remove);
    stack.element()!.color = ElementStates.Changing;
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArr([...stack.elements()]);
    setActiveButton(null);
    setLoader(false);
  }

  const handleReset = async () => {
    setLoader(true);
    setActiveButton(buttonsNames.clear);
    stack.clear(); 
    await delay(SHORT_DELAY_IN_MS);
    setValues({inputValue: ""});
    setArr([...stack.elements()]);
    setLoader(false);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
        <div className={styles.switcher}>
          <Input 
            placeholder="Введите текст"
            maxLength={4}
            isLimitText={true}
            onChange={handleChange}
            value={values.inputValue}
            name="inputValue"
            disabled={loader}
          />
          <Button 
            text="Добавить"
            disabled={loader || !values.inputValue.match(/\d+/g) }
            type="submit"
            isLoader={loader && activeButton === buttonsNames.add}
          />
          <Button 
            text="Удалить"
            disabled={loader || stack.size() === 0}
            onClick={handleRemove}
            type="button"
            isLoader={loader && activeButton === buttonsNames.remove}
          />
        </div>
        <Button 
          text="Очистить"
          disabled={loader || stack.size() === 0}
          onClick={handleReset}
          isLoader={loader && activeButton === buttonsNames.clear}
          />
      </form>
      <ul className={styles.animation}>
        { arr?.map((item, index) => {
          return (
            <li key={index}>
              <Circle 
                letter={item.value}
                state={item.color}
                index={index}
                head={index === stack.size() - 1 ? "top" : ""}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
