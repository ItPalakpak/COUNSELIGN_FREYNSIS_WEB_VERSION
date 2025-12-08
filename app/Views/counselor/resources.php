<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="University Guidance Counseling Services - Resources" />
    <meta name="keywords" content="counseling, guidance, university, support, mental health, resources" />
    <title><?= esc($title) ?></title>
    <link rel="icon" href="<?= base_url('Photos/counselign.ico') ?>" sizes="16x16 32x32" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= base_url('css/counselor/counselor_resources.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/counselor/header.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/utils/sidebar.css') ?>">
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
        <!-- Interactive Profile Picture Section -->
        <!-- Top Bar -->
        <header class="top-bar">
            <div class="top-bar-left">
                <h1 class="page-title-header">
                    <i class="fas fa-folder-open me-2"></i>
                    Resources
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

        <main>
            <!-- Resources Section -->
            <div class="resources-container">
                <div class="resources-grid" id="resourcesGrid">
                    <!-- Resources will be dynamically loaded here -->
                    <div class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading resources...</span>
                        </div>
                        <p class="mt-2 text-muted">Loading resources...</p>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Preview Modal -->
    <div class="modal fade" id="previewModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="previewModalTitle">Resource Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="previewModalBody" style="min-height: 400px;">
                    <!-- Preview content will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Required libraries for resource preview -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    
    <script>
        window.BASE_URL = "<?= base_url() ?>";
    </script>
    
    <!-- Shared Resource Preview Module -->
    <script src="<?= base_url('js/utils/resource-preview.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_resources.js') ?>" defer></script>
    <script src="<?= base_url('js/counselor/counselor_drawer.js') ?>"></script>
    <script src="<?= base_url('js/utils/secureLogger.js') ?>"></script>
    <script src="<?= base_url('js/counselor/logout.js') ?>"></script>
    <script src="<?= base_url('js/utils/sidebar.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_messages_badge_updater.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_notifications_badge_updater.js') ?>"></script>
</body>

</html>

