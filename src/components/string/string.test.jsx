import { reverseString } from "./utils/reverse-string";

describe("String", () => {
  const even = "123456";
  const odd = "12345";
  const one = "1";
  const empty = "";

  it("Корректно разворачивает строку с чётным количеством символов", () => {
    expect(
      reverseString(even)[reverseString(even).length - 1].toString()).toBe("6,5,4,3,2,1");
  });

  it("Корректно разворачивает строку с нечетным количеством символов", () => {
    expect(
      reverseString(odd)[reverseString(odd).length - 1].toString()).toBe("5,4,3,2,1");
  });

  it("Корректно разворачивает строку с одним символом", () => {
    expect(
      reverseString(one)[reverseString(one).length - 1].toString()).toBe("1");
  });
  
  it("Корректно разворачивает пустую строку", () => {
    expect(
      reverseString(empty)[0].toString()).toBe("");
  });
});