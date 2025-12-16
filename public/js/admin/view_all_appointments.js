let trendChart;
let pieChart;

// Initialize charts on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeCharts();
  updateReports();

  // Add event listeners for filter changes
  document
    .getElementById("timeRange")
    .addEventListener("change", updateReports);

  // Add window resize event listener for chart responsiveness
  window.addEventListener("resize", function () {
    if (trendChart) {
      trendChart.resize();
    }
    if (pieChart) {
      pieChart.resize();
    }
  });
});

function initializeCharts() {
  // Initialize Trend Chart
  const trendCtx = document
    .getElementById("appointmentTrendChart")
    .getContext("2d");
  trendChart = new Chart(trendCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Completed",
          borderColor: "#0d6efd",
          backgroundColor: "#0d6efd",
          fill: false,
          tension: 0.4,
          data: [],
        },
        {
          label: "Approved",
          borderColor: "#198754",
          backgroundColor: "#198754",
          fill: false,
          tension: 0.4,
          data: [],
        },
        {
          label: "Rejected",
          borderColor: "#dc3545",
          backgroundColor: "#dc3545",
          fill: false,
          tension: 0.4,
          data: [],
        },
        {
          label: "Pending",
          borderColor: "#ffc107",
          backgroundColor: "#ffc107",
          fill: false,
          tension: 0.4,
          data: [],
        },
        {
          label: "Cancelled",
          borderColor: "#6c757d",
          backgroundColor: "#6c757d",
          fill: false,
          tension: 0.4,
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Appointment Trends",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        legend: {
          position: "bottom",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });

  // Initialize Pie Chart
  const pieCtx = document.getElementById("statusPieChart").getContext("2d");
  pieChart = new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Approved", "Rejected", "Pending", "Cancelled"],
      datasets: [
        {
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            "#0d6efd",
            "#198754",
            "#dc3545",
            "#ffc107",
            "#6c757d",
          ],
          borderWidth: 0,
          cutout: "65%",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw;
              const total = context.dataset.data.reduce(
                (acc, curr) => acc + curr,
                0
              );
              const percentage =
                total > 0 ? ((value / total) * 100).toFixed(1) + "%" : "0%";
              return `${context.label}: ${value} (${percentage})`;
            },
          },
        },
      },
    },
  });
}

function updateReports() {
  const timeRange = document.getElementById("timeRange").value;

  // Show loading state
  document
    .querySelectorAll(".stat-card h3")
    .forEach((el) => (el.textContent = "Loading..."));

  // Fetch data from the server based on the selected time range
  fetch(
    (window.BASE_URL || "/") +
      `admin/appointments/get_all_appointments?timeRange=${timeRange}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      updateCharts(data);
      updateStatistics(data);
      saveToHistory(data);
    })
    .catch((error) => {
      console.error("Error fetching report data:", error);
      alert("Error loading report data: " + error.message);
      // Reset statistics to 0 on error
      resetStatistics();
    });
}

// Updated updateCharts function with correct counting logic
function updateCharts(data) {
  // Validate data
  if (!data || !Array.isArray(data.labels)) {
      console.error('Invalid data format received');
      return;
  }

  const timeRange = document.getElementById('timeRange').value;
  let labels = data.labels;

  // Format dates based on time range
  if (timeRange === 'monthly') {
      labels = [
          'January', 'February', 'March', 'April', 
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
      ];
  } else if (timeRange === 'daily') {
      if (data.weekInfo && Array.isArray(data.weekInfo.weekDays)) {
          labels = data.weekInfo.weekDays.map(day =>
              `${day.shortDayName}, ${day.dayMonth}`
          );
      } else {
          labels = labels.map(date => {
              const d = new Date(date);
              return d.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: '2-digit'
              });
          });
      }
  } else if (timeRange === 'weekly') {
      if (data.weekRanges) {
          labels = data.weekRanges.map(week => {
              const start = new Date(week.start);
              const end = new Date(week.end);
              return `${start.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
              })} - ${end.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
              })}`;
          });
      } else {
          labels = labels.map(date => {
              const start = new Date(date);
              const end = new Date(date);
              end.setDate(end.getDate() + 6);
              return `${start.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
              })} - ${end.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
              })}`;
          });
      }
  }

  // Update trend chart - FIXED: Use correct data based on timeRange
  trendChart.data.labels = labels;
  
  // For monthly, use monthlyXXX arrays, otherwise use the regular arrays
  trendChart.data.datasets[0].data = timeRange === 'monthly' ? 
      (data.monthlyCompleted || Array(12).fill(0)) : 
      (data.completed || Array(labels.length).fill(0));
  trendChart.data.datasets[1].data = timeRange === 'monthly' ? 
      (data.monthlyApproved || Array(12).fill(0)) : 
      (data.approved || Array(labels.length).fill(0));
  trendChart.data.datasets[2].data = timeRange === 'monthly' ? 
      (data.monthlyRejected || Array(12).fill(0)) : 
      (data.rejected || Array(labels.length).fill(0));
  trendChart.data.datasets[3].data = timeRange === 'monthly' ? 
      (data.monthlyPending || Array(12).fill(0)) : 
      (data.pending || Array(labels.length).fill(0));
  trendChart.data.datasets[4].data = timeRange === 'monthly' ? 
      (data.monthlyCancelled || Array(12).fill(0)) : 
      (data.cancelled || Array(labels.length).fill(0));

  // Update chart title
  let titleText = `Appointment Trends - ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Report`;
  if (timeRange === 'daily' && data.weekInfo) {
      const startDate = new Date(data.weekInfo.startDate);
      const monthYear = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      titleText += ` (${monthYear})`;
  } else if (timeRange === 'weekly' && data.startDate && data.endDate) {
      const monthDate = new Date(data.startDate);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      titleText += ` (${monthName})`;
  }
  trendChart.options.plugins.title.text = titleText;

  // Configure y-axis based on time range
  if (timeRange === 'monthly') {
      trendChart.options.scales.y = {
          beginAtZero: true,
          max: 100,
          ticks: {
              stepSize: 20,
              callback: function(value) {
                  return value.toFixed(0);
              }
          },
          grid: {
              display: true,
              drawBorder: true,
              color: 'rgba(0, 0, 0, 0.1)'
          }
      };
  } else if (timeRange === 'daily') {
      trendChart.options.scales.y = {
          beginAtZero: true,
          max: 8,
          ticks: {
              stepSize: 2,
              callback: function(value) {
                  return value.toFixed(0);
              }
          },
          grid: {
              display: true,
              drawBorder: true,
              color: 'rgba(0, 0, 0, 0.1)'
          }
      };
  } else if (timeRange === 'weekly') {
      trendChart.options.scales.y = {
          beginAtZero: true,
          max: 40,
          ticks: {
              stepSize: 10,
              callback: function(value) {
                  return value.toFixed(0);
              }
          },
          grid: {
              display: true,
              drawBorder: true,
              color: 'rgba(0, 0, 0, 0.1)'
          }
      };
  } else {
      trendChart.options.scales.y = {
          beginAtZero: true,
          ticks: {
              stepSize: 1,
              callback: function(value) {
                  return value.toFixed(0);
              }
          },
          grid: {
              display: true,
              drawBorder: true,
              color: 'rgba(0, 0, 0, 0.1)'
          }
      };
  }

  // Update x-axis configuration
  trendChart.options.scales.x = {
      grid: {
          display: true,
          drawBorder: true,
          color: 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false
      }
  };
  
  trendChart.update();

  // Update pie chart - CRITICAL: Use totalXXX for aggregate counts
  const pieData = [
      parseInt(data.totalCompleted) || 0,
      parseInt(data.totalApproved) || 0,
      parseInt(data.totalRejected) || 0,
      parseInt(data.totalPending) || 0,
      parseInt(data.totalCancelled) || 0
  ];
  pieChart.data.datasets[0].data = pieData;

  // Add custom percentage labels
  const total = pieData.reduce((acc, curr) => acc + curr, 0);
  pieChart.options.plugins.tooltip.callbacks.label = function(context) {
      const value = context.raw;
      const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
      return `${context.label}: ${value} (${percentage})`;
  };

  pieChart.update();
}

// Updated updateStatistics function - ensure proper integer conversion
function updateStatistics(data) {
  document.getElementById('completedCount').textContent = parseInt(data.totalCompleted) || 0;
  document.getElementById('approvedCount').textContent = parseInt(data.totalApproved) || 0;
  document.getElementById('rejectedCount').textContent = parseInt(data.totalRejected) || 0;
  document.getElementById('pendingCount').textContent = parseInt(data.totalPending) || 0;
  document.getElementById('cancelledCount').textContent = parseInt(data.totalCancelled) || 0;
}

function resetStatistics() {
  document.getElementById("completedCount").textContent = "0";
  document.getElementById("approvedCount").textContent = "0";
  document.getElementById("rejectedCount").textContent = "0";
  document.getElementById("pendingCount").textContent = "0";
  document.getElementById("cancelledCount").textContent = "0";

  // Reset charts
  if (trendChart && pieChart) {
    trendChart.data.labels = [];
    trendChart.data.datasets.forEach((dataset) => (dataset.data = []));
    trendChart.update();

    pieChart.data.datasets[0].data = [0, 0, 0, 0, 0];
    pieChart.update();
  }
}

// Function to view report history
function viewHistory() {
  // Show the history modal
  const historyModal = new bootstrap.Modal(
    document.getElementById("historyModal")
  );

  // Get the history data from localStorage
  const reportHistory = JSON.parse(
    localStorage.getItem("reportHistory") || "[]"
  );

  // Get the table body
  const historyTableBody = document.getElementById("historyTableBody");
  historyTableBody.innerHTML = "";

  if (reportHistory.length === 0) {
    historyTableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No history available</td>
            </tr>
        `;
  } else {
    // Sort history by date (newest first)
    reportHistory.sort(
      (a, b) => new Date(b.dateGenerated) - new Date(a.dateGenerated)
    );

    // Populate the table
    reportHistory.forEach((record) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${new Date(record.dateGenerated).toLocaleString()}</td>
                <td>${record.reportType}</td>
                <td>${record.totalAppointments}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2" onclick="viewReport('${
                      record.id
                    }')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteReport('${
                      record.id
                    }')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
      historyTableBody.appendChild(row);
    });
  }

  historyModal.show();
}

