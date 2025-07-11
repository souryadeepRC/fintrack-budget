export const convertDate = (date: string): string => {
  try {
    const modifiedDate = new Date(date);
    if (isNaN(modifiedDate.getTime())) throw new Error();
    return modifiedDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
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
