import { TArrItem } from "../../types/elements";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { selectionSort, bubbleSort } from "./utils/sort-array";



describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  const emptyArr: TArrItem[] = [];

  const oneElArr: TArrItem[] = [{ value: 1, color: ElementStates.Default }];
  const oneElArrSorted: TArrItem[] = [{ value: 1, color: ElementStates.Modified }];

  const sortedArrAsc: TArrItem[] = [
    { value: 1, color: ElementStates.Modified },
    { value: 2, color: ElementStates.Modified },
    { value: 3, color: ElementStates.Modified },
    { value: 4, color: ElementStates.Modified },
  ];
  const sortedArrDesc: TArrItem[] = [
    { value: 3, color: ElementStates.Modified },
    { value: 3, color: ElementStates.Modified },
    { value: 2, color: ElementStates.Modified },
    { value: 1, color: ElementStates.Modified },
  ];

  const mockSetArr = jest.fn();
  const mockSetLoader = jest.fn();

  it("Сортировка выбором пустого массива по возрастанию", async () => {
    await selectionSort(emptyArr, Direction.Ascending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });
  it("Сортировка выбором пустого массива по убыванию", async () => {
    await selectionSort(emptyArr, Direction.Descending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });

  it("Сортировка выбором массива из 1 элемента по возрастанию", async () => {
    await selectionSort(oneElArr, Direction.Ascending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Сортировка выбором массива из 1 элемента по убыванию", async () => {
    await selectionSort(oneElArr, Direction.Descending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });

  it("Сортировка выбором массива из нескольких элементов по возрастанию", async () => {
    await selectionSort(sortedArrAsc, Direction.Ascending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrAsc);
  });
  it("Сортировка выбором массива из нескольких элементов по убыванию", async () => {
    await selectionSort(sortedArrDesc, Direction.Descending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrDesc);
  });

  it("Сортировка пузырьком пустого массива по возрастанию", async () => {
    await bubbleSort(emptyArr, Direction.Ascending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });
  it("Сортировка пузырьком пустого массива по убыванию", async () => {
    await bubbleSort(emptyArr, Direction.Descending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });

  it("Сортировка пузырьком массива из 1 элемента по возрастанию", async () => {
    await bubbleSort(oneElArr, Direction.Ascending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Сортировка пузырьком массива из 1 элемента по убыванию", async () => {
    await bubbleSort(oneElArr, Direction.Descending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });

  it("Сортировка пузырьком массива из нескольких элементов по возрастанию", async () => {
    await bubbleSort(sortedArrAsc, Direction.Ascending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrAsc);
  });
  it("Сортировка пузырьком массива из нескольких элементов по убыванию", async () => {
    await bubbleSort(sortedArrDesc, Direction.Descending, mockSetArr, mockSetLoader);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedArrDesc);
  });
});

