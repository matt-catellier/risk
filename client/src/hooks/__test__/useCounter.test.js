import {renderHook, act} from "@testing-library/react-hooks";
import {useCounter} from '../'

describe("useCounter", function() {
  describe("Given no initial value", function() {
    const {result} = renderHook(() => useCounter())
    it("should starts with count = 0", () => {
      expect(result.current.count).toBe(0)
    })
  })

  describe("Given initialValue of 10", function() {
    let result
    beforeEach(function() {
      result = renderHook(() => useCounter(10)).result
    })

    it("should starts with count = 10", function() {
      expect(result.current.count).toBe(10)
    })

    it("When increment, Then count should be 11", () => {
      act(() => { result.current.increment() })
      expect(result.current.count).toBe(11)
    })
  })
})