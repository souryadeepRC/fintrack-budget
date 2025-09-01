export const convertDate = (date: string): string => {
  try {
    const modifiedDate = new Date(date);
    if (isNaN(modifiedDate.getTime())) throw new Error();
    return modifiedDate.toLocaleDateString("en-US", {
      month: "short", // "May"
      day: "numeric", // "23"
      year: "numeric", // "2025"
    });
  } catch (error) {
    console.error("Invalid Date provided");
    return "";
  }
};
export const formatIsoToDate = (isoDate: string): string => {
  try {
    if (!isoDate) throw new Error("Invalid date input");
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) throw new Error("Invalid date format");

    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Invalid Date provided");
    return "";
  }
};
export const formatToINR = (amount: number): string => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export function calculateDurationInDays(from: Date, to: Date): number {
  return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
}
