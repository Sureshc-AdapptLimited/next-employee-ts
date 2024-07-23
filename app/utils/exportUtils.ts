export const convertToCSV = (data: any[]): string => {
  const array = [Object.keys(data[0])].concat(data);

  return array
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          const formattedValue =
            typeof value === "string" ? value.replace(/"/g, '""') : value;
          return `"${formattedValue}"`;
        })
        .join(",");
    })
    .join("\n");
};

export const downloadCSV = (csvContent: string, fileName: string) => {
  const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(csvBlob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