// Function to save report to history
function saveToHistory(reportData) {
  // Get existing history
  const reportHistory = JSON.parse(
    localStorage.getItem("reportHistory") || "[]"
  );

  // Create new report record
  const newReport = {
    id: Date.now().toString(), // Unique ID
    dateGenerated: new Date().toISOString(),
    reportType: document.getElementById("timeRange").value,
    totalAppointments:
      reportData.totalCompleted +
      reportData.totalApproved +
      reportData.totalRejected +
      reportData.totalPending +
      reportData.totalCancelled,
    data: reportData,
  };

  // Add to history (limit to last 50 reports)
  reportHistory.unshift(newReport);
  if (reportHistory.length > 50) {
    reportHistory.pop();
  }

  // Save back to localStorage
  localStorage.setItem("reportHistory", JSON.stringify(reportHistory));
}

// Function to view a specific report
function viewReport(reportId) {
  const reportHistory = JSON.parse(
    localStorage.getItem("reportHistory") || "[]"
  );
  const report = reportHistory.find((r) => r.id === reportId);

  if (report) {
    // Update the charts and statistics with the historical data
    updateCharts(report.data);
    updateStatistics(report.data);

    // Close the history modal
    const historyModal = bootstrap.Modal.getInstance(
      document.getElementById("historyModal")
    );
    historyModal.hide();
  }
}

