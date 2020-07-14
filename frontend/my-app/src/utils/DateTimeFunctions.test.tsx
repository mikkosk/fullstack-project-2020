import { initialState } from "../../data/testData"
import { museumHoursArray, dateToString, addTime, compareTime, isTime } from "./DateTimeFunctions"

describe("FUNCTIONS", () => {
    test("Museum hours array returns array with length of seven", () => {
        const museum = Object.values(initialState.museums.museums)[0]
        const result = museumHoursArray(true, museum);
        expect(result.length).toBe(7)
    })

    test("Date to string return right date in right form", () => {
        const date = new Date('August 1, 1985 20:00:00')
        const result = dateToString(date)
        expect(result).toBe("1.8.1985")
    })

    test("Add time works with positive number", () => {
        const result = addTime("10:00", 70)
        expect(result).toBe("11:10")
    })

    test("Add time works with negative number", () => {
        const result = addTime("10:00", -70)
        expect(result).toBe("08:50")
    })

    test("Adding time over 23:59 still returns 23:59", () => {
        const result = addTime("23:00", 100);
        expect(result).toBe("23:59")
    })

    test("Adding time under 00:00, still returns 00:00", () => {
        const result = addTime("00:10", -100);
        expect(result).toBe("00:00")
    })

    test("Earlier time returns -1 when compares", () => {
        const result = compareTime("00:00", "01:01")
        expect(result).toBe(-1)
    })
    test("Same time returns 0 when compares", () => {
        const result = compareTime("00:00", "00:00")
        expect(result).toBe(0)
    })

    test("Later time returns 1 when compares", () => {
        const result = compareTime("01:01", "00:00")
        expect(result).toBe(1)
    })

    test("'closed' is time", () => {
        const result = isTime("closed")
        expect(result).toBe(true)
    })

    test("correctly shaped time is time", () => {
        const result = isTime("00:00")
        expect(result).toBe(true)
    })

    test("incorrectly shaped time is not time", () => {
        const result = isTime("0:00")
        expect(result).toBe(false)
    })

    test("random string is not time", () => {
        const result = isTime("lol")
        expect(result).toBe(false)
    })
})