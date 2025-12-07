<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="description" content="Counselign - Quotes Management">
    <title>Quotes Management - Counselign</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" href="<?= base_url('Photos/counselign.ico') ?>" type="image/x-icon">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= base_url('css/utils/sidebar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/admin/admin_dashboard.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/admin/quotes_management.css') ?>">
</head>

<body>
    <!-- Sidebar -->
    <aside class="sidebar" id="uniSidebar">
        <div class="sidebar-content">
            <!-- Logo/Toggle Button -->
            <button class="sidebar-toggle-btn" id="sidebarToggle" title="Toggle Sidebar">
                <img src="<?= base_url('Photos/counselign_logo.png') ?>" alt="Logo" class="sidebar-logo">
                <span class="sidebar-brand-text">Counselign</span>
            </button>

            <!-- Navigation Links -->
            <?= view('partials/sidebar_navigation', ['role' => 'admin']) ?>
        </div>
    </aside>

    <!-- Sidebar Overlay for Mobile -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Floating Sidebar Toggle for Mobile (shows when sidebar is hidden) -->
    <button class="floating-sidebar-toggle" id="floatingSidebarToggle" title="Open Menu">
        <img src="<?= base_url('Photos/counselign_logo.png') ?>" alt="Menu">
    </button>

    <!-- Main Content Area -->
    <div class="main-wrapper" id="mainWrapper">
        <!-- Top Bar -->
        <header class="top-bar">
            <div class="top-bar-left">
                <h1 class="page-title-header">
                    <i class="fas fa-quote-right me-2"></i>
                    Quotes Management
                </h1>
            </div>

            <div class="top-bar-right">
                <!-- Profile Dropdown -->
                <div class="profile-dropdown">
                    <button class="top-bar-btn profile-btn" id="profileDropdownBtn">
                        <img id="profile-img-top" src="<?= base_url('Photos/UGC-Logo.png') ?>" alt="Profile" class="profile-img-small">
                        <span class="btn-label" id="uniNameTop">Admin</span>
                    </button>

                    <div class="profile-dropdown-menu" id="profileDropdownMenu">
                        <div class="profile-dropdown-header">
                            <img id="profile-img-dropdown" src="<?= base_url('Photos/UGC-Logo.png') ?>" alt="Profile" class="profile-img-large">
                            <div class="profile-info">
                                <div class="profile-name" id="uniNameDropdown">Admin</div>
                                <div class="profile-subtitle" id="lastLoginDropdown">Loading...</div>
                            </div>
                        </div>
                        <div class="profile-dropdown-divider"></div>
                        <a href="<?= base_url('admin/account-settings') ?>" class="profile-dropdown-item">
                            <i class="fas fa-user-cog"></i>
                            <span>Profile</span>
                        </a>
                        <div class="profile-dropdown-divider"></div>
                        <button class="profile-dropdown-item" onclick="confirmLogout()">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <div class="container py-4">
                <!-- Page Header -->
                <div class="page-header mb-4">
                    <p class="text-muted mb-0">Manage and moderate inspirational quotes submitted by counselors</p>
                </div>

                <!-- Search and Filter Section -->
                <div class="filter-section mb-4">
                    <div class="row g-3 align-items-end">
                        <!-- Search Input -->
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-search"></i></span>
                                <input type="text" class="form-control" id="searchInput" placeholder="Search quotes, authors, or sources...">
                            </div>
                        </div>

                        <!-- Status Filter -->
                        <div class="col-md-2">
                            <select class="form-select" id="statusFilter">
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <!-- Category Filter -->
                        <div class="col-md-2">
                            <select class="form-select" id="categoryFilter">
                                <option value="">All Categories</option>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Motivational">Motivational</option>
                                <option value="Wisdom">Wisdom</option>
                                <option value="Life">Life</option>
                                <option value="Success">Success</option>
                                <option value="Education">Education</option>
                                <option value="Perseverance">Perseverance</option>
                                <option value="Courage">Courage</option>
                                <option value="Hope">Hope</option>
                                <option value="Kindness">Kindness</option>
                            </select>
                        </div>

                        <!-- Submitted By Filter -->
                        <div class="col-md-2">
                            <select class="form-select" id="submittedByFilter">
                                <option value="">All Submitters</option>
                            </select>
                        </div>

                        <!-- Date Range Filter -->
                        <div class="col-md-1">
                            <input type="date" class="form-control" id="dateFilter" placeholder="Filter by date">
                        </div>

                        <!-- Clear Filters Button -->
                        <div class="col-md-1">
                            <button class="btn btn-outline-secondary btn-sm w-100" id="clearFiltersBtn" title="Clear All Filters">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Statistics Summary -->
                <div class="row stats-summary mb-4">
                    <div class="col-md-4">
                        <div class="stat-card pending">
                            <div class="stat-icon"><i class="fas fa-clock"></i></div>
                            <div class="stat-details">
                                <h3 id="pendingCount">0</h3>
                                <p>Pending</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card approved">
                            <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                            <div class="stat-details">
                                <h3 id="approvedCount">0</h3>
                                <p>Approved</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card rejected">
                            <div class="stat-icon"><i class="fas fa-times-circle"></i></div>
                            <div class="stat-details">
                                <h3 id="rejectedCount">0</h3>
                                <p>Rejected</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quotes Cards Container -->
                <div id="quotesContainer" class="quotes-container">
                    <!-- Loading Spinner -->
                    <div class="loading-spinner text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading quotes...</span>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div id="emptyState" class="empty-state text-center py-5" style="display: none;">
                    <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <p class="text-muted">No quotes found matching your filters</p>
                </div>
            </div>
        </main>
    </div>

    <!-- Rejection Reason Modal -->
    <div class="modal fade" id="rejectionReasonModal" tabindex="-1" aria-labelledby="rejectionReasonModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="rejectionReasonModalLabel">
                        <i class="fas fa-times-circle me-2 text-danger"></i>Reject Quote
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted mb-3">Please provide a reason for rejecting this quote:</p>
                    <form id="rejectionReasonForm">
                        <div class="mb-3">
                            <label for="rejectionReason" class="form-label">Rejection Reason <span class="text-danger">*</span></label>
                            <textarea
                                class="form-control"
                                id="rejectionReason"
                                name="rejection_reason"
                                rows="4"
                                maxlength="500"
                                placeholder="Enter the reason for rejection..."
                                required></textarea>
                            <div class="form-text">This reason will be visible to the counselor who submitted the quote.</div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmRejectionBtn">
                        <i class="fas fa-times-circle me-2"></i>Reject Quote
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Shared Confirmation Modal -->
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmationModalLabel">Confirm Action</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="confirmationMessageContent">Are you sure?</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="confirmationConfirmBtn">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Shared Alert Modal -->
    <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="alertModalLabel">Information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex align-items-start gap-2">
                    <span id="alertIcon"><i class="fas fa-info-circle text-primary"></i></span>
                    <span id="alertMessageContent">Message</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.BASE_URL = "<?= base_url() ?>";
    </script>
    <script src="<?= base_url('js/utils/sidebar.js') ?>"></script>
    <script src="<?= base_url('js/modals/student_dashboard_modals.js') ?>"></script>
    <script src="<?= base_url('js/admin/profile_sync.js') ?>"></script>
    <script src="<?= base_url('js/admin/quotes_badge_updater.js') ?>"></script>
    <script src="<?= base_url('js/admin/quotes_management_page.js') ?>"></script>
    <script src="<?= base_url('js/admin/logout.js') ?>" defer></script>
    <script src="<?= base_url('js/utils/secureLogger.js') ?>"></script>
</body>

</html>

