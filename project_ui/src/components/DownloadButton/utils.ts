export const fetchEmployees = async () => {
    const response = await fetch('http://localhost:3001/teamtailor/employee');
    if (!response.ok) {
      throw new Error('Failed to download CSV');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};
