import { reactive, isReactive } from "../reactive";

describe("reactive test", () => {
  it("happly path", () => {
    let original = { age: 1 };
    let observed = reactive({
      age: 1,
    });
    expect(original).not.toBe(observed);
    expect(original.age).toBe(1);
    expect(observed.age).toBe(1);
  });

  it("isReadonly", () => {
    const original = reactive({
      age: 1,
    });
    const primeval = {
      age: 1,
    };
    expect(isReactive(original)).toBe(true);
    expect(isReactive(primeval)).toBe(false);
  });
});