// Function to delete a report
function deleteReport(reportId) {
  if (confirm("Are you sure you want to delete this report?")) {
    const reportHistory = JSON.parse(
      localStorage.getItem("reportHistory") || "[]"
    );
    const updatedHistory = reportHistory.filter((r) => r.id !== reportId);
    localStorage.setItem("reportHistory", JSON.stringify(updatedHistory));

    // Refresh the history view
    viewHistory();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  let allAppointments = [];
  const appointmentsTable = document.getElementById("appointmentsTable");
  const searchInput = document.getElementById("searchInput");
  const dateFilter = document.getElementById("dateFilter");
  const loadingSpinner = document.querySelector(".loading-spinner");
  const emptyState = document.querySelector(".empty-state");
  
  // Pagination state - track current page for each table
  const paginationState = {
    allAppointmentsTable: 1,
    approvedAppointmentsTable: 1,
    rejectedAppointmentsTable: 1,
    completedAppointmentsTable: 1,
    cancelledAppointmentsTable: 1,
    followUpAppointmentsTable: 1
  };
  // Pagination window state - track the starting page of visible page numbers window
  const paginationWindowState = {
    allAppointmentsTable: 1,
    approvedAppointmentsTable: 1,
    rejectedAppointmentsTable: 1,
    completedAppointmentsTable: 1,
    cancelledAppointmentsTable: 1,
    followUpAppointmentsTable: 1
  };
  const ITEMS_PER_PAGE = 10;
  const PAGES_PER_WINDOW = 5;

  // Fetch all appointments when the page loads
  fetchAppointments();

  // Add event listeners
  if (searchInput) searchInput.addEventListener("input", filterAppointments);
  if (dateFilter) dateFilter.addEventListener("change", filterAppointments);
  
  // Mobile filter inputs
  const searchInputMobile = document.getElementById("searchInputMobile");
  const dateFilterMobile = document.getElementById("dateFilterMobile");
  if (searchInputMobile) searchInputMobile.addEventListener("input", filterAppointments);
  if (dateFilterMobile) dateFilterMobile.addEventListener("change", filterAppointments);

  // Add event listeners for tab changes
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
    tab.addEventListener("shown.bs.tab", handleTabChange);
  });

  // Enhanced filter elements
  const exportFiltersContainer = document.getElementById("exportFiltersContainer");
  let isExportFiltersVisible = false;
  let currentExportType = "";

  // Toggle export filters container
  function toggleExportFiltersContainer(exportType) {
    if (!exportFiltersContainer) return;
    
    const isCurrentlyVisible = exportFiltersContainer.style.display !== "none";
    
    if (isCurrentlyVisible && currentExportType === exportType) {
      // Close container if same button clicked
      exportFiltersContainer.style.display = "none";
      isExportFiltersVisible = false;
      resetExportFilters();
    } else {
      // Open container and set export type
      exportFiltersContainer.style.display = "block";
      isExportFiltersVisible = true;
      currentExportType = exportType;
      if (exportFiltersContainer) {
        exportFiltersContainer.setAttribute("data-export-type", exportType);
      }
    }
  }

  // Reset export filters to default (tab-based or date-based)
  function resetExportFilters() {
    if (exportStartDate) exportStartDate.value = "";
    if (exportEndDate) exportEndDate.value = "";
    if (exportCounselorFilter) exportCounselorFilter.value = "";
    if (exportCourseFilter) exportCourseFilter.value = "";
    if (exportYearLevelFilter) exportYearLevelFilter.value = "";
    if (exportStudentFilter) exportStudentFilter.value = "";
    updateStudentFilterOptions();
    // Refresh table display with default filters
    filterAppointments();
  }

  // Export buttons
  const exportPDFBtn = document.getElementById("exportPDF");
  const exportExcelBtn = document.getElementById("exportExcel");
  const exportPDFMobileBtn = document.getElementById("exportPDFMobile");
  const exportExcelMobileBtn = document.getElementById("exportExcelMobile");
  if (exportPDFBtn)
    exportPDFBtn.addEventListener("click", function(e){
      toggleExportFiltersContainer("PDF");
      e.stopPropagation();
    });
  if (exportExcelBtn)
    exportExcelBtn.addEventListener("click", function(e){
      toggleExportFiltersContainer("Excel");
      e.stopPropagation();
    });
  if (exportPDFMobileBtn)
    exportPDFMobileBtn.addEventListener("click", function(e){
      toggleExportFiltersContainer("PDF");
      e.stopPropagation();
    });
  if (exportExcelMobileBtn)
    exportExcelMobileBtn.addEventListener("click", function(e){
      toggleExportFiltersContainer("Excel");
      e.stopPropagation();
    });
  const exportStartDate = document.getElementById("exportStartDate");
  const exportEndDate = document.getElementById("exportEndDate");
  const exportCounselorFilter = document.getElementById(
    "exportCounselorFilter"
  );
  const exportStudentFilter = document.getElementById("exportStudentFilter");
  const exportCourseFilter = document.getElementById("exportCourseFilter");
  const exportYearLevelFilter = document.getElementById(
    "exportYearLevelFilter"
  );
  const studentFilterState = {
    students: [],
    academicMap: {},
  };
  const clearAllFiltersBtn = document.getElementById("clearAllFilters");
  const clearDateRangeBtn = document.getElementById("clearDateRange");
  const applyFiltersBtn = document.getElementById("applyFilters");

  // Real-time filtering function that applies export filters to table preview
  function applyExportFiltersToTable() {
    if (!isExportFiltersVisible) return;
    
    const filters = {
      startDate: exportStartDate ? exportStartDate.value : "",
      endDate: exportEndDate ? exportEndDate.value : "",
      counselorId: exportCounselorFilter ? exportCounselorFilter.value : "",
      studentId: exportStudentFilter ? exportStudentFilter.value : "",
      course: exportCourseFilter ? exportCourseFilter.value : "",
      yearLevel: exportYearLevelFilter ? exportYearLevelFilter.value : ""
    };
    
    // Get current active tab
    const activeTab = document.querySelector(".nav-link.active");
    let filteredAppointments = [...allAppointments];
    
    // Apply tab-based filter first
    if (activeTab) {
      const tabId = activeTab.getAttribute("data-bs-target").replace("#", "");
      switch (tabId) {
        case "approved":
          filteredAppointments = filteredAppointments.filter(app => app.status && app.status.toUpperCase() === "APPROVED");
          break;
        case "rejected":
          filteredAppointments = filteredAppointments.filter(app => app.status && app.status.toUpperCase() === "REJECTED");
          break;
        case "completed":
          filteredAppointments = filteredAppointments.filter(app => app.status && app.status.toUpperCase() === "COMPLETED");
          break;
        case "cancelled":
          filteredAppointments = filteredAppointments.filter(app => app.status && app.status.toUpperCase() === "CANCELLED");
          break;
        case "followup":
          filteredAppointments = filteredAppointments.filter(app => {
            const isFollowUp = (app.record_kind === "follow_up") || 
                             (app.appointment_type && String(app.appointment_type).toLowerCase().includes("follow-up"));
            const st = (app.status || "").toString().toUpperCase();
            return isFollowUp && (st === "PENDING" || st === "COMPLETED" || st === "CANCELLED");
          });
          break;
      }
    }
    
    // Apply export filters
    const result = applyEnhancedFilters(filteredAppointments, filters, "");
    filteredAppointments = result.appointments || filteredAppointments;
    
    // Determine target table
    let targetTableId = "allAppointmentsTable";
    if (activeTab) {
      const tabId = activeTab.getAttribute("data-bs-target").replace("#", "");
      switch (tabId) {
        case "approved":
          targetTableId = "approvedAppointmentsTable";
          break;
        case "rejected":
          targetTableId = "rejectedAppointmentsTable";
          break;
        case "completed":
          targetTableId = "completedAppointmentsTable";
          break;
        case "cancelled":
          targetTableId = "cancelledAppointmentsTable";
          break;
        case "followup":
          targetTableId = "followUpAppointmentsTable";
          break;
      }
    }
    
    // Reset pagination and display
    paginationState[targetTableId] = 1;
    paginationWindowState[targetTableId] = 1;
    displayAppointments(filteredAppointments, targetTableId);
  }

  // Enhanced filter event listeners
  if (clearAllFiltersBtn)
    clearAllFiltersBtn.addEventListener("click", clearAllFilters);
  if (clearDateRangeBtn)
    clearDateRangeBtn.addEventListener("click", clearDateRange);
  if (applyFiltersBtn) applyFiltersBtn.addEventListener("click", applyFilters);
  if (exportCourseFilter) {
    exportCourseFilter.addEventListener("change", function() {
      handleCourseYearFilterChange();
      applyExportFiltersToTable();
    });
  }
  if (exportYearLevelFilter) {
    exportYearLevelFilter.addEventListener("change", function() {
      handleCourseYearFilterChange();
      applyExportFiltersToTable();
    });
  }
  
  // Add real-time filtering listeners for export filters
  if (exportStartDate) {
    exportStartDate.addEventListener("change", applyExportFiltersToTable);
  }
  if (exportEndDate) {
    exportEndDate.addEventListener("change", applyExportFiltersToTable);
  }
  if (exportCounselorFilter) {
    exportCounselorFilter.addEventListener("change", applyExportFiltersToTable);
  }
  if (exportStudentFilter) {
    exportStudentFilter.addEventListener("change", applyExportFiltersToTable);
  }

  // Load filter data on page load
  loadFilterData();

  function displayAppointments(
    appointments,
    targetTableId = "allAppointmentsTable"
  ) {
    const tableBody = document.getElementById(targetTableId);
    if (!tableBody) {
      console.error(`Table body with ID ${targetTableId} not found`);
      return;
    }

    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      // Determine if this table should show the reason column for colspan
      const showReason = [
        "allAppointmentsTable",
        "rejectedAppointmentsTable",
        "cancelledAppointmentsTable",
      ].includes(targetTableId);
      const colspan = showReason ? 11 : 10; // Admin tables have Counselor column (10) + Reason (1) if shown
      tableBody.innerHTML = `<tr><td colspan="${colspan}" class="text-center">No appointments found</td></tr>`;
      renderPagination(targetTableId, 0);
      return;
    }

    // Determine if this table should show the reason column
    const showReason = [
      "allAppointmentsTable",
      "rejectedAppointmentsTable",
      "cancelledAppointmentsTable",
    ].includes(targetTableId);

    // Sort appointments from oldest to newest
    const sortedAppointments = [...appointments].sort((a, b) => {
      const dateTimeA = a.appointed_date + " " + a.appointed_time;
      const dateTimeB = b.appointed_date + " " + b.appointed_time;

      if (dateTimeA < dateTimeB) return -1;
      if (dateTimeA > dateTimeB) return 1;
      return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedAppointments.length / ITEMS_PER_PAGE);
    let currentPage = paginationState[targetTableId] || 1;
    
    // Validate and correct page number if out of bounds
    if (currentPage < 1) {
      currentPage = 1;
      paginationState[targetTableId] = 1;
    } else if (totalPages > 0 && currentPage > totalPages) {
      currentPage = totalPages;
      paginationState[targetTableId] = totalPages;
    }
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedAppointments = sortedAppointments.slice(startIndex, endIndex);

    // Display paginated appointments
    paginatedAppointments.forEach((appointment) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${appointment.student_id || ""}</td>
                <td>${appointment.student_name || ""}</td>
                <td>${
                  appointment.appointed_date
                    ? new Date(appointment.appointed_date).toLocaleDateString()
                    : ""
                }</td>
                <td>${appointment.appointed_time || ""}</td>
                <td>${appointment.method_type || ""}</td>
                <td>${appointment.consultation_type || "Individual Consultation"}</td>
                <td>${
                  appointment.appointment_type ||
                  (appointment.record_kind === "follow_up"
                    ? "Follow-up Session"
                    : "First Session") ||
                  ""
                }</td>
                <td>${appointment.purpose || "N/A"}</td>
                <td>${appointment.counselor_name || ""}</td>
                <td><span class="badge badge-${getStatusClass(
                  appointment.status
                )}">${appointment.status || "PENDING"}</span></td>
                ${
                  showReason
                    ? `<td>${formatReason(appointment.reason)}</td>`
                    : ""
                }
            `;
      tableBody.appendChild(row);
    });

    // Render pagination controls
    renderPagination(targetTableId, sortedAppointments.length, currentPage, totalPages);
  }

  // Render pagination controls
  function renderPagination(targetTableId, totalItems, currentPage = 1, totalPages = 1) {
    const paginationContainerId = targetTableId + 'Pagination';
    let paginationContainer = document.getElementById(paginationContainerId);
    
    if (!paginationContainer) {
      // Create pagination container if it doesn't exist
      const tableContainer = document.getElementById(targetTableId).closest('.table-responsive');
      if (tableContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = paginationContainerId;
        paginationContainer.className = 'pagination-container mt-3 d-flex justify-content-center';
        tableContainer.parentNode.insertBefore(paginationContainer, tableContainer.nextSibling);
      } else {
        return;
      }
    }

    if (totalItems === 0 || totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    // Calculate the visible page window (5 consecutive pages)
    let windowStart = paginationWindowState[targetTableId] || 1;
    
    // Ensure window start is valid
    if (windowStart < 1) {
      windowStart = 1;
      paginationWindowState[targetTableId] = 1;
    }
    
    // Adjust window if current page is outside the visible window
    if (currentPage < windowStart) {
      windowStart = Math.max(1, currentPage);
      paginationWindowState[targetTableId] = windowStart;
    } else if (currentPage >= windowStart + PAGES_PER_WINDOW) {
      windowStart = Math.min(totalPages - PAGES_PER_WINDOW + 1, currentPage);
      paginationWindowState[targetTableId] = windowStart;
    }
    
    // Calculate the end of the visible window
    const windowEnd = Math.min(windowStart + PAGES_PER_WINDOW - 1, totalPages);
    
    // Calculate previous and next window starts (always shift by 5 pages)
    const previousWindowStart = Math.max(1, windowStart - PAGES_PER_WINDOW);
    const nextWindowStart = Math.min(totalPages - PAGES_PER_WINDOW + 1, windowStart + PAGES_PER_WINDOW);
    
    // Check if we can shift the window (only if there are pages beyond current window)
    const canShiftPreviousWindow = previousWindowStart < windowStart;
    const canShiftNextWindow = nextWindowStart > windowStart && nextWindowStart <= totalPages;

    let paginationHTML = '<nav aria-label="Page navigation"><ul class="pagination mb-0">';
    
    // Previous button - always tries to shift window by 5 pages backward, falls back to single page if at edge
    let previousTargetPage;
    let previousActionType;
    if (canShiftPreviousWindow) {
      previousTargetPage = previousWindowStart;
      previousActionType = 'previous-window';
    } else if (currentPage > 1) {
      previousTargetPage = currentPage - 1;
      previousActionType = 'previous-page';
    } else {
      previousTargetPage = 1;
      previousActionType = 'previous-page';
    }
    
    paginationHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-action="${previousActionType}" data-page="${previousTargetPage}" data-table="${targetTableId}" ${currentPage === 1 ? 'tabindex="-1" aria-disabled="true"' : ''}>Previous</a>
    </li>`;

    // Show only 5 consecutive page numbers
    for (let i = windowStart; i <= windowEnd; i++) {
      paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-action="goto-page" data-page="${i}" data-table="${targetTableId}">${i}</a>
      </li>`;
    }

    // Next button - always tries to shift window by 5 pages forward, falls back to single page if at edge
    let nextTargetPage;
    let nextActionType;
    if (canShiftNextWindow) {
      nextTargetPage = nextWindowStart;
      nextActionType = 'next-window';
    } else if (currentPage < totalPages) {
      nextTargetPage = currentPage + 1;
      nextActionType = 'next-page';
    } else {
      nextTargetPage = totalPages;
      nextActionType = 'next-page';
    }
    
    paginationHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-action="${nextActionType}" data-page="${nextTargetPage}" data-table="${targetTableId}" ${currentPage === totalPages ? 'tabindex="-1" aria-disabled="true"' : ''}>Next</a>
    </li>`;

    paginationHTML += '</ul></nav>';
    paginationContainer.innerHTML = paginationHTML;
    
    // Store totalPages in container for event handlers
    paginationContainer.setAttribute('data-total-pages', totalPages.toString());

    // Add event listeners to pagination links
    paginationContainer.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('disabled') || this.getAttribute('aria-disabled') === 'true') {
          return;
        }
        
        const action = this.getAttribute('data-action');
        const page = parseInt(this.getAttribute('data-page'), 10);
        const tableId = this.getAttribute('data-table');
        const container = document.getElementById(tableId + 'Pagination');
        const totalPagesForTable = container ? parseInt(container.getAttribute('data-total-pages'), 10) : 1;
        
        if (!page || page < 1 || !tableId) {
          return;
        }
        
        if (action === 'previous-window' || action === 'next-window') {
          // Shift the window and move to the first page of the new window
          paginationWindowState[tableId] = page;
          paginationState[tableId] = page;
        } else if (action === 'goto-page') {
          // Go to specific page - adjust window if needed
          paginationState[tableId] = page;
          // Check if the page is outside current window and adjust if needed
          const currentWindowStart = paginationWindowState[tableId] || 1;
          if (page < currentWindowStart || page >= currentWindowStart + PAGES_PER_WINDOW) {
            // Adjust window to include the clicked page
            const newWindowStart = Math.max(1, Math.min(page, totalPagesForTable - PAGES_PER_WINDOW + 1));
            paginationWindowState[tableId] = newWindowStart;
          }
        } else {
          // Single page navigation (previous-page/next-page)
          paginationState[tableId] = page;
          // Adjust window if needed
          const currentWindowStart = paginationWindowState[tableId] || 1;
          if (page < currentWindowStart || page >= currentWindowStart + PAGES_PER_WINDOW) {
            const newWindowStart = Math.max(1, Math.min(page, totalPagesForTable - PAGES_PER_WINDOW + 1));
            paginationWindowState[tableId] = newWindowStart;
          }
        }
        
        // Re-display current filtered data without resetting pagination
        refreshCurrentTableDisplay();
      });
    });
  }

  // Refresh current table display without resetting pagination
  function refreshCurrentTableDisplay() {
    const searchInputValue = searchInput ? searchInput.value : (searchInputMobile ? searchInputMobile.value : '');
    const dateFilterValue = dateFilter ? dateFilter.value : (dateFilterMobile ? dateFilterMobile.value : '');
    const searchTerm = searchInputValue.toLowerCase();
    const dateValue = dateFilterValue;
    
    let filtered = allAppointments;

    if (searchTerm) {
      filtered = filtered.filter((appointment) =>
        Object.values(appointment).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }

    if (dateValue) {
      filtered = filtered.filter((appointment) =>
        appointment.appointed_date.startsWith(dateValue)
      );
    }

    const activeTab = document.querySelector(".nav-link.active");
    if (activeTab) {
      const tabId = activeTab.id;
      let status;
      let targetTableId;

      switch (tabId) {
        case "approved-tab":
          status = "APPROVED";
          targetTableId = "approvedAppointmentsTable";
          break;
        case "rejected-tab":
          status = "REJECTED";
          targetTableId = "rejectedAppointmentsTable";
          break;
        case "completed-tab":
          status = "COMPLETED";
          targetTableId = "completedAppointmentsTable";
          break;
        case "cancelled-tab":
          status = "CANCELLED";
          targetTableId = "cancelledAppointmentsTable";
          break;
        case "followup-tab":
          status = "FOLLOWUP";
          targetTableId = "followUpAppointmentsTable";
          break;
        case "all-tab":
        default:
          status = "all";
          targetTableId = "allAppointmentsTable";
      }

      if (status === "FOLLOWUP") {
        filtered = filtered.filter(
          (app) =>
            app.record_kind === "follow_up" &&
            app.status &&
            ["COMPLETED", "CANCELLED"].includes(app.status.toUpperCase())
        );
      } else if (status !== "all") {
        filtered = filtered.filter(
          (app) => app.status && app.status.toUpperCase() === status
        );
      }

      // Display without resetting pagination
      displayAppointments(filtered, targetTableId);
    } else {
      displayAppointments(filtered, "allAppointmentsTable");
    }
  }

  // Handle tab changes
  function handleTabChange(event) {
    const targetTabId = event.target
      .getAttribute("data-bs-target")
      .replace("#", "");

    let status;
    let targetTableId;

    switch (targetTabId) {
      case "approved":
        status = "APPROVED";
        targetTableId = "approvedAppointmentsTable";
        break;
      case "rejected":
        status = "REJECTED";
        targetTableId = "rejectedAppointmentsTable";
        break;
      case "completed":
        status = "COMPLETED";
        targetTableId = "completedAppointmentsTable";
        break;
      case "cancelled":
        status = "CANCELLED";
        targetTableId = "cancelledAppointmentsTable";
        break;
      case "followup":
        status = "FOLLOWUP";
        targetTableId = "followUpAppointmentsTable";
        break;
      case "all":
      default:
        status = "all";
        targetTableId = "allAppointmentsTable";
    }

    // Reset pagination to page 1 when switching tabs
    paginationState[targetTableId] = 1;
    paginationWindowState[targetTableId] = 1;

    let filteredAppointments = [];
    if (status === "all") {
      filteredAppointments = allAppointments;
    } else if (status === "FOLLOWUP") {
      filteredAppointments = allAppointments.filter((app) => {
        const isFollowUp =
          app.record_kind === "follow_up" ||
          (app.appointment_type &&
            String(app.appointment_type).toLowerCase().includes("follow-up"));
        const st = (app.status || "").toString().toUpperCase();
        return (
          isFollowUp &&
          (st === "PENDING" || st === "COMPLETED" || st === "CANCELLED")
        );
      });
    } else {
      filteredAppointments = allAppointments.filter(
        (app) => app.status && app.status.toUpperCase() === status
      );
    }

    SecureLogger.info(
      `Tab changed to ${targetTabId}, filtering ${status} appointments. Found: ${filteredAppointments.length}`
    );
    displayAppointments(filteredAppointments, targetTableId);
  }

  // Update initial display after fetch
  function updateInitialDisplay() {
    SecureLogger.info("Updating initial display for all tabs");

    // Reset all pagination to page 1 when data is first loaded
    Object.keys(paginationState).forEach(key => {
      paginationState[key] = 1;
      paginationWindowState[key] = 1;
    });

    // Display all appointments first
    displayAppointments(allAppointments, "allAppointmentsTable");

    // Pre-filter and display appointments for each status tab
    const approvedAppointments = allAppointments.filter(
      (app) => app.status && app.status.toUpperCase() === "APPROVED"
    );
    SecureLogger.info(
      `Found ${approvedAppointments.length} approved appointments`
    );
    displayAppointments(approvedAppointments, "approvedAppointmentsTable");

    const rejectedAppointments = allAppointments.filter(
      (app) => app.status && app.status.toUpperCase() === "REJECTED"
    );
    SecureLogger.info(
      `Found ${rejectedAppointments.length} rejected appointments`
    );
    displayAppointments(rejectedAppointments, "rejectedAppointmentsTable");

    const completedAppointments = allAppointments.filter(
      (app) => app.status && app.status.toUpperCase() === "COMPLETED"
    );
    SecureLogger.info(
      `Found ${completedAppointments.length} completed appointments`
    );
    displayAppointments(completedAppointments, "completedAppointmentsTable");

    const cancelledAppointments = allAppointments.filter(
      (app) => app.status && app.status.toUpperCase() === "CANCELLED"
    );
    SecureLogger.info(
      `Found ${cancelledAppointments.length} cancelled appointments`
    );
    displayAppointments(cancelledAppointments, "cancelledAppointmentsTable");

    const followUpAppointments = allAppointments.filter((app) => {
      const isFollowUp =
        app.record_kind === "follow_up" ||
        (app.appointment_type &&
          String(app.appointment_type).toLowerCase().includes("follow-up"));
      const st = (app.status || "").toString().toUpperCase();
      return (
        isFollowUp &&
        (st === "PENDING" || st === "COMPLETED" || st === "CANCELLED")
      );
    });
    SecureLogger.info(
      `Found ${followUpAppointments.length} follow-up appointments (completed/cancelled)`
    );
    displayAppointments(followUpAppointments, "followUpAppointmentsTable");
  }

  // Update fetchAppointments to call updateInitialDisplay
  async function fetchAppointments() {
    try {
      showLoading();
      const response = await fetch(
        (window.BASE_URL || "/") + "admin/appointments/get_all_appointments",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        allAppointments = data.appointments;
        SecureLogger.info("Appointments received:", allAppointments);

        // Check if we have appointments with these statuses
        SecureLogger.info(
          "APPROVED appointments:",
          allAppointments.filter(
            (app) => app.status && app.status.toUpperCase() === "APPROVED"
          ).length
        );
        SecureLogger.info(
          "REJECTED appointments:",
          allAppointments.filter(
            (app) => app.status && app.status.toUpperCase() === "REJECTED"
          ).length
        );
        SecureLogger.info(
          "COMPLETED appointments:",
          allAppointments.filter(
            (app) => app.status && app.status.toUpperCase() === "COMPLETED"
          ).length
        );
        SecureLogger.info(
          "CANCELLED appointments:",
          allAppointments.filter(
            (app) => app.status && app.status.toUpperCase() === "CANCELLED"
          ).length
        );

        updateInitialDisplay(); // Update all tables initially

        if (allAppointments.length === 0) {
          showEmptyState();
        } else {
          hideEmptyState();
        }
      } else {
        console.error("Server error:", data.message);
        showError(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showError("An error occurred while fetching appointments");
    } finally {
      hideLoading();
    }
  }

  // Filter appointments based on search and date
  function filterAppointments() {
    const searchInputValue = searchInput ? searchInput.value : (searchInputMobile ? searchInputMobile.value : '');
    const dateFilterValue = dateFilter ? dateFilter.value : (dateFilterMobile ? dateFilterMobile.value : '');
    const searchTerm = searchInputValue.toLowerCase();
    const dateValue = dateFilterValue;

    let filtered = allAppointments;

    if (searchTerm) {
      filtered = filtered.filter((appointment) =>
        Object.values(appointment).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }

    if (dateValue) {
      filtered = filtered.filter((appointment) =>
        appointment.appointed_date.startsWith(dateValue)
      );
    }

    const activeTab = document.querySelector(".nav-link.active");
    if (activeTab) {
      const tabId = activeTab.id;
      let status;
      let targetTableId;

      switch (tabId) {
        case "approved-tab":
          status = "APPROVED";
          targetTableId = "approvedAppointmentsTable";
          break;
        case "rejected-tab":
          status = "REJECTED";
          targetTableId = "rejectedAppointmentsTable";
          break;
        case "completed-tab":
          status = "COMPLETED";
          targetTableId = "completedAppointmentsTable";
          break;
        case "cancelled-tab":
          status = "CANCELLED";
          targetTableId = "cancelledAppointmentsTable";
          break;
        case "followup-tab":
          status = "FOLLOWUP";
          targetTableId = "followUpAppointmentsTable";
          break;
        case "all-tab":
        default:
          status = "all";
          targetTableId = "allAppointmentsTable";
      }

      // Reset pagination to page 1 when filters change
      paginationState[targetTableId] = 1;
      paginationWindowState[targetTableId] = 1;

      if (status === "FOLLOWUP") {
        filtered = filtered.filter(
          (app) =>
            app.record_kind === "follow_up" &&
            app.status &&
            ["COMPLETED", "CANCELLED"].includes(app.status.toUpperCase())
        );
      } else if (status !== "all") {
        filtered = filtered.filter(
          (app) => app.status && app.status.toUpperCase() === status
        );
      }

      displayAppointments(filtered, targetTableId);
    } else {
      paginationState["allAppointmentsTable"] = 1;
      paginationWindowState["allAppointmentsTable"] = 1;
      displayAppointments(filtered, "allAppointmentsTable");
    }
  }

  // Enhanced filter functions
  function showExportFiltersModal(event) {
    const sourceId = (event && event.currentTarget && event.currentTarget.id) ? event.currentTarget.id : (event && event.target && event.target.id) ? event.target.id : '';
    const exportType = sourceId === "exportPDF" ? "PDF" : "Excel";
    if (exportFiltersModalEl)
      exportFiltersModalEl.setAttribute("data-export-type", exportType);
    if (exportFiltersModal) exportFiltersModal.show();
  }

  function clearDateRange() {
    if (exportStartDate) exportStartDate.value = "";
    if (exportEndDate) exportEndDate.value = "";
    applyExportFiltersToTable();
  }

  function clearAllFilters() {
    if (exportStartDate) exportStartDate.value = "";
    if (exportEndDate) exportEndDate.value = "";
    if (exportCounselorFilter) exportCounselorFilter.value = "";
    if (exportCourseFilter) exportCourseFilter.value = "";
    if (exportYearLevelFilter) exportYearLevelFilter.value = "";
    if (exportStudentFilter) exportStudentFilter.value = "";
    updateStudentFilterOptions();
    applyExportFiltersToTable();
  }

  function handleCourseYearFilterChange() {
    updateStudentFilterOptions();
  }

  function shouldIncludeStudentByFilters(studentId) {
    const courseFilter = exportCourseFilter ? exportCourseFilter.value : "";
    const yearFilter = exportYearLevelFilter ? exportYearLevelFilter.value : "";
    const academic = studentFilterState.academicMap[String(studentId)] || {};

    if (courseFilter && academic.course !== courseFilter) {
      return false;
    }
    if (yearFilter && academic.year_level !== yearFilter) {
      return false;
    }
    return true;
  }

  function updateStudentFilterOptions() {
    if (!exportStudentFilter) return;

    const previouslySelected = exportStudentFilter.value;
    exportStudentFilter.innerHTML = '<option value="">All Students</option>';

    const filteredStudents = studentFilterState.students.filter((student) =>
      shouldIncludeStudentByFilters(student.student_id)
    );

    filteredStudents.forEach((student) => {
      const option = document.createElement("option");
      option.value = student.student_id;
      option.textContent = student.full_name;
      exportStudentFilter.appendChild(option);
    });

    const stillValid = filteredStudents.some(
      (student) => String(student.student_id) === previouslySelected
    );
    exportStudentFilter.value = stillValid ? previouslySelected : "";
  }

  function loadFilterData() {
    // Load counselors
    fetch("../admin/filter-data/counselors")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && exportCounselorFilter) {
          exportCounselorFilter.innerHTML =
            '<option value="">All Counselors</option>';
          window.__counselorIdToName = {};
          data.data.forEach((counselor) => {
            const option = document.createElement("option");
            option.value = counselor.counselor_id; // keep id as value
            option.textContent = counselor.name;
            option.setAttribute("data-name", counselor.name);
            window.__counselorIdToName[String(counselor.counselor_id)] =
              counselor.name;
            exportCounselorFilter.appendChild(option);
          });
        }
      })
      .catch((error) => console.error("Error loading counselors:", error));

    // Load students
    const studentsPromise = fetch("../admin/filter-data/students")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          studentFilterState.students = data.data || [];
        } else {
          studentFilterState.students = [];
        }
      })
      .catch((error) => {
        console.error("Error loading students:", error);
        studentFilterState.students = [];
      });

    // Load courses
    fetch("../admin/filter-data/courses")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && exportCourseFilter) {
          exportCourseFilter.innerHTML =
            '<option value="">All Courses</option>';
          data.data.forEach((course) => {
            const option = document.createElement("option");
            option.value = course.value;
            option.textContent = course.label;
            exportCourseFilter.appendChild(option);
          });
        }
      })
      .catch((error) => console.error("Error loading courses:", error));

    // Load year levels
    fetch("../admin/filter-data/year-levels")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && exportYearLevelFilter) {
          exportYearLevelFilter.innerHTML =
            '<option value="">All Year Levels</option>';
          data.data.forEach((yearLevel) => {
            const option = document.createElement("option");
            option.value = yearLevel.value;
            option.textContent = yearLevel.label;
            exportYearLevelFilter.appendChild(option);
          });
        }
      })
      .catch((error) => console.error("Error loading year levels:", error));

    // Load academic map for course/year filtering in exports (by student_id)
    const academicMapPromise = fetch("../admin/filter-data/student-academic-map")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          studentFilterState.academicMap = data.data || {};
          window.__studentAcademicMap = data.data || {};
        } else {
          studentFilterState.academicMap = {};
          window.__studentAcademicMap = {};
        }
      })
      .catch((error) => {
        console.error("Error loading academic map:", error);
        studentFilterState.academicMap = {};
        window.__studentAcademicMap = {};
      });

    Promise.allSettled([studentsPromise, academicMapPromise]).then(
      updateStudentFilterOptions
    );
  }

  async function applyFilters() {
    const startDate = exportStartDate ? exportStartDate.value : "";
    const endDate = exportEndDate ? exportEndDate.value : "";
    const counselorId = exportCounselorFilter
      ? exportCounselorFilter.value
      : "";
    const studentId = exportStudentFilter ? exportStudentFilter.value : "";
    const course = exportCourseFilter ? exportCourseFilter.value : "";
    const yearLevel = exportYearLevelFilter ? exportYearLevelFilter.value : "";
    const exportType = exportFiltersContainer
      ? exportFiltersContainer.getAttribute("data-export-type")
      : "";

    // Validate date range
    if (startDate && endDate && startDate > endDate) {
      alert("Start date cannot be later than end date.");
      return;
    }

    // Ensure academic map is loaded if needed
    if (
      (course || yearLevel) &&
      (!window.__studentAcademicMap ||
        Object.keys(window.__studentAcademicMap).length === 0)
    ) {
      await ensureAcademicMapLoaded();
    }

    // Hide container
    if (exportFiltersContainer) {
      exportFiltersContainer.style.display = "none";
      isExportFiltersVisible = false;
    }

    // Prepare filter object
    const filters = {
      startDate,
      endDate,
      counselorId,
      studentId,
      course,
      yearLevel,
    };

    // Call the appropriate export function
    if (exportType === "PDF") {
      exportToPDF(filters);
    } else if (exportType === "Excel") {
      exportToExcel(filters);
    }
    
    // Reset filters after export
    resetExportFilters();
  }

  async function ensureAcademicMapLoaded() {
    try {
      const resp = await fetch("../admin/filter-data/student-academic-map");
      const data = await resp.json();
      if (data && data.success) {
        window.__studentAcademicMap = data.data || {};
      }
    } catch (e) {
      console.warn("Failed to ensure academic map:", e);
    }
  }

  // Enhanced filter application function
  function applyEnhancedFilters(appointments, filters, reportTitle) {
    let filteredAppointments = [...appointments];
    let title = reportTitle;

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      filteredAppointments = filteredAppointments.filter((app) => {
        const appointmentDate = new Date(app.appointed_date);
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;

        if (start && end) {
          return appointmentDate >= start && appointmentDate <= end;
        } else if (start) {
          return appointmentDate >= start;
        } else if (end) {
          return appointmentDate <= end;
        }
        return true;
      });

      // Add date range to title
      if (filters.startDate && filters.endDate) {
        title += ` (${formatDateForTitle(
          filters.startDate
        )} - ${formatDateForTitle(filters.endDate)})`;
      } else if (filters.startDate) {
        title += ` (From ${formatDateForTitle(filters.startDate)})`;
      } else if (filters.endDate) {
        title += ` (Until ${formatDateForTitle(filters.endDate)})`;
      }
    }

    // Apply counselor filter (match by counselor_id or counselor_name fallback)
    if (filters.counselorId) {
      filteredAppointments = filteredAppointments.filter((app) => {
        // Prefer id match if appointment has it
        if (
          typeof app.counselor_id !== "undefined" &&
          app.counselor_id !== null
        ) {
          if (String(app.counselor_id) === String(filters.counselorId))
            return true;
        }
        // Fallback by name match if only name is present
        const idToName = window.__counselorIdToName || {};
        const selectedName = idToName[String(filters.counselorId)] || "";
        if (selectedName && app.counselor_name) {
          return (
            String(app.counselor_name).trim().toLowerCase() ===
            String(selectedName).trim().toLowerCase()
          );
        }
        return false;
      });
    }

    // Apply student filter (by student_id)
    if (filters.studentId) {
      filteredAppointments = filteredAppointments.filter(
        (app) =>
          String(app.student_id || app.user_id) === String(filters.studentId)
      );
    }

    // Apply course filter using academic map
    if (filters.course) {
      const academicMap = window.__studentAcademicMap || {};
      filteredAppointments = filteredAppointments.filter((app) => {
        const academic =
          academicMap[String(app.student_id || app.user_id)] || {};
        return academic.course === filters.course;
      });
    }

    // Apply year level filter using academic map
    if (filters.yearLevel) {
      const academicMap = window.__studentAcademicMap || {};
      filteredAppointments = filteredAppointments.filter((app) => {
        const academic =
          academicMap[String(app.student_id || app.user_id)] || {};
        return academic.year_level === filters.yearLevel;
      });
    }

    return {
      appointments: filteredAppointments,
      reportTitle: title,
    };
  }

  // Build human-readable filter summary for export footers
  function buildFilterSummary(filters) {
    const parts = [];
    // Status from active tab
    const activeTab = document.querySelector(".nav-link.active");
    if (activeTab) {
      const tabId = activeTab.getAttribute("data-bs-target").replace("#", "");
      const statusMap = {
        all: "All",
        approved: "Approved",
        rejected: "Rejected",
        completed: "Completed",
        cancelled: "Cancelled",
      };
      parts.push(`Status: ${statusMap[tabId] || "All"}`);
    }
    if (filters.startDate)
      parts.push(`Start: ${formatDateForTitle(filters.startDate)}`);
    if (filters.endDate)
      parts.push(`End: ${formatDateForTitle(filters.endDate)}`);
    if (filters.counselorId) {
      const idToName = window.__counselorIdToName || {};
      const name = idToName[String(filters.counselorId)] || filters.counselorId;
      parts.push(`Counselor: ${name}`);
    }
    if (filters.studentId) {
      const opt = exportStudentFilter
        ? exportStudentFilter.querySelector(
            `option[value="${filters.studentId}"]`
          )
        : null;
      const label = opt ? opt.textContent : filters.studentId;
      parts.push(`Student: ${label}`);
    }
    if (filters.course) parts.push(`Course: ${filters.course}`);
    if (filters.yearLevel) parts.push(`Year: ${filters.yearLevel}`);
    return parts.join(" | ");
  }

