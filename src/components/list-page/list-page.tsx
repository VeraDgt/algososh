import React, { useState, SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-form";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IListItem, buttonsNames } from "../../types/elements";
import { LinkedList } from "./utils/list-class";
import { delay } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({ inputValue: "", inputIndex: ""});
  const [ loader, setLoader ] = useState(false);
  const [ arr, setArr ] = useState<IListItem[]>([]);
  const [ list ] = useState(new LinkedList<IListItem>());
  const [ activeButton, setActiveButton ] = useState<buttonsNames | null>(null);

  useEffect(() => {
    list.getRandomList();
    setArr([...list.toArray()]);
  }, [list]);


  const handleAddHead = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.addHead);
    let index = 0;
    let newArr = [...arr];
    newArr[index].up = true;
    newArr[index].curr = values.inputValue;
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);
    
    newArr[index].up = false;
    newArr[index].curr = "";
    setArr(newArr);

    list.prepend({ value: values.inputValue!, color: ElementStates.Modified});
    newArr = [...list.toArray()];
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);
  
    newArr[index].color = ElementStates.Default;
    setArr(newArr);
    setValues({ inputValue: "", inputIndex: ""})
    setActiveButton(null);
    setLoader(false);
  };

  const handleAddTail = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.addHead);
    let newArr = [...arr];
    let index = arr.length - 1;
        
    newArr[index].up = true;
    newArr[index].curr = values.inputValue;
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);
    newArr[index].up = false;
    newArr[index].curr = "";
    setArr(newArr);

    list.append({ value: values.inputValue!, color: ElementStates.Modified});
    newArr = [...list.toArray()];
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);

    newArr[index + 1].color = ElementStates.Default;
    setArr(newArr);
    setValues({ inputValue: "", inputIndex: ""})
    setActiveButton(null);
    setLoader(false);
  };

  const handleRemoveHead = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.removeHead);
    let index = 0;
    let newArr = [...arr];
    newArr[index].down = true;
    newArr[index].curr = newArr[index].value;
    newArr[index].value = "";
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);
    
    list.deleteHead();
  
    setArr([...list.toArray()]);
    setValues({ inputValue: "", inputIndex: ""})
    setActiveButton(null);
    setLoader(false);
  };

  const handleRemoveTail = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.removeTail);
    let index = arr.length - 1;
    let newArr = [...arr];
    newArr[index].down = true;
    newArr[index].curr = newArr[index].value;
    newArr[index].value = "";
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);
    
    list.deleteTail();
  
    setArr([...list.toArray()]);
    setValues({ inputValue: "", inputIndex: ""})
    setActiveButton(null);
    setLoader(false);
  };

  const handleAddIndex = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.addIndex);
    let currIndex = Number(values.inputIndex);
    let newArr = [...arr];

    for (let i = 0; i <= currIndex; i++) {

      if (i - 1 >= 0) {
        newArr[i - 1].curr = "";
        newArr[i - 1].up = false;
      }
      newArr[i].curr = values.inputValue!;
      newArr[i].up = true;
      if (i !== currIndex!) {
        newArr[i].color = ElementStates.Changing;
      }
      setArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS)
    }

    list.addByIndex({ value: values.inputValue!, color: ElementStates.Modified}, currIndex!);
    newArr = [...list.toArray()];
    newArr.forEach((item) => {
      item.color = ElementStates.Default;
      item.up = false;
      item.curr = "";
    })

    newArr[currIndex].color = ElementStates.Modified;
    setArr(newArr);
    await delay(SHORT_DELAY_IN_MS);
  
    newArr[currIndex].color = ElementStates.Default;
    setArr(newArr);
    setValues({ inputValue: "", inputIndex: ""})
    setActiveButton(null);
    setLoader(false);
  }

  const handleRemoveIndex = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    setActiveButton(buttonsNames.removeIndex);
    let currIndex = Number(values.inputIndex);
    let newArr = [...arr];

    for (let i = 0; i <= currIndex; i++) {
      newArr[i].color = ElementStates.Changing;

      if (i === currIndex) {
        newArr[i].curr = newArr[i].value;
        newArr[i].down = true;
        newArr[i].value = "";
        newArr[i].color = ElementStates.Default;
      }
      
      setArr([...newArr]);
      await delay(SHORT_DELAY_IN_MS)
    }

    list.deleteByIndex(currIndex);
    newArr = [...list.toArray()];
    newArr.forEach((item) => {
      item.color = ElementStates.Default;
      item.down = false;
      item.curr = "";
    })

    setArr(newArr);
    setValues({ inputValue: "", inputIndex: ""})
    setActiveButton(null);
    setLoader(false);
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.switcher}>
          <Input 
            extraClass={styles.input}
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            onChange={handleChange}
            value={values.inputValue}
            name="inputValue"
            disabled={loader}
          />
          <Button 
            extraClass={styles.buttonSmall}
            text="Добавить в head"
            name="addHead"
            disabled={(loader && activeButton !== buttonsNames.addHead) || values.inputValue === ""}
            type="button"
            isLoader={loader && activeButton === buttonsNames.addHead}
            onClick={handleAddHead}
          />
          <Button 
            extraClass={styles.buttonSmall}
            text="Добавить в tail"
            name="addTail"
            disabled={(loader && activeButton !== buttonsNames.remove) || values.inputValue === ""}
            type="button"
            isLoader={loader && activeButton === buttonsNames.remove}
            onClick={handleAddTail}
          />
          <Button 
            extraClass={styles.buttonSmall}
            text="Удалить из head"
            name="removeHead"
            disabled={(loader && activeButton !== buttonsNames.removeHead) || arr.length === 0}
            type="button"
            onClick={handleRemoveHead}
            isLoader={loader && activeButton === buttonsNames.removeHead}
          />
        <Button 
          extraClass={styles.buttonSmall}
          text="Удалить из tail"
          name="removeTail"
          disabled={(loader && activeButton !== buttonsNames.removeTail) || arr.length === 0}
          type="button"
          onClick={handleRemoveTail}
          isLoader={loader && activeButton === buttonsNames.removeTail}
          />
        </div>
        <div className={styles.switcher}>
          <Input 
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={4}
            isLimitText={false}
            onChange={handleChange}
            value={values.inputIndex}
            name="inputIndex"
            disabled={loader}
          />
          <Button 
            extraClass={styles.buttonLarge}
            text="Добавить по индексу"
            name="addIndex"
            disabled={(loader && activeButton !== buttonsNames.addIndex) || values.inputIndex === "" || values.inputValue === "" || Number(values.inputIndex) >= arr.length}
            type="button"
            onClick={handleAddIndex}
            isLoader={loader && activeButton === buttonsNames.addIndex}
          />
          <Button 
            extraClass={styles.buttonLarge}
            text="Удалить по индексу"
            name="removeIndex"
            disabled={(loader && activeButton !== buttonsNames.removeIndex) || values.inputIndex === "" || Number(values.inputIndex) >= arr.length}
            onClick={handleRemoveIndex}
            type="button"
            isLoader={loader && activeButton === buttonsNames.removeIndex}
          />
        </div>
      </form>
      <ul className={styles.animation}>
        { arr.map((item, index) => {
          return (
            <li key={index} className={styles.animationEl}>
              <Circle 
                letter={item?.value}
                state={item?.color}
                index={index}
                head={index === 0 && !item.up ? 
                  'head' : item.up ? <Circle 
                  letter={item.curr}
                  isSmall={true}
                  state={ElementStates.Changing}
                  /> : ''}
                tail={index === arr.length - 1 && !item.down ? 
                  'tail' : item.down ? <Circle 
                  letter={item.curr}
                  isSmall={true}
                  state={ElementStates.Changing}
                  /> : ''}
              />
              {index !== arr.length-1 && <ArrowIcon />}
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
