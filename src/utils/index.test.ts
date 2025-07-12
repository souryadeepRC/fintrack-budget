import { convertDate, formatIsoToDate, formatToINR } from ".";

describe("Utility functions", () => {
  it("validate convertDate with various isoDate", () => {
    expect(convertDate("2025-07-09T10:20:00.000Z")).toEqual("09-Jul-2025");
    expect(convertDate("2025-07-09T10:20:00")).toEqual("09-Jul-2025");
    expect(convertDate("2025-17-09T10:20:00.000Z")).toEqual("");
    expect(convertDate("undefined")).toEqual("");
    expect(convertDate("")).toEqual("");
  });
  it("validate formatIsoToDate with various isoDate", () => {
    expect(formatIsoToDate("2025-07-09T10:20:00.000Z")).toEqual("2025-07-09");
    expect(formatIsoToDate("2025-07-09T10:20:00")).toEqual("2025-07-09");
    expect(formatIsoToDate("2025-17-09T10:20:00.000Z")).toEqual("");
    expect(formatIsoToDate("undefined")).toEqual("");
    expect(formatIsoToDate("")).toEqual("");
  });
  it("should format numbers into Indian currency format correctly", () => {
    expect(formatToINR(1000000)).toBe("10,00,000");
    expect(formatToINR(1234.56)).toBe("1,234.56");
    expect(formatToINR(1234)).toBe("1,234");
    expect(formatToINR(1234.5)).toBe("1,234.50");
    expect(formatToINR(0)).toBe("0");
    expect(formatToINR(0.01)).toBe("0.01");
    expect(formatToINR(999.999)).toBe("1,000.00"); // rounds up
    expect(formatToINR(-100000)).toBe("-1,00,000");
    expect(formatToINR(100.1)).toBe("100.10");
    expect(formatToINR(100.0)).toBe("100");
  });
});
