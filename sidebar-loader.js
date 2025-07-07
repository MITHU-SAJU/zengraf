
  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');
    });
  });

  

  const toggles = document.querySelectorAll(".popup-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const container = this.closest(".popup-container");

      // Close other popups
      document.querySelectorAll(".popup-container").forEach(c => {
        if (c !== container) c.classList.remove("show");
      });

      // Toggle current popup
      container.classList.toggle("show");
    });
  });

  // Close popup if clicked outside
  window.addEventListener("click", function () {
    document.querySelectorAll(".popup-container").forEach(c => c.classList.remove("show"));
  });

  document.querySelectorAll('.status-td').forEach(td => {
    td.addEventListener('click', function (e) {
      e.stopPropagation();

      // Close all open popups first
      document.querySelectorAll('.status-popup').forEach(popup => popup.classList.remove('show'));

      const popup = this.querySelector('.status-popup');
      if (popup) popup.classList.toggle('show');
    });
  });

  // Click outside closes popup
  window.addEventListener('click', () => {
    document.querySelectorAll('.status-popup').forEach(popup => popup.classList.remove('show'));
  });


  const statusFilter = document.getElementById("statusFilter");
  const worktypeFilter = document.getElementById("worktypeFilter");
  const customerFilter = document.getElementById("customerFilter");
  const applyFilterBtn = document.getElementById("applyFilterBtn");
  const resetFilterBtn = document.getElementById("resetFilterBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  const table = document.getElementById("orderTable");
  const rows = table.querySelectorAll("tbody tr");

  function filterTable() {
    const status = statusFilter.value.toLowerCase();
    const worktype = worktypeFilter.value.toLowerCase();
    const customer = customerFilter.value.toLowerCase();

    rows.forEach(row => {
      const statusSpan = row.querySelector("td.status-td span.status-badge");
      const statusText = statusSpan ? statusSpan.textContent.trim().toLowerCase() : "";
      const worktypeText = row.cells[5].textContent.trim().toLowerCase();
      const customerText = row.cells[2].textContent.trim().toLowerCase();

      const statusMatch = status === "" || statusText === status;
      const worktypeMatch = worktype === "" || worktypeText === worktype;
      const customerMatch = customer === "" || customerText.includes(customer);

      if (statusMatch && worktypeMatch && customerMatch) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  function resetFilters() {
    statusFilter.value = "";
    worktypeFilter.value = "";
    customerFilter.value = "";

    rows.forEach(row => {
      row.style.display = "";
    });
  }

  function downloadTable() {
    const headers = [...table.querySelectorAll("thead th")].map(th => th.innerText);
    const allRows = [...table.querySelectorAll("tbody tr")];

    const isFilterActive = allRows.some(row => row.style.display === "none");

    const targetRows = isFilterActive
      ? allRows.filter(row => row.style.display !== "none")
      : allRows;

    const data = targetRows.map(row => {
      return [...row.querySelectorAll("td")].map(cell => cell.innerText.trim());
    });

    data.unshift(headers);

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(workbook, "Filtered_Orders.xlsx");
  }

  applyFilterBtn.addEventListener("click", filterTable);
  resetFilterBtn.addEventListener("click", resetFilters);
  downloadBtn.addEventListener("click", downloadTable);

  function getCustomerNames() {
    const names = new Set();
    rows.forEach(row => {
      const customer = row.cells[2].textContent.trim();
      if (customer) names.add(customer);
    });
    return [...names];
  }

  customerFilter.addEventListener("input", () => {
    const value = customerFilter.value.toLowerCase();
    customerDropdown.innerHTML = "";
    const names = getCustomerNames();

    if (value) {
      const filtered = names.filter(name => name.toLowerCase().includes(value));
      filtered.forEach(name => {
        const div = document.createElement("div");
        div.textContent = name;
        div.addEventListener("click", () => {
          customerFilter.value = name;
          customerDropdown.style.display = "none";
          filterTable(); // Apply filter immediately after selection
        });
        customerDropdown.appendChild(div);
      });
      customerDropdown.style.display = filtered.length ? "block" : "none";
    } else {
      customerDropdown.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!customerDropdown.contains(e.target) && e.target !== customerFilter) {
      customerDropdown.style.display = "none";
    }
  });