import React, { useState, FormEvent, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-form";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { buttonsNames, TStackItem } from "../../types/elements";
import { Queue } from "./utils/queue-class";
import { delay } from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ inputValue: ""});
  const [ loader, setLoader ] = useState(false);
  const [ arr, setArr ] = useState<TStackItem[]>([]);
  const [ queue ] = useState(new Queue<TStackItem>(7));
  const [ activeButton, setActiveButton ] = useState<buttonsNames | null>(null);

  useEffect(() => {
    setArr([...queue.elements()]);
  }, [queue])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.add);
    queue.enqueue({
      value: values.inputValue!,
      color: ElementStates.Changing,
    });
    setArr([...queue.elements()]);
    setValues({ inputValue: "" })
    await delay(SHORT_DELAY_IN_MS);
    queue.elements()[queue.tail -1]!.color = ElementStates.Default;
    setActiveButton(null);
    setLoader(false);
  };

  const handleRemove = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.remove);
    queue.element()!.color = ElementStates.Changing;
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArr([...queue.elements()]);
    setActiveButton(null);
    setLoader(false);
  }

  const handleReset = async () => {
    setLoader(true);
    setActiveButton(buttonsNames.clear);
    queue.clear(); 
    await delay(SHORT_DELAY_IN_MS);
    setValues({inputValue: ""});
    setArr([...queue.elements()]);
    setLoader(false);
  }


  return (
    <SolutionLayout title="Очередь">
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
            disabled={loader || queue.tail === 7 || !values.inputValue }
            type="submit"
            isLoader={loader && activeButton === buttonsNames.add}
          />
          <Button 
            text="Удалить"
            disabled={loader || queue.isEmpty()}
            onClick={handleRemove}
            type="button"
            isLoader={loader && activeButton === buttonsNames.remove}
          />
        </div>
        <Button 
          text="Очистить"
          disabled={loader || (queue.isEmpty() && queue.head === 0 && queue.tail === 0)}
          onClick={handleReset}
          isLoader={loader && activeButton === buttonsNames.clear}
          />
      </form>
      <ul className={styles.animation}>
        { arr.map((item, index) => {
          return (
            <li key={index}>
              <Circle 
                letter={item?.value}
                state={item?.color}
                index={index}
                head={!queue.isEmpty() && index === queue.head ? 'head' : ''}
                tail={!queue.isEmpty() && index === queue.tail - 1 ? 'tail' : ''}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
