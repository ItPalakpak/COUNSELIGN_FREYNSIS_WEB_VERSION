// Counselor Messages Badge Updater - Updates unread messages count badge in sidebar

(function() {
    'use strict';

    const BADGE_ID = 'counselor-messages-badge';
    const API_ENDPOINT = 'counselor/message/operations?action=get_unread_count';
    const UPDATE_INTERVAL = 30000; // 30 seconds
    const UPDATE_INTERVAL_AFTER_ACTION = 5000; // 5 seconds after action

    let updateInterval = null;
    let lastUpdateTime = 0;
    let isUpdating = false;

    /**
     * Initialize badge updater
     */
    function init() {
        const badge = document.getElementById(BADGE_ID);
        if (!badge) {
            return; // Badge not found, exit silently
        }

        // Initial update
        updateBadge();

        // Set up periodic updates
        startPeriodicUpdates();

        // Listen for message actions to update badge immediately
        document.addEventListener('messageRead', handleMessageAction);
        document.addEventListener('messageSent', handleMessageAction);
    }

    /**
     * Update badge with unread messages count
     */
    function updateBadge() {
        if (isUpdating) {
            return; // Prevent concurrent updates
        }

        const badge = document.getElementById(BADGE_ID);
        if (!badge) {
            return;
        }

        isUpdating = true;

        fetch(window.BASE_URL + API_ENDPOINT, {
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
            if (data.success && typeof data.unread_count === 'number') {
                const count = data.unread_count;
                badge.textContent = count;
                
                // Show badge if count > 0, hide if 0
                if (count > 0) {
                    badge.style.display = 'inline-block';
                } else {
                    badge.style.display = 'none';
                }
            } else {
                console.warn('[Counselor Messages Badge] Invalid response format:', data);
            }
        })
        .catch(error => {
            console.error('[Counselor Messages Badge] Error updating badge:', error);
            // Don't show error to user, just log it
        })
        .finally(() => {
            isUpdating = false;
            lastUpdateTime = Date.now();
        });
    }

    /**
     * Start periodic updates
     */
    function startPeriodicUpdates() {
        if (updateInterval) {
            clearInterval(updateInterval);
        }

        updateInterval = setInterval(() => {
            // Only update if enough time has passed since last update
            const timeSinceLastUpdate = Date.now() - lastUpdateTime;
            if (timeSinceLastUpdate >= UPDATE_INTERVAL) {
                updateBadge();
            }
        }, UPDATE_INTERVAL);
    }

    /**
     * Handle message action (read/sent) - update badge immediately
     */
    function handleMessageAction() {
        // Update immediately
        updateBadge();

        // Reset interval to update again after shorter delay
        if (updateInterval) {
            clearInterval(updateInterval);
        }

        setTimeout(() => {
            updateBadge();
            startPeriodicUpdates();
        }, UPDATE_INTERVAL_AFTER_ACTION);
    }

    /**
     * Cleanup on page unload
     */
    function cleanup() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);

    // Export function for manual updates if needed
    window.updateCounselorMessagesBadge = updateBadge;
})();

