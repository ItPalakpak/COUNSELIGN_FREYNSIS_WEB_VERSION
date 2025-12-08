<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="University Guidance Counseling Services - Quotes Management" />
    <meta name="keywords" content="counseling, guidance, university, support, mental health, quotes" />
    <title><?= esc($title) ?></title>
    <link rel="icon" href="<?= base_url('Photos/counselign.ico') ?>" sizes="16x16 32x32" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= base_url('css/counselor/counselor_quotes.css') ?>">
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
        <!-- Top Bar -->
        <header class="top-bar">
            <div class="top-bar-left">
                <h1 class="page-title-header">
                    <i class="fas fa-quote-right me-2"></i>
                    Quotes
                </h1>
            </div>

            <div class="top-bar-right">
                <!-- Add Quote Button -->
                <button class="top-bar-btn" id="openQuoteModalBtn" title="Add New Quote">
                    <i class="fas fa-plus-circle text-2xl"></i>
                    <span class="btn-label">Add New Quote</span>
                </button>

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
            <!-- Quotes Section -->
            <div class="quotes-container">
                <div class="quotes-header mb-4">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        <strong>Status Guide:</strong>
                        <span class="badge bg-warning ms-2">
                            Pending Review
                            <span class="status-count" id="pendingCount">0</span>
                        </span>
                        <span class="badge bg-success ms-1">
                            Approved
                            <span class="status-count" id="approvedCount">0</span>
                        </span>
                        <span class="badge bg-danger ms-1">
                            Rejected
                            <span class="status-count" id="rejectedCount">0</span>
                        </span>
                    </div>
                </div>
                
                <!-- Search and Filter Toolbar -->
                <div class="quotes-toolbar">
                    <div class="toolbar-left">
                        <div class="search-container">
                            <i class="fas fa-search search-icon"></i>
                            <input type="text" id="quoteSearchInput" class="form-control search-input" placeholder="Search quotes, author, category, source...">
                        </div>
                        <select id="statusFilter" class="form-select filter-select">
                            <option value="all">All Status</option>
                            <option value="pending">Pending Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select id="categoryFilter" class="form-select filter-select">
                            <option value="all">All Categories</option>
                            <option value="Inspirational">✨ Inspirational</option>
                            <option value="Motivational">💪 Motivational</option>
                            <option value="Wisdom">🦉 Wisdom</option>
                            <option value="Life">🌱 Life</option>
                            <option value="Success">🎯 Success</option>
                            <option value="Education">📚 Education</option>
                            <option value="Perseverance">🏔️ Perseverance</option>
                            <option value="Courage">🦁 Courage</option>
                            <option value="Hope">🌟 Hope</option>
                            <option value="Kindness">💝 Kindness</option>
                        </select>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn btn-sm btn-outline-secondary" id="clearFiltersBtn" title="Clear Filters">
                            <i class="fas fa-times me-1"></i>Clear
                        </button>
                    </div>
                </div>
                
                <!-- Results Count -->
                <div class="quotes-results-count" id="quotesResultsCount" style="display: none;">
                    <i class="fas fa-info-circle"></i>
                    <span id="resultsCountText">0 quotes found</span>
                </div>
                
                <div class="quotes-grid" id="quotesGrid">
                    <!-- Quotes will be dynamically loaded here -->
                    <div class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading quotes...</span>
                        </div>
                        <p class="mt-2 text-muted">Loading quotes...</p>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Quote Submission Modal -->
    <div class="modal fade" id="quoteSubmissionModal" tabindex="-1" aria-labelledby="quoteSubmissionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background: linear-gradient(135deg, #060E57, #0A1875); color: white;">
                    <h5 class="modal-title" id="quoteSubmissionModalLabel">
                        <i class="fas fa-quote-left me-2"></i>Share a Daily Quote
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted mb-4">
                        <i class="fas fa-info-circle me-1"></i>
                        Inspire students by submitting motivational quotes. Your submissions will be reviewed by admins before being displayed.
                    </p>

                    <form id="quoteSubmissionForm">
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="quoteText" class="form-label fw-bold">
                                    Quote <span class="text-danger">*</span>
                                </label>
                                <textarea
                                    class="form-control"
                                    id="quoteText"
                                    name="quote_text"
                                    rows="4"
                                    maxlength="500"
                                    placeholder="Enter an inspirational quote..."
                                    required></textarea>
                                <div class="form-text d-flex justify-content-between">
                                    <span>Share wisdom that inspires and motivates</span>
                                    <span class="fw-bold"><span id="charCount">0</span>/500</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <label for="authorName" class="form-label fw-bold">
                                    Author <span class="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="authorName"
                                    name="author_name"
                                    maxlength="255"
                                    placeholder="e.g., Maya Angelou"
                                    required>
                            </div>

                            <div class="col-md-6">
                                <label for="category" class="form-label fw-bold">
                                    Category <span class="text-danger">*</span>
                                </label>
                                <select class="form-select" id="category" name="category" required>
                                    <option value="" disabled selected>Select a category</option>
                                    <option value="Inspirational">✨ Inspirational</option>
                                    <option value="Motivational">💪 Motivational</option>
                                    <option value="Wisdom">🦉 Wisdom</option>
                                    <option value="Life">🌱 Life</option>
                                    <option value="Success">🎯 Success</option>
                                    <option value="Education">📚 Education</option>
                                    <option value="Perseverance">🏔️ Perseverance</option>
                                    <option value="Courage">🦁 Courage</option>
                                    <option value="Hope">🌟 Hope</option>
                                    <option value="Kindness">💝 Kindness</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label for="source" class="form-label fw-bold">
                                    Source <span class="text-muted">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="source"
                                    name="source"
                                    maxlength="255"
                                    placeholder="e.g., Book title, Speech, Movie">
                                <div class="form-text">Where this quote is from (optional)</div>
                            </div>
                        </div>

                        <!-- Alert Container -->
                        <div id="quoteAlertContainer" class="mt-3"></div>
                    </form>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>Cancel
                    </button>
                    <button type="submit" class="btn btn-primary" id="submitQuoteBtn" form="quoteSubmissionForm">
                        <i class="fas fa-paper-plane me-2"></i>Submit Quote
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
    <script src="<?= base_url('js/modals/student_dashboard_modals.js') ?>"></script>
    <script>
        window.BASE_URL = "<?= base_url() ?>";
    </script>
    <script src="<?= base_url('js/counselor/counselor_quotes.js') ?>" defer></script>
    <script src="<?= base_url('js/counselor/counselor_drawer.js') ?>"></script>
    <script src="<?= base_url('js/utils/secureLogger.js') ?>"></script>
    <script src="<?= base_url('js/counselor/logout.js') ?>"></script>
    <script src="<?= base_url('js/utils/sidebar.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_messages_badge_updater.js') ?>"></script>
    <script src="<?= base_url('js/counselor/counselor_notifications_badge_updater.js') ?>"></script>
</body>

</html>

