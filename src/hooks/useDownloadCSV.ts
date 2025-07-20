const useDownloadCSV = (type: string) => {
  function camelToSentenceCaseArray(arr: string[]) {
    return arr.map((prop) => {
      // Insert a space before all caps and lowercase the rest
      const sentence = prop
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
        .trim(); // Remove leading/trailing spaces

      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    });
  }
  const downloadCSV = (entries: any) => {
    const csvRows = [];

    // Extract headers
    const headers = Object.keys(entries[0]);
    csvRows.push(camelToSentenceCaseArray(headers).join(","));

    // Map rows
    for (const row of entries) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    // Create blob and trigger download
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `All_${type}s.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return downloadCSV;
};

export default useDownloadCSV;
