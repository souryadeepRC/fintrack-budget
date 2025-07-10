import { convertDate } from ".";

describe("Utility functions", () => {
  it("validate convertDate with various isoDate", () => {
    expect(convertDate("2025-07-09T10:20:00.000Z")).toEqual("09-Jul-2025");
    expect(convertDate("2025-07-09T10:20:00")).toEqual("09-Jul-2025");
    expect(convertDate("2025-17-09T10:20:00.000Z")).toEqual("");
    expect(convertDate("undefined")).toEqual("");
    expect(convertDate("")).toEqual("");
  });
});
