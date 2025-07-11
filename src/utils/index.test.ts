import { convertDate, formatIsoToDate } from ".";

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
});
