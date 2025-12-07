<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="University Guidance Counseling Services - Your safe space for support and guidance" />
    <meta name="keywords" content="counseling, guidance, university, support, mental health, student wellness" />
    <title>Notifications - Counselign</title>
    <link rel="icon" href="<?= base_url('Photos/counselign.ico') ?>" sizes="16x16 32x32" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="<?= base_url('css/counselor/counselor_dashboard.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/utils/sidebar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/counselor/notifications.css') ?>">
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
            <?= view('partials/sidebar_navigation', ['role' => 'counselor']) ?>
        </div>
    </aside>

    <!-- Sidebar Overlay for Mobile -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Floating Sidebar Toggle for Mobile (shows when sidebar is hidden) -->
    <button class="floating-sidebar-toggle" id="floatingSidebarToggle" title="Open Menu">
        <img src="<?= base_url('Photos/counselign_logo.png') ?>" alt="Menu">
    </button>

    <div class="main-wrapper" id="mainWrapper">
        <!-- Top Bar -->
        <header class="top-bar">
            <div class="top-bar-left">
                <h1 class="page-title-header">
                    <i class="fas fa-bell me-2"></i>
                    Notifications
                </h1>
            </div>

            <div class="top-bar-right">
                <!-- Profile Dropdown -->
                <div class="profile-dropdown">
                    <button class="top-bar-btn profile-btn" id="profileDropdownBtn">
                        <img id="profile-img-top" src="<?= base_url('Photos/profile.png') ?>" alt="Profile" class="profile-img-small">
                        <span class="btn-label" id="uniNameTop">Counselor</span>
                    </button>

                    <div class="profile-dropdown-menu" id="profileDropdownMenu">
                        <div class="profile-dropdown-header">
                            <img id="profile-img-dropdown" src="<?= base_url('Photos/profile.png') ?>" alt="Profile" class="profile-img-large">
                            <div class="profile-info">
                                <div class="profile-name" id="uniNameDropdown">Counselor</div>
                                <div class="profile-subtitle" id="lastLoginDropdown">Loading...</div>
                            </div>
                        </div>
                        <div class="profile-dropdown-divider"></div>
                        <a href="<?= base_url('counselor/profile') ?>" class="profile-dropdown-item">
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

        <!-- Notifications Content -->
        <div class="notifications-page-content">
            <!-- Toolbar -->
            <div class="notifications-toolbar">
                <div class="toolbar-left">
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="notificationSearch" class="form-control search-input" placeholder="Search notifications...">
                    </div>
                    <select id="notificationFilter" class="form-select filter-select">
                        <option value="all">All Types</option>
                        <option value="appointment">Appointments</option>
                        <option value="announcement">Announcements</option>
                        <option value="event">Events</option>
                        <option value="message">Messages</option>
                        <option value="follow-up">Follow-up</option>
                    </select>
                    <select id="readStatusFilter" class="form-select filter-select">
                        <option value="all">All Status</option>
                        <option value="unread">Unread Only</option>
                        <option value="read">Read Only</option>
                    </select>
                </div>
                <div class="toolbar-right">
                    <div class="selection-controls" id="selectionControls" style="display: none;">
                        <span id="selectedCount" class="selected-count">0 selected</span>
                        <button class="btn btn-sm btn-outline-danger" id="deleteSelectedBtn" title="Delete Selected">
                            <i class="fas fa-trash"></i> Delete Selected
                        </button>
                    </div>
                    <button class="btn btn-sm btn-outline-primary" id="markAllReadBtn" title="Mark all as read">
                        <i class="fas fa-check-double"></i> Mark All as Read
                    </button>
                    <button class="btn btn-sm btn-outline-danger" id="deleteAllBtn" title="Delete all notifications">
                        <i class="fas fa-trash-alt"></i> Delete All
                    </button>
                </div>
            </div>

            <!-- Notifications List -->
            <div class="notifications-list-container">
                <div id="notificationsList" class="notifications-list-page">
                    <div class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading notifications...</span>
                        </div>
                        <p class="mt-2 text-muted">Loading notifications...</p>
                    </div>
                </div>
                <div id="emptyState" class="empty-state" style="display: none;">
                    <i class="fas fa-bell-slash"></i>
                    <p>No notifications found</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Shared Modals -->
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

    <script src="<?= base_url('js/modals/student_dashboard_modals.js') ?>"></script>
    <script src="<?= base_url('js/counselor/notifications.js') ?>"></script>
    <script src="<?= base_url('js/counselor/logout.js') ?>"></script>
    <script src="<?= base_url('js/utils/sidebar.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_messages_badge_updater.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_notifications_badge_updater.js') ?>"></script>
    <script src="<?= base_url('js/utils/secureLogger.js') ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.BASE_URL = "<?= base_url() ?>";
    </script>
</body>

</html>

