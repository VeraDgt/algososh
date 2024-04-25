import React, { useEffect, useState, MouseEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { randomArr } from "./utils/sort-array";
import { TArrItem } from "../../types/elements";
import { useForm } from "../../hooks/use-form";
import { selectionSort, bubbleSort } from "./utils/sort-array";


export const SortingPage: React.FC = () => {
  const [ loader, setLoader ] = useState(false);
  const [ arr, setArr ] = useState<TArrItem[]>([]);
  const { values, handleChange } = useForm({ sorting: "choice"});
  const [ direction, setDirection ] = useState("asc");

  useEffect(() => {
    setArr(randomArr());
  }, []);

  const getRandomArr = (e: MouseEvent) => {
    e.preventDefault();
    setArr(randomArr());
  }

  const sortArr = () => {
    if(values.sorting === "choice") {
      return selectionSort(arr, direction, setArr, setLoader);
    } else {
      return bubbleSort(arr, direction, setArr, setLoader);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sortArr();
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.switcher}>
          <RadioInput 
            label="Выбор"
            disabled={loader}
            name="sorting"
            value="choice"
            onChange={handleChange}
            defaultChecked
            />
          <RadioInput 
            label="Пузырек"
            disabled={loader}
            name="sorting"
            value="bubble"
            onChange={handleChange}
            />
        </div>
        <div className={styles.directions}>
          <Button 
            text="По возрастанию"
            sorting={Direction.Ascending}
            disabled={loader && direction === "desc"}
            onClick={() => setDirection("asc")}
            type="submit"
            isLoader={loader && direction === "asc"}
          />
          <Button 
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={loader && direction === "asc"}
            onClick={() => setDirection("desc")}
            type="submit"
            isLoader={loader && direction === "desc"}
          />
        </div>
        <Button 
          text="Новый массив"
          disabled={loader}
          onClick={getRandomArr}
          />
      </form>
      <ul className={styles.animation}>
        { arr?.map((item, index) => {
          return (
            <li key={index}>
              <Column 
              index={item?.value}
              state={item?.color}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
