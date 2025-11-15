/**
 * Sidebar and Profile Dropdown Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const sidebar = document.getElementById('adminSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const floatingSidebarToggle = document.getElementById('floatingSidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainWrapper = document.getElementById('mainWrapper');

    // Profile dropdown elements
    const profileDropdownBtn = document.getElementById('profileDropdownBtn');
    const profileDropdownMenu = document.getElementById('profileDropdownMenu');

    // Load sidebar state from localStorage
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed && window.innerWidth >= 992) {
        sidebar.classList.add('collapsed');
    }

    // Function to toggle sidebar
    function toggleSidebar(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (window.innerWidth >= 992) {
            // Desktop: collapse/expand
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        } else {
            // Mobile: toggle visibility
            const isActive = sidebar.classList.contains('active');
            if (isActive) {
                // Close sidebar
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            } else {
                // Open sidebar
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
            }
        }
    }

    // Sidebar toggle (works for both desktop and mobile)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Floating sidebar toggle for mobile
    if (floatingSidebarToggle) {
        floatingSidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Close sidebar when clicking a link on mobile
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });
    });

    // Profile dropdown toggle
    if (profileDropdownBtn) {
        profileDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdownMenu.classList.toggle('show');
        });
    }

    // Close profile dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && e.target !== profileDropdownBtn) {
            profileDropdownMenu.classList.remove('show');
        }
    });

    // Close dropdown when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (profileDropdownMenu) {
                profileDropdownMenu.classList.remove('show');
            }
            if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 992) {
                // Desktop: Remove mobile classes
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                
                // Restore collapsed state from localStorage
                const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
                if (sidebarCollapsed) {
                    sidebar.classList.add('collapsed');
                } else {
                    sidebar.classList.remove('collapsed');
                }
            } else {
                // Mobile: Remove collapsed class
                sidebar.classList.remove('collapsed');
            }
        }, 250);
    });

    // Sync profile data with dropdown
    syncProfileData();
    
    // Update profile data periodically (every 5 minutes)
    setInterval(syncProfileData, 300000);
});

/**
 * Sync profile data between top bar and dropdown
 */
function syncProfileData() {
    SecureLogger.info('Syncing profile data for sidebar...');
    
    fetch((window.BASE_URL || '/') + 'admin/dashboard/data', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const adminData = data.data;
            
            // Update profile images
            const profileImgTop = document.getElementById('profile-img-top');
            const profileImgDropdown = document.getElementById('profile-img-dropdown');
            
            if (profileImgTop && adminData.profile_picture) {
                profileImgTop.src = adminData.profile_picture;
            }
            
            if (profileImgDropdown && adminData.profile_picture) {
                profileImgDropdown.src = adminData.profile_picture;
            }
            
            // Update admin name in top bar button
            const adminNameTop = document.getElementById('adminNameTop');
            if (adminNameTop) {
                adminNameTop.textContent = adminData.username || 'Admin';
            }
            
            // Update admin name in dropdown
            const adminNameDropdown = document.getElementById('adminNameDropdown');
            if (adminNameDropdown) {
                adminNameDropdown.textContent = adminData.username || 'Admin';
            }
            
            // Update last login time
            const lastLoginDropdown = document.getElementById('lastLoginDropdown');
            if (lastLoginDropdown) {
                const formattedTime = formatDateTime(adminData.last_login);
                lastLoginDropdown.textContent = 'Last login: ' + formattedTime;
            }
        }
    })
    .catch(error => {
        console.error('Error syncing profile data:', error);
    });
}

/**
 * Format date and time
 */
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'Never';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Logout confirmation (called from profile dropdown)
 */
if (typeof window.confirmLogout !== 'function') {
    window.confirmLogout = function() {
        if (confirm('Are you sure you want to log out?')) {
            window.location.href = (window.BASE_URL || '/') + 'auth/logout';
        }
    };
}