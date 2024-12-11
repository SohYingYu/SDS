import Papa from 'papaparse';

export const loadCSV = (filePath, callback) => {
  fetch(filePath)
    .then((response) => response.text())
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true, // Parse the CSV with headers
        complete: (result) => {
          callback(result.data); // Return parsed data
        },
      });
    });
};