// Export to PDF - ADMIN VERSION
async function exportToPDF(filters = {}) {
  try {
      if (typeof window.jspdf === 'undefined') {
          throw new Error('jsPDF is not loaded');
      }

      const doc = new window.jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
      });

      // Prepare header and footer assets to mirror PDS preview styling
      const ustpLogoPrimary = new Image();
      ustpLogoPrimary.src = (window.BASE_URL || '/') + 'Photos/USTP.png';

      const ustpLogoSecondary = new Image();
      ustpLogoSecondary.src = (window.BASE_URL || '/') + 'Photos/new_ustp_logo.png';

      const socotecStampImage = new Image();
      socotecStampImage.src = (window.BASE_URL || '/') + 'Misc/PDS/SOCOTECH_stamp.jpg';

      // Ensure all header/footer images are loaded before rendering
      await Promise.all([
          new Promise((resolve, reject) => {
              ustpLogoPrimary.onload = resolve;
              ustpLogoPrimary.onerror = () => reject(new Error('Failed to load USTP primary logo'));
          }),
          new Promise((resolve, reject) => {
              ustpLogoSecondary.onload = resolve;
              ustpLogoSecondary.onerror = () => reject(new Error('Failed to load USTP secondary logo'));
          }),
          new Promise((resolve, reject) => {
              socotecStampImage.onload = resolve;
              socotecStampImage.onerror = () => reject(new Error('Failed to load SOCOTEC stamp image'));
          })
      ]);

      if (typeof doc.autoTable !== 'function') {
          await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js';
              script.onload = resolve;
              script.onerror = () => reject(new Error('Failed to load autoTable plugin'));
              document.head.appendChild(script);
          });

          if (typeof doc.autoTable !== 'function') {
              throw new Error('AutoTable plugin could not be initialized');
          }
      }

      // Get current active tab
      const activeTab = document.querySelector('.nav-link.active');
      
      // Get appointments based on active tab
      let appointmentsToExport = [...allAppointments];
      let reportTitle = 'All Consultation Records';
      
      if (activeTab) {
          const tabId = activeTab.getAttribute('data-bs-target').replace('#', '');
          switch (tabId) {
              case 'approved':
                  appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'APPROVED');
                  reportTitle = 'Approved Consultation Records';
                  break;
              case 'rejected':
                  appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'REJECTED');
                  reportTitle = 'Rejected Consultation Records';
                  break;
              case 'completed':
                  appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'COMPLETED');
                  reportTitle = 'Completed Consultation Records';
                  break;
              case 'cancelled':
                  appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'CANCELLED');
                  reportTitle = 'Cancelled Consultation Records';
                  break;
              case 'followup':
                  // Filter for follow-up appointments only
                  appointmentsToExport = allAppointments.filter(app => {
                      const isFollowUp = (app.record_kind === 'follow_up') || 
                                       (app.appointment_type && String(app.appointment_type).toLowerCase().includes('follow-up'));
                      const st = (app.status || '').toString().toUpperCase();
                      return isFollowUp && (st === 'PENDING' || st === 'COMPLETED' || st === 'CANCELLED');
                  });
                  reportTitle = 'Follow-up Consultation Records';
                  break;
          }
      }

      // Apply enhanced filters
      appointmentsToExport = applyEnhancedFilters(appointmentsToExport, filters, reportTitle);
      reportTitle = appointmentsToExport.reportTitle || reportTitle;
      appointmentsToExport = appointmentsToExport.appointments || appointmentsToExport;

      // Sort appointments from oldest to newest
      appointmentsToExport.sort((a, b) => {
          const dateTimeA = a.appointed_date + ' ' + a.appointed_time;
          const dateTimeB = b.appointed_date + ' ' + b.appointed_time;
          return dateTimeA < dateTimeB ? -1 : dateTimeA > dateTimeB ? 1 : 0;
      });

      // Add PDS-style university header (mirrors PDS preview header content)
      const pageWidth = doc.internal.pageSize.getWidth();

      // University logos (centered block, matching PDS preview placement)
      const logoTopY = 8;
      const logoHeight = 18;
      const logoWidth = 18;
      const logoGap = 3;
      const totalLogoWidth = logoWidth * 2 + logoGap;
      const logosStartX = (pageWidth - totalLogoWidth) / 2;
      const logoPrimaryX = logosStartX;
      const logoSecondaryX = logosStartX + logoWidth + logoGap;

      doc.addImage(ustpLogoPrimary, 'PNG', logoPrimaryX, logoTopY, logoWidth, logoHeight);
      doc.addImage(ustpLogoSecondary, 'PNG', logoSecondaryX, logoTopY, logoWidth, logoHeight);

      // University header text (centered, same lines as PDS preview)
      // UNIVERSITY NAME – blue, bold, slightly larger (placed safely below logos)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      // University name in darker blue to match PDS preview
      doc.setTextColor(0, 0, 102);
      doc.text(
          'UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES',
          pageWidth / 2,
          30,
          { align: 'center' }
      );

      // Reset to black for the remaining header lines
      doc.setTextColor(0, 0, 0);

      // CAMPUSES LINE – smaller, regular weight
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(
          'Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva',
          pageWidth / 2,
          34,
          { align: 'center' }
      );

      // GUIDANCE AND COUNSELING SERVICES – bold, medium size
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(
          'GUIDANCE AND COUNSELING SERVICES',
          pageWidth / 2,
          38,
          { align: 'center' }
      );

      // Add report title (below GUIDANCE AND COUNSELING SERVICES)
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      const titleWidth = doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(reportTitle, titleX, 44);
      
      // Define table headers (Reason column removed for PDF)
      const tableHeaders = ['User ID', 'Full Name', 'Date', 'Time', 'Method Type', 'Consultation Type', 'Session', 'Purpose', 'Counselor', 'Status'];
      
      const tableData = appointmentsToExport.map(app => {
          const appointmentType = app.appointment_type || (app.record_kind === 'follow_up' ? 'Follow-up' : 'First Session');
          const baseData = [
              (app.student_id || app.user_id || ''),
              app.student_name || '',
              formatDate(app.appointed_date) || '',
              app.appointed_time || '',
              app.method_type || '',
              app.consultation_type || 'Individual Consultation',
              appointmentType,
              app.purpose || 'N/A',
              app.counselor_name || '',
              (app.status ? String(app.status).toLowerCase() : '')
          ];
          
          
          return baseData;
      });

      // Create table configuration
      const tableConfig = {
      startY: 50,
          head: [tableHeaders],
          body: tableData,
          margin: { top: 50, bottom: 25, left: 12, right: 12 },
          tableWidth: 'wrap',
          styles: {
              fontSize: 7,
              cellPadding: 1.5,
              overflow: 'linebreak',
              cellWidth: 'wrap'
          },
          headStyles: {
              fillColor: [0, 51, 102],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              fontSize: 7
          },
          alternateRowStyles: {
              fillColor: [245, 245, 245]
          },
          columnStyles: {
              0: { cellWidth: 17 },  // User ID
              1: { cellWidth: 26 },  // Full Name
              2: { cellWidth: 14 },  // Date
              3: { cellWidth: 16 },  // Time
              4: { cellWidth: 14 },  // Method Type
              5: { cellWidth: 20 },  // Consultation Type
              6: { cellWidth: 16 },  // Session
              7: { cellWidth: 24 },  // Purpose
              8: { cellWidth: 22 },  // Counselor
              9: { cellWidth: 15 },  // Status
          },
          didDrawPage: function(data) {
              // Add PDS-style university header on each page
              const currentPageWidth = doc.internal.pageSize.getWidth();
              const currentPageHeight = doc.internal.pageSize.getHeight();

              doc.addImage(ustpLogoPrimary, 'PNG', logoPrimaryX, logoTopY, logoWidth, logoHeight);
              doc.addImage(ustpLogoSecondary, 'PNG', logoSecondaryX, logoTopY, logoWidth, logoHeight);

              // Mirror header typography and spacing from first page
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(12);
              // University name in darker blue (same as first page)
              doc.setTextColor(0, 0, 102);
              doc.text(
                  'UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES',
                  currentPageWidth / 2,
                  30,
                  { align: 'center' }
              );

              // Reset to black for the remaining header lines
              doc.setTextColor(0, 0, 0);

              doc.setFont('helvetica', 'normal');
              doc.setFontSize(8);
              doc.text(
                  'Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva',
                  currentPageWidth / 2,
                  34,
                  { align: 'center' }
              );

              doc.setFont('helvetica', 'bold');
              doc.setFontSize(10);
              doc.text(
                  'GUIDANCE AND COUNSELING SERVICES',
                  currentPageWidth / 2,
                  38,
                  { align: 'center' }
              );

              // Footer
              const pageHeight = currentPageHeight;
              const margin = 12;
              doc.setDrawColor(0, 0, 0);
              doc.setLineWidth(0.3);
              doc.line(margin, pageHeight - 22, pageWidth - margin, pageHeight - 22);

              doc.setFontSize(7);
              doc.setFont('helvetica', 'normal');

              const leftText = 'Confidential Document';
              const footerMainText = 'Prepared by the University Guidance Counseling Office';
              const currentDate = new Date();
              const dateStr = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              const timeStr = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              const dateTimeText = `Generated: ${dateStr} | ${timeStr} PST | Page ${data.pageNumber}`;
              const centerCombinedText = `${footerMainText}  ${dateTimeText}`;

              const y = pageHeight - 17;
              doc.text(leftText, margin, y, { align: 'left' });
              // Center the combined "Prepared by ... Generated ..." text across the row
              doc.text(centerCombinedText, pageWidth / 2, y, { align: 'center' });

              // Add PDS-style footer (address, contact, and SOCOTEC stamp) BELOW the existing footer text
              doc.setFontSize(7);
              doc.setFont('helvetica', 'normal');

              const footerAddress = 'C.M. Recto Avenue, Lapasan, Cagayan De Oro City 9000 Philippines';
              const footerContact = 'Tel Nos. +63 (88) 856 1738; Telefax +63 (88) 856 4696 | http://www.ustp.edu.ph';

              const footerAddressY = pageHeight - 12;
              const footerContactY = pageHeight - 8;

              doc.text(footerAddress, pageWidth / 2, footerAddressY, { align: 'center' });
              doc.text(footerContact, pageWidth / 2, footerContactY, { align: 'center' });

              // SOCOTEC stamp image aligned to bottom-right similar to PDS preview,
              // slightly smaller and with adjusted aspect ratio to avoid vertical stretching
              const stampWidth = 12;
              const stampHeight = 9;
              const stampX = pageWidth - margin - stampWidth;
              const stampY = pageHeight - margin - stampHeight;
              doc.addImage(socotecStampImage, 'JPEG', stampX, stampY, stampWidth, stampHeight);

              doc.setFontSize(10);
              doc.setFont('helvetica', 'normal');
          }
      };

      // Generate table
      doc.autoTable(tableConfig);

      // Footer: list filter summary
      try {
          const filterSummary = buildFilterSummary(filters);
          const pageWidth2 = doc.internal.pageSize.getWidth();
          // Position summary slightly above the repeated footers to avoid overlap
          const footerY2 = doc.internal.pageSize.getHeight() - 28;
          doc.setFontSize(8);
          doc.text(filterSummary || 'No additional filters applied', pageWidth2 / 2, footerY2, { align: 'center' });
      } catch (e) {
          console.warn('Failed to render export footer:', e);
      }

      // Generate filename and save
      const today = new Date().toISOString().split('T')[0];
      const filename = `${reportTitle.toLowerCase().replace(/\s+/g, '_')}_${today}.pdf`;
      doc.save(filename);
  } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again. Error: ' + error.message);
  }
}

