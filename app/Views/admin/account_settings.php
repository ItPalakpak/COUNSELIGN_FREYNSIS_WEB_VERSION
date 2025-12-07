<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Profile - Counselign</title>
    <link rel="icon" href="<?= base_url('Photos/counselign.ico') ?>" sizes="16x16 32x32" type="image/x-icon">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">
    <link rel="stylesheet" href="<?= base_url('css/admin/account_settings.css') . '?v=' . @filemtime(FCPATH . 'css/admin/account_settings.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/admin/header.css') . '?v=' . @filemtime(FCPATH . 'css/admin/header.css') ?>">
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
            <?= view('partials/sidebar_navigation', ['role' => 'admin']) ?>
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
                    <i class="fas fa-user-cog me-2"></i>
                    Profile
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
        <div class="profile-container">
            <div class="profile-header">
                <div class="wave-shape"></div>
            </div>

            <div class="profile-card">
                <div class="profile-avatar-section">
                    <div class="avatar-container">
                        <img src="<?= base_url('Photos/profile.png') ?>" alt="Profile Avatar" class="profile-avatar"
                            id="profile-avatar">
                    </div>

                    <button class="update-profile-btn" onclick="updateProfilePicture()">
                        <i class="fas fa-camera"></i> Update Profile Photo
                    </button>

                    <div class="profile-id-container">
                        <h2 class="profile-id-label">Account ID:</h2>
                        <div class="profile-id-value" id="admin-id">Loading...</div>
                    </div>
                </div>

                <div class="profile-content">
                    <h3 class="section-title">Personal Information</h3>

                    <div class="info-section">
                        <div class="info-item">
                            <label class="info-label">Email:</label>
                            <div class="info-value" id="admin-email">Loading...</div>
                            <button class="edit-btn" onclick="editField('email')"><i class="fas fa-pen"></i></button>
                        </div>

                        <div class="info-item">
                            <label class="info-label">Username:</label>
                            <div class="info-value" id="admin-username">Loading...</div>
                            <button class="edit-btn" onclick="editField('username')"><i class="fas fa-pen"></i></button>
                        </div>

                        <div class="info-item">
                            <label class="info-label">Password:</label>
                            <button class="change-password-btn" onclick="changePassword()">
                                <i class="fas fa-lock"></i> Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Cropper Modal -->
    <div class="modal fade" id="imageCropperModal" tabindex="-1" aria-labelledby="imageCropperModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageCropperModalLabel">
                        <i class="fas fa-crop me-2"></i>Crop Profile Picture
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="cropper-container" style="max-width: 100%; max-height: 500px; overflow: hidden;">
                        <img id="cropper-image" src="" alt="Crop preview" style="max-width: 100%; display: block;">
                    </div>
                    <div class="mt-3 text-muted small">
                        <i class="fas fa-info-circle me-1"></i>
                        Drag to reposition, resize the crop box to select the area you want to keep. The image will be cropped to a perfect square.
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelCropBtn">
                        <i class="fas fa-times me-1"></i>Cancel
                    </button>
                    <button type="button" class="btn btn-primary" id="applyCropBtn">
                        <i class="fas fa-check me-1"></i>Apply Crop
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
    <script>
        window.BASE_URL = "<?= base_url() ?>";
    </script>
    <script src="<?= base_url('js/utils/secureLogger.js') ?>"></script>
    <script src="<?= base_url('js/utils/imageCropper.js') ?>"></script>
    <script src="<?= base_url('js/admin/account_settings.js?v=1.1') ?>"></script>
    <script src="<?= base_url('js/admin/admin_drawer.js') ?>"></script>
    <script src="<?= base_url('js/admin/logout.js') ?>"></script>
    <script src="<?= base_url('js/utils/sidebar.js') ?>"></script>
    <script src="<?= base_url('js/admin/quotes_badge_updater.js') ?>"></script>
</body>

</html>