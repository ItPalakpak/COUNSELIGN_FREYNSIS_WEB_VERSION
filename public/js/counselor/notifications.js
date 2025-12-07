/**
 * Counselor Notifications Page
 * Handles loading, displaying, searching, filtering, and managing notifications
 */

(function() {
    'use strict';

    let allNotifications = [];
    let filteredNotifications = [];
    let selectedNotificationIds = new Set();

    // DOM Elements
    const notificationsList = document.getElementById('notificationsList');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('notificationSearch');
    const typeFilter = document.getElementById('notificationFilter');
    const statusFilter = document.getElementById('readStatusFilter');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    const selectionControls = document.getElementById('selectionControls');
    const selectedCountSpan = document.getElementById('selectedCount');

    /**
     * Initialize the notifications page
     */
    function init() {
        if (!notificationsList) {
            console.error('[Notifications] Notifications list container not found');
            return;
        }

        // Load notifications
        loadNotifications();

        // Set up event listeners
        setupEventListeners();

        // Set up periodic refresh (every 30 seconds)
        setInterval(loadNotifications, 30000);
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }

        // Filters
        if (typeFilter) {
            typeFilter.addEventListener('change', handleFilter);
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', handleFilter);
        }

        // Mark all as read
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', handleMarkAllAsRead);
        }

        // Delete all
        if (deleteAllBtn) {
            deleteAllBtn.addEventListener('click', handleDeleteAll);
        }

        // Delete selected
        if (deleteSelectedBtn) {
            deleteSelectedBtn.addEventListener('click', handleDeleteSelected);
        }
    }

    /**
     * Load notifications from API
     */
    function loadNotifications() {
        fetch(window.BASE_URL + 'counselor/notifications/all', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                let notifications = Array.isArray(data.notifications) ? data.notifications : [];
                
                // Apply client-side expiration filtering
                notifications = filterExpiredNotifications(notifications);
                
                allNotifications = notifications;
                applyFilters();
            } else {
                showError('Failed to load notifications');
            }
        })
        .catch(error => {
            console.error('[Notifications] Error loading notifications:', error);
            showError('Unable to connect to server');
        });
    }

    /**
     * Filter out expired notifications
     */
    function filterExpiredNotifications(notifications) {
        const now = new Date();
        return notifications.filter(notification => {
            // Check if event has passed
            if (notification.type === 'event' && notification.event_date) {
                const eventDate = new Date(notification.event_date);
                return eventDate > now;
            }
            // Check if appointment has passed (keep for 7 days after appointment date)
            if (notification.type === 'appointment' && notification.appointment_date) {
                const appointmentDate = new Date(notification.appointment_date);
                const sevenDaysAfter = new Date(appointmentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                return sevenDaysAfter > now;
            }
            // Keep all other notification types
            return true;
        });
    }

    /**
     * Apply search and filters
     */
    function applyFilters() {
        let filtered = [...allNotifications];

        // Apply search filter
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (searchTerm) {
            filtered = filtered.filter(notification => {
                const title = (notification.title || '').toLowerCase();
                const message = (notification.message || '').toLowerCase();
                return title.includes(searchTerm) || message.includes(searchTerm);
            });
        }

        // Apply type filter
        const selectedType = typeFilter ? typeFilter.value : 'all';
        if (selectedType !== 'all') {
            filtered = filtered.filter(notification => {
                if (selectedType === 'follow-up') {
                    return notification.type === 'follow-up' || notification.type === 'follow_up_session';
                }
                return notification.type === selectedType;
            });
        }

        // Apply status filter
        const selectedStatus = statusFilter ? statusFilter.value : 'all';
        if (selectedStatus === 'unread') {
            filtered = filtered.filter(notification => {
                return notification.is_read === null || 
                       notification.is_read === undefined || 
                       notification.is_read === 0 || 
                       notification.is_read === false || 
                       notification.is_read === '0';
            });
        } else if (selectedStatus === 'read') {
            filtered = filtered.filter(notification => {
                return notification.is_read !== null && 
                       notification.is_read !== undefined && 
                       notification.is_read !== 0 && 
                       notification.is_read !== false && 
                       notification.is_read !== '0';
            });
        }

        filteredNotifications = filtered;
        renderNotifications();
    }

    /**
     * Handle search input
     */
    function handleSearch() {
        applyFilters();
    }

    /**
     * Handle filter changes
     */
    function handleFilter() {
        applyFilters();
    }

    /**
     * Render notifications list
     */
    function renderNotifications() {
        if (!notificationsList) return;

        if (filteredNotifications.length === 0) {
            notificationsList.style.display = 'none';
            if (emptyState) {
                emptyState.style.display = 'block';
            }
            return;
        }

        notificationsList.style.display = 'block';
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        notificationsList.innerHTML = '';

        filteredNotifications.forEach(notification => {
            const notificationItem = createNotificationItem(notification);
            notificationsList.appendChild(notificationItem);
        });
    }

    /**
     * Create a notification item element
     */
    function createNotificationItem(notification) {
        const item = document.createElement('div');
        item.className = 'notification-item-row';
        
        // Check if notification is unread - handle null, undefined, 0, false, or '0'
        const isUnread = notification.is_read === null || 
                        notification.is_read === undefined || 
                        notification.is_read === 0 || 
                        notification.is_read === false || 
                        notification.is_read === '0';
        
        if (isUnread) {
            item.classList.add('unread');
        }

        const notificationId = notification.id || null;
        const notificationType = notification.type || '';
        const relatedId = notification.related_id || null;

        // Format date
        const notifDate = new Date(notification.created_at);
        const formattedDate = notifDate.toLocaleDateString() + ' ' + notifDate.toLocaleTimeString();

        // Get type icon
        const typeIcon = getTypeIcon(notificationType);

        // Checkbox for selection
        const checkbox = notificationId ? `
            <input type="checkbox" class="notification-checkbox" data-notification-id="${notificationId}" aria-label="Select notification">
        ` : '';

        // Action buttons
        const actionButtons = `
            <div class="notification-actions">
                ${notificationId ? `
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-notification-id="${notificationId}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
                ${isUnread ? `
                    <button class="btn btn-sm btn-outline-primary mark-read-btn" 
                        data-notification-id="${notificationId || ''}" 
                        data-type="${notificationType}" 
                        data-related-id="${relatedId || ''}" 
                        title="Mark as read">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
            </div>
        `;

        item.innerHTML = `
            <div class="notification-item-content">
                ${checkbox}
                <div class="notification-icon">${typeIcon}</div>
                <div class="notification-details">
                    <div class="notification-header-row">
                        <h4 class="notification-title">${escapeHtml(notification.title || 'Notification')}</h4>
                        <span class="notification-time">${formattedDate}</span>
                    </div>
                    <p class="notification-message">${escapeHtml(notification.message || '')}</p>
                    <div class="notification-meta">
                        <span class="notification-type-badge badge bg-secondary">${escapeHtml(notificationType)}</span>
                        ${isUnread ? '<span class="unread-badge badge bg-primary">Unread</span>' : ''}
                    </div>
                </div>
                ${actionButtons}
            </div>
        `;

        // Add event listeners
        setupNotificationItemListeners(item, notification, notificationId, notificationType, relatedId);

        return item;
    }

    /**
     * Get icon for notification type
     */
    function getTypeIcon(type) {
        const icons = {
            'appointment': '<i class="fas fa-calendar-check"></i>',
            'announcement': '<i class="fas fa-bullhorn"></i>',
            'event': '<i class="fas fa-calendar-alt"></i>',
            'message': '<i class="fas fa-envelope"></i>',
            'follow-up': '<i class="fas fa-clipboard-list"></i>',
            'follow_up_session': '<i class="fas fa-clipboard-list"></i>'
        };
        return icons[type] || '<i class="fas fa-bell"></i>';
    }

    /**
     * Set up event listeners for notification item
     */
    function setupNotificationItemListeners(item, notification, notificationId, notificationType, relatedId) {
        // Checkbox
        const checkbox = item.querySelector('.notification-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedNotificationIds.add(notificationId);
                } else {
                    selectedNotificationIds.delete(notificationId);
                }
                updateSelectionControls();
            });
        }

        // Mark as read button
        const markReadBtn = item.querySelector('.mark-read-btn');
        if (markReadBtn) {
            markReadBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleMarkAsRead(notificationId, notificationType, relatedId, item);
            });
        }

        // Delete button
        const deleteBtn = item.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleDeleteSingle(notificationId, item);
            });
        }

        // Click on item to mark as read and redirect (if unread)
        const isUnreadForClick = notification.is_read === null || 
                                 notification.is_read === undefined || 
                                 notification.is_read === 0 || 
                                 notification.is_read === false || 
                                 notification.is_read === '0';
        
        if (isUnreadForClick) {
            item.addEventListener('click', function(e) {
                // Don't trigger if clicking on buttons or checkbox
                if (e.target.closest('.notification-actions') || e.target.closest('.notification-checkbox')) {
                    return;
                }
                
                // Mark as read first, then redirect after completion
                handleMarkAsRead(notificationId, notificationType, relatedId, item)
                    .then(() => {
                        // Redirect after marking as read is complete
                        redirectToNotificationPage(notificationType);
                    })
                    .catch(error => {
                        console.error('[Notifications] Error marking as read before redirect:', error);
                        // Still redirect even if mark-as-read fails
                        redirectToNotificationPage(notificationType);
                    });
            });
        }
        
        // Make read notifications clickable for navigation too
        const isReadForClick = notification.is_read !== null && 
                              notification.is_read !== undefined && 
                              notification.is_read !== 0 && 
                              notification.is_read !== false && 
                              notification.is_read !== '0';
        
        if (isReadForClick) {
            item.addEventListener('click', function(e) {
                // Don't trigger if clicking on buttons or checkbox
                if (e.target.closest('.notification-actions') || e.target.closest('.notification-checkbox')) {
                    return;
                }
                
                // Redirect based on notification type (already read, so just navigate)
                redirectToNotificationPage(notificationType);
            });
        }
    }

    /**
     * Handle mark as read for single notification
     * Returns a Promise that resolves when the notification is marked as read
     */
    function handleMarkAsRead(notificationId, notificationType, relatedId, itemElement) {
        const payload = {};
        if (notificationId) {
            payload.notification_id = notificationId;
        } else if (notificationType && relatedId) {
            payload.type = notificationType;
            payload.related_id = relatedId;
        } else {
            console.error('[Notifications] Invalid parameters for markAsRead');
            return Promise.reject(new Error('Invalid parameters'));
        }

        return fetch(window.BASE_URL + 'counselor/notifications/mark-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Update UI
                if (itemElement) {
                    itemElement.classList.remove('unread');
                    const unreadBadge = itemElement.querySelector('.unread-badge');
                    if (unreadBadge) {
                        unreadBadge.remove();
                    }
                    const markReadBtn = itemElement.querySelector('.mark-read-btn');
                    if (markReadBtn) {
                        markReadBtn.remove();
                    }
                }
                
                // Update notification in array
                const notification = allNotifications.find(n => 
                    (n.id && n.id === notificationId) || 
                    (n.type === notificationType && n.related_id === relatedId)
                );
                if (notification) {
                    notification.is_read = 1;
                }

                // Reload to refresh count (don't wait for this)
                loadNotifications();
                
                return Promise.resolve();
            } else {
                console.error('[Notifications] Error marking as read:', data.message);
                return Promise.reject(new Error(data.message || 'Failed to mark as read'));
            }
        })
        .catch(error => {
            console.error('[Notifications] Error marking as read:', error);
            return Promise.reject(error);
        });
    }

    /**
     * Handle mark all as read
     */
    function handleMarkAllAsRead() {
        if (typeof openConfirmationModal === 'function') {
            openConfirmationModal(
                'Are you sure you want to mark all notifications as read?',
                function() {
                    performMarkAllAsRead();
                }
            );
        } else {
            if (confirm('Are you sure you want to mark all notifications as read?')) {
                performMarkAllAsRead();
            }
        }
    }

    /**
     * Perform mark all as read
     */
    function performMarkAllAsRead() {
        fetch(window.BASE_URL + 'counselor/notifications/mark-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ mark_all: true })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                loadNotifications();
            } else {
                console.error('[Notifications] Error marking all as read:', data.message);
            }
        })
        .catch(error => {
            console.error('[Notifications] Error marking all as read:', error);
        });
    }

    /**
     * Handle delete single notification
     */
    function handleDeleteSingle(notificationId, itemElement) {
        if (typeof openConfirmationModal === 'function') {
            openConfirmationModal(
                'Are you sure you want to delete this notification?',
                function() {
                    performDeleteSingle(notificationId, itemElement);
                }
            );
        } else {
            if (confirm('Are you sure you want to delete this notification?')) {
                performDeleteSingle(notificationId, itemElement);
            }
        }
    }

    /**
     * Perform delete single notification
     */
    function performDeleteSingle(notificationId, itemElement) {
        fetch(window.BASE_URL + 'counselor/notifications/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ notification_ids: [notificationId] })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Remove from DOM
                itemElement.remove();
                
                // Remove from arrays
                allNotifications = allNotifications.filter(n => n.id !== notificationId);
                filteredNotifications = filteredNotifications.filter(n => n.id !== notificationId);
                
                // Update UI
                if (filteredNotifications.length === 0) {
                    renderNotifications();
                }
                
                // Reload to refresh count
                loadNotifications();
            } else {
                console.error('[Notifications] Error deleting notification:', data.message);
            }
        })
        .catch(error => {
            console.error('[Notifications] Error deleting notification:', error);
        });
    }

    /**
     * Handle delete all
     */
    function handleDeleteAll() {
        if (typeof openConfirmationModal === 'function') {
            openConfirmationModal(
                'Are you sure you want to delete ALL notifications? This action cannot be undone.',
                function() {
                    performDeleteAll();
                }
            );
        } else {
            if (confirm('Are you sure you want to delete ALL notifications? This action cannot be undone.')) {
                performDeleteAll();
            }
        }
    }

    /**
     * Perform delete all
     */
    function performDeleteAll() {
        fetch(window.BASE_URL + 'counselor/notifications/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ delete_all: true })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                allNotifications = [];
                filteredNotifications = [];
                renderNotifications();
                loadNotifications();
            } else {
                console.error('[Notifications] Error deleting all:', data.message);
            }
        })
        .catch(error => {
            console.error('[Notifications] Error deleting all:', error);
        });
    }

    /**
     * Handle delete selected
     */
    function handleDeleteSelected() {
        if (selectedNotificationIds.size === 0) {
            return;
        }

        const count = selectedNotificationIds.size;
        if (typeof openConfirmationModal === 'function') {
            openConfirmationModal(
                `Are you sure you want to delete ${count} selected notification(s)?`,
                function() {
                    performDeleteSelected();
                }
            );
        } else {
            if (confirm(`Are you sure you want to delete ${count} selected notification(s)?`)) {
                performDeleteSelected();
            }
        }
    }

    /**
     * Perform delete selected
     */
    function performDeleteSelected() {
        const notificationIds = Array.from(selectedNotificationIds);
        
        fetch(window.BASE_URL + 'counselor/notifications/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ notification_ids: notificationIds })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Remove from arrays
                allNotifications = allNotifications.filter(n => !notificationIds.includes(n.id));
                filteredNotifications = filteredNotifications.filter(n => !notificationIds.includes(n.id));
                
                // Clear selection
                selectedNotificationIds.clear();
                updateSelectionControls();
                
                // Re-render
                renderNotifications();
                
                // Reload to refresh count
                loadNotifications();
            } else {
                console.error('[Notifications] Error deleting selected:', data.message);
            }
        })
        .catch(error => {
            console.error('[Notifications] Error deleting selected:', error);
        });
    }

    /**
     * Update selection controls visibility
     */
    function updateSelectionControls() {
        if (!selectionControls || !selectedCountSpan) return;

        const count = selectedNotificationIds.size;
        if (count > 0) {
            selectionControls.style.display = 'flex';
            selectedCountSpan.textContent = `${count} selected`;
        } else {
            selectionControls.style.display = 'none';
        }
    }

    /**
     * Show error message
     */
    function showError(message) {
        if (notificationsList) {
            notificationsList.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    ${escapeHtml(message)}
                </div>
            `;
        }
    }

    /**
     * Redirect to appropriate page based on notification type
     */
    function redirectToNotificationPage(notificationType) {
        if (!notificationType) return;
        
        const baseUrl = window.BASE_URL || '';
        let redirectUrl = '';
        
        switch (notificationType) {
            case 'appointment':
                redirectUrl = baseUrl + 'counselor/appointments';
                break;
            case 'announcement':
            case 'event':
                redirectUrl = baseUrl + 'counselor/announcements';
                break;
            case 'follow-up':
            case 'follow_up_session':
                redirectUrl = baseUrl + 'counselor/follow-up';
                break;
            default:
                // For other types, don't redirect
                return;
        }
        
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