// Export to Excel - ADMIN VERSION
function exportToExcel(filters = {}) {
  // Get current active tab
  const activeTab = document.querySelector('.nav-link.active');
  
  // Get appointments based on active tab
  let appointmentsToExport = [...allAppointments];
  let reportTitle = 'All Consultation Records';
  
  if (activeTab) {
      const tabId = activeTab.getAttribute('data-bs-target').replace('#', '');
      switch (tabId) {
          case 'approved':
              appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'APPROVED');
              reportTitle = 'Approved Consultation Records';
              break;
          case 'rejected':
              appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'REJECTED');
              reportTitle = 'Rejected Consultation Records';
              break;
          case 'completed':
              appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'COMPLETED');
              reportTitle = 'Completed Consultation Records';
              break;
          case 'cancelled':
              appointmentsToExport = allAppointments.filter(app => app.status && app.status.toUpperCase() === 'CANCELLED');
              reportTitle = 'Cancelled Consultation Records';
              break;
          case 'followup':
              // Filter for follow-up appointments only
              appointmentsToExport = allAppointments.filter(app => {
                  const isFollowUp = (app.record_kind === 'follow_up') || 
                                   (app.appointment_type && String(app.appointment_type).toLowerCase().includes('follow-up'));
                  const st = (app.status || '').toString().toUpperCase();
                  return isFollowUp && (st === 'PENDING' || st === 'COMPLETED' || st === 'CANCELLED');
              });
              reportTitle = 'Follow-up Consultation Records';
              break;
      }
  }

  // Apply enhanced filters
  appointmentsToExport = applyEnhancedFilters(appointmentsToExport, filters, reportTitle);
  reportTitle = appointmentsToExport.reportTitle || reportTitle;
  appointmentsToExport = appointmentsToExport.appointments || appointmentsToExport;

  // Sort appointments from oldest to newest
  appointmentsToExport.sort((a, b) => {
      const dateTimeA = a.appointed_date + ' ' + a.appointed_time;
      const dateTimeB = b.appointed_date + ' ' + b.appointed_time;
      return dateTimeA < dateTimeB ? -1 : dateTimeA > dateTimeB ? 1 : 0;
  });

  // Determine if we need to show "Reason for Status" column
  const showReason = reportTitle.includes('Rejected') || reportTitle.includes('Cancelled') || reportTitle.includes('All');

  // Prepare the data with headers
  const headerRow = showReason 
      ? ['User ID', 'Full Name', 'Date', 'Time', 'Method Type', 'Consultation Type', 'Session', 'Purpose', 'Counselor', 'Status', 'Reason for Status']
      : ['User ID', 'Full Name', 'Date', 'Time', 'Method Type', 'Consultation Type', 'Session', 'Purpose', 'Counselor', 'Status'];
  
  const filterSummary = buildFilterSummary(filters) || 'No additional filters applied';
  const excelData = [
      [reportTitle],              // Title row
      [filterSummary],            // Filters summary row
      [],                         // Empty row for spacing
      headerRow                   // Headers
  ];

  // Add the appointment data
  appointmentsToExport.forEach(app => {
      const appointmentType = app.appointment_type || (app.record_kind === 'follow_up' ? 'Follow-up Session' : 'First Session');
      const baseData = [
          (app.student_id || app.user_id || ''),
          app.student_name || '',
          formatDate(app.appointed_date),
          app.appointed_time,
          app.method_type,
          app.consultation_type || 'Individual Consultation',
          appointmentType,
          app.purpose || 'N/A',
          app.counselor_name,
          (app.status ? String(app.status).toLowerCase() : '')
      ];
      
      if (showReason) {
          baseData.push(app.reason || '');
      }
      
      excelData.push(baseData);
  });

  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(excelData);

  // Set column widths
  const cols = [
      { wch: 12 },    // User ID
      { wch: 25 },    // Full Name
      { wch: 12 },    // Date
      { wch: 15 },    // Time
      { wch: 15 },    // Method Type
      { wch: 22 },    // Consultation Type
      { wch: 18 },    // Session
      { wch: 30 },    // Purpose
      { wch: 25 },    // Counselor
      { wch: 12 },    // Status
      ...(showReason ? [{ wch: 40 }] : []) // Reason (if shown)
  ];
  worksheet['!cols'] = cols;

  // Set title merge
  const mergeEnd = showReason ? 10 : 9;
  worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: mergeEnd } }
  ];

  // Apply styles: title (row 1), headers (row 4), and Status column
  (function applyExcelStyles(){
    function addr(r, c){
      return XLSX.utils.encode_cell({ r: r - 1, c });
    }
    // Title styling
    const titleCellRef = addr(1, 0);
    if (!worksheet[titleCellRef]) worksheet[titleCellRef] = { t: 's', v: reportTitle };
    worksheet[titleCellRef].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center' }
    };

    // Header row styling (row 4)
    const headerRow = 4;
    const totalCols = mergeEnd + 1;
    for (let c = 0; c < totalCols; c++) {
      const ref = addr(headerRow, c);
      if (worksheet[ref]) {
        worksheet[ref].s = Object.assign({}, worksheet[ref].s || {}, {
          font: { bold: true },
          alignment: { horizontal: 'center' }
        });
      }
    }

    // Status column bold and centered
    const headerLabels = showReason 
      ? ['User ID', 'Full Name', 'Date', 'Time', 'Method Type', 'Session', 'Purpose', 'Counselor', 'Status', 'Reason for Status']
      : ['User ID', 'Full Name', 'Date', 'Time', 'Method Type', 'Session', 'Purpose', 'Counselor', 'Status'];
    const statusColIdx = headerLabels.indexOf('Status');
    if (statusColIdx >= 0) {
      for (let r = headerRow + 1; r < excelData.length + 1; r++) {
        const ref = addr(r, statusColIdx);
        if (worksheet[ref]) {
          worksheet[ref].s = Object.assign({}, worksheet[ref].s || {}, {
            font: { bold: true },
            alignment: { horizontal: 'center' }
          });
        }
      }
    }
  })();

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');

  // Generate filename and save
  const today = new Date().toISOString().split('T')[0];
  const filename = `${reportTitle.toLowerCase().replace(/\s+/g, '_')}_${today}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

  // View appointment details
  window.viewDetails = function (appointmentId) {
    const appointment = allAppointments.find((app) => app.id === appointmentId);
    if (!appointment) return;

    const modal = new bootstrap.Modal(
      document.getElementById("appointmentModal")
    );
    document.getElementById(
      "modalTitle"
    ).textContent = `Appointment Details - ${appointment.student_id}`;

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Student ID:</strong> ${
                      appointment.student_id
                    }</p>
                    <p><strong>Date:</strong> ${formatDate(
                      appointment.appointed_date
                    )}</p>
                    <p><strong>Time:</strong> ${formatTime(
                      appointment.appointed_time
                    )}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Consultation Type:</strong> ${
                      appointment.method_type
                    }</p>
                    <p><strong>Counselor:</strong> ${
                      appointment.counselor_name
                    }</p>
                    <p><strong>Status:</strong> <span class="badge badge-${getStatusClass(
                      appointment.status
                    )}">${appointment.status}</span></p>
                </div>
            </div>
            <div class="mt-3">
                <p><strong>Notes:</strong></p>
                <p>${appointment.notes || "No notes available"}</p>
            </div>
        `;

    modal.show();
  };

  // Utility functions
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  function formatTime(timeString) {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusClass(status) {
    if (!status) return "pending";
    switch (status.toUpperCase()) {
      case "APPROVED":
        return "approved";
      case "REJECTED":
        return "rejected";
      case "COMPLETED":
        return "completed";
      case "CANCELLED":
        return "cancelled";
      case "PENDING":
      default:
        return "pending";
    }
  }

  // Show loading state
  function showLoading() {
    if (loadingSpinner) loadingSpinner.style.display = "flex";
    if (appointmentsTable) appointmentsTable.style.display = "none";
  }

  // Hide loading state
  function hideLoading() {
    if (loadingSpinner) loadingSpinner.style.display = "none";
    if (appointmentsTable) appointmentsTable.style.display = "table";
  }

  // Show empty state
  function showEmptyState() {
    if (emptyState) emptyState.style.display = "block";
    if (appointmentsTable) appointmentsTable.style.display = "none";
  }

  // Hide empty state
  function hideEmptyState() {
    if (emptyState) emptyState.style.display = "none";
    if (appointmentsTable) appointmentsTable.style.display = "table";
  }

  function showError(message) {
    // You can implement a toast or alert system here
    alert(message);
  }

  function formatReason(reason) {
    if (!reason) return "";
    const idx = reason.indexOf(":");
    if (idx === -1) return reason;
    // Split at the first colon and insert a <br>
    return reason.slice(0, idx + 1) + "<br>" + reason.slice(idx + 1).trim();
  }

  function formatDateForTitle(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
});
