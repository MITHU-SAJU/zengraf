
function downloadExcel(tableId, filename) {
  const table = document.getElementById(tableId);
  const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

function filterTable(tableId, columnIndex, filterValue) {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach(row => {
    const cell = row.cells[columnIndex];
    if (!filterValue || cell.textContent === filterValue) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}



function searchTable(tableId, columnIndex, input) {
  const filter = input.value.toLowerCase();
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  for (let row of rows) {
    const cell = row.getElementsByTagName("td")[columnIndex];
    const text = cell.textContent || cell.innerText;
    row.style.display = text.toLowerCase().includes(filter) ? "" : "none";
  }
}