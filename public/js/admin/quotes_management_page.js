// Admin Quotes Management Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quotesContainer = document.getElementById('quotesContainer');
    const emptyState = document.getElementById('emptyState');
    const loadingSpinner = quotesContainer.querySelector('.loading-spinner');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const submittedByFilter = document.getElementById('submittedByFilter');
    const dateFilter = document.getElementById('dateFilter');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const rejectionReasonModal = document.getElementById('rejectionReasonModal');
    const rejectionReasonForm = document.getElementById('rejectionReasonForm');
    const confirmRejectionBtn = document.getElementById('confirmRejectionBtn');
    
    // State
    let allQuotes = [];
    let filteredQuotes = [];
    let currentRejectingQuoteId = null;
    let uniqueSubmitters = new Set();

    // Initialize
    loadAllQuotes();

    // Event Listeners
    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    submittedByFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
    clearFiltersBtn.addEventListener('click', clearAllFilters);

    if (confirmRejectionBtn) {
        confirmRejectionBtn.addEventListener('click', handleRejectionConfirm);
    }

    /**
     * Load all quotes from API
     */
    function loadAllQuotes() {
        showLoading();
        
        fetch(window.BASE_URL + 'admin/quotes/all', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.quotes) {
                allQuotes = data.quotes;
                extractUniqueSubmitters();
                populateSubmittedByFilter();
                applyFilters();
                updateStatistics(allQuotes);
            } else {
                showError('Failed to load quotes');
                showEmptyState();
            }
        })
        .catch(error => {
            console.error('Error loading quotes:', error);
            showError('An error occurred while loading quotes');
            showEmptyState();
        });
    }

    /**
     * Extract unique submitters from quotes
     */
    function extractUniqueSubmitters() {
        uniqueSubmitters.clear();
        allQuotes.forEach(quote => {
            const submitterName = quote.submitted_by_name || quote.submitted_by_id || 'Unknown';
            uniqueSubmitters.add(submitterName);
        });
    }

    /**
     * Populate submitted by filter dropdown
     */
    function populateSubmittedByFilter() {
        if (!submittedByFilter) return;
        
        const currentValue = submittedByFilter.value;
        submittedByFilter.innerHTML = '<option value="">All Submitters</option>';
        
        const sortedSubmitters = Array.from(uniqueSubmitters).sort();
        sortedSubmitters.forEach(submitter => {
            const option = document.createElement('option');
            option.value = submitter;
            option.textContent = submitter;
            submittedByFilter.appendChild(option);
        });
        
        if (currentValue) {
            submittedByFilter.value = currentValue;
        }
    }

    /**
     * Apply all filters to quotes
     */
    function applyFilters() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const statusValue = statusFilter.value;
        const categoryValue = categoryFilter.value;
        const submittedByValue = submittedByFilter.value;
        const dateValue = dateFilter.value;

        filteredQuotes = allQuotes.filter(quote => {
            // Search filter
            if (searchTerm) {
                const matchesSearch = 
                    (quote.quote_text && quote.quote_text.toLowerCase().includes(searchTerm)) ||
                    (quote.author_name && quote.author_name.toLowerCase().includes(searchTerm)) ||
                    (quote.source && quote.source.toLowerCase().includes(searchTerm)) ||
                    (quote.submitted_by_name && quote.submitted_by_name.toLowerCase().includes(searchTerm));
                
                if (!matchesSearch) {
                    return false;
                }
            }

            // Status filter
            if (statusValue && quote.status !== statusValue) {
                return false;
            }

            // Category filter
            if (categoryValue && quote.category !== categoryValue) {
                return false;
            }

            // Submitted by filter
            if (submittedByValue) {
                const submitterName = quote.submitted_by_name || quote.submitted_by_id || 'Unknown';
                if (submitterName !== submittedByValue) {
                    return false;
                }
            }

            // Date filter
            if (dateValue) {
                const quoteDate = quote.created_at ? quote.created_at.split(' ')[0] : '';
                if (quoteDate !== dateValue) {
                    return false;
                }
            }

            return true;
        });

        displayQuotes(filteredQuotes);
        updateStatistics(filteredQuotes);
    }

    /**
     * Display quotes in cards (2 per row)
     */
    function displayQuotes(quotes) {
        if (quotes.length === 0) {
            showEmptyState();
            return;
        }

        hideEmptyState();
        hideLoading();

        quotesContainer.innerHTML = '';
        
        // Create row container
        let currentRow = null;
        
        quotes.forEach((quote, index) => {
            // Create new row every 2 quotes
            if (index % 2 === 0) {
                currentRow = document.createElement('div');
                currentRow.className = 'row g-3 mb-3';
                quotesContainer.appendChild(currentRow);
            }

            // Create quote card
            const cardCol = document.createElement('div');
            cardCol.className = 'col-md-6';
            cardCol.innerHTML = createQuoteCardHTML(quote);
            currentRow.appendChild(cardCol);

            // Attach event listeners
            attachCardEventListeners(cardCol, quote);
        });
    }

    /**
     * Create quote card HTML
     */
    function createQuoteCardHTML(quote) {
        const statusClass = getStatusClass(quote.status);
        const statusBadge = getStatusBadge(quote.status);
        const categoryIcon = getCategoryIcon(quote.category);
        
        let actionsHTML = '';
        if (quote.status === 'pending') {
            actionsHTML = `
                <div class="card-actions mt-3">
                    <button class="btn btn-sm btn-success approve-quote-btn" data-quote-id="${quote.id}" type="button">
                        <i class="fas fa-check me-1"></i>Approve
                    </button>
                    <button class="btn btn-sm btn-danger reject-quote-btn" data-quote-id="${quote.id}" type="button">
                        <i class="fas fa-times me-1"></i>Reject
                    </button>
                </div>
            `;
        }

        let rejectionReasonHTML = '';
        if (quote.status === 'rejected' && quote.rejection_reason) {
            rejectionReasonHTML = `
                <div class="alert alert-danger mt-2 mb-0">
                    <strong><i class="fas fa-info-circle me-1"></i>Rejection Reason:</strong><br>
                    ${escapeHtml(quote.rejection_reason)}
                </div>
            `;
        }

        let moderationInfoHTML = '';
        if (quote.moderated_at && quote.moderator_username) {
            const action = quote.status === 'approved' ? 'Approved' : 'Rejected';
            moderationInfoHTML = `
                <small class="text-muted d-block mt-2">
                    <i class="fas fa-user-check me-1"></i>
                    ${action} by ${escapeHtml(quote.moderator_username)} on ${formatDate(quote.moderated_at)}
                </small>
            `;
        }

        return `
            <div class="card quote-card ${statusClass} h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-user me-2"></i>${escapeHtml(quote.author_name || 'Unknown Author')}
                        </h6>
                        ${statusBadge}
                    </div>
                    
                    <p class="card-text quote-text">${escapeHtml(quote.quote_text)}</p>
                    
                    <div class="d-flex flex-wrap gap-2 align-items-center mb-2">
                        <span class="badge bg-secondary">
                            ${categoryIcon} ${escapeHtml(quote.category || 'Uncategorized')}
                        </span>
                        ${quote.source ? `
                            <span class="badge bg-info">
                                <i class="fas fa-book me-1"></i>${escapeHtml(quote.source)}
                            </span>
                        ` : ''}
                    </div>
                    
                    <div class="quote-meta">
                        <small class="text-muted d-block">
                            <i class="fas fa-user-tie me-1"></i>Submitted by ${escapeHtml(quote.submitted_by_name || quote.submitted_by_id || 'Unknown')}
                        </small>
                        <small class="text-muted d-block mt-1">
                            <i class="fas fa-calendar me-1"></i>Submitted ${formatDate(quote.created_at || quote.submitted_at)}
                        </small>
                        ${moderationInfoHTML}
                    </div>
                    
                    ${rejectionReasonHTML}
                    ${actionsHTML}
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners to quote card
     */
    function attachCardEventListeners(cardElement, quote) {
        const approveBtn = cardElement.querySelector('.approve-quote-btn');
        const rejectBtn = cardElement.querySelector('.reject-quote-btn');

        if (approveBtn) {
            approveBtn.addEventListener('click', function() {
                approveQuote(quote.id);
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                openRejectionModal(quote.id);
            });
        }
    }

    /**
     * Approve quote
     */
    function approveQuote(quoteId) {
        if (typeof openConfirmationModal === 'function') {
            openConfirmationModal('Are you sure you want to approve this quote?', (context) => {
                doApproveQuote(quoteId);
            });
        } else {
            if (confirm('Are you sure you want to approve this quote?')) {
                doApproveQuote(quoteId);
            }
        }
    }

    /**
     * Execute approve quote API call
     */
    function doApproveQuote(quoteId) {
        const approveButtons = document.querySelectorAll(`.approve-quote-btn[data-quote-id="${quoteId}"]`);
        const originalStates = [];
        
        approveButtons.forEach(btn => {
            originalStates.push({
                element: btn,
                originalHtml: btn.innerHTML,
                originalDisabled: btn.disabled
            });
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Approving...';
        });

        fetch(window.BASE_URL + 'admin/quotes/approve/' + quoteId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            restoreButtonStates(originalStates);
            
            if (data.success) {
                showSuccess(data.message || 'Quote approved successfully');
                // Dispatch event to update badge
                document.dispatchEvent(new CustomEvent('quoteApproved'));
                loadAllQuotes();
            } else {
                showError(data.message || 'Failed to approve quote');
            }
        })
        .catch(error => {
            console.error('Error approving quote:', error);
            restoreButtonStates(originalStates);
            showError('An error occurred while approving the quote');
        });
    }

    /**
     * Open rejection modal
     */
    function openRejectionModal(quoteId) {
        currentRejectingQuoteId = quoteId;
        const modal = new bootstrap.Modal(rejectionReasonModal);
        modal.show();
        
        if (rejectionReasonForm) {
            rejectionReasonForm.reset();
        }
    }

    /**
     * Handle rejection confirmation
     */
    function handleRejectionConfirm() {
        if (!rejectionReasonForm || !rejectionReasonForm.checkValidity()) {
            rejectionReasonForm.reportValidity();
            return;
        }
        
        const reason = document.getElementById('rejectionReason').value.trim();
        if (!reason) {
            showError('Please provide a rejection reason');
            return;
        }
        
        if (!currentRejectingQuoteId) {
            showError('Quote ID not found');
            return;
        }
        
        const originalBtnHtml = confirmRejectionBtn.innerHTML;
        const originalBtnDisabled = confirmRejectionBtn.disabled;
        
        confirmRejectionBtn.disabled = true;
        confirmRejectionBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Rejecting...';
        
        const formData = new FormData();
        formData.append('reason', reason);
        
        fetch(window.BASE_URL + 'admin/quotes/reject/' + currentRejectingQuoteId, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            confirmRejectionBtn.disabled = originalBtnDisabled;
            confirmRejectionBtn.innerHTML = originalBtnHtml;
            
            if (data.success) {
                const modalInstance = bootstrap.Modal.getInstance(rejectionReasonModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
                showSuccess(data.message || 'Quote rejected successfully');
                // Dispatch event to update badge
                document.dispatchEvent(new CustomEvent('quoteRejected'));
                currentRejectingQuoteId = null;
                loadAllQuotes();
            } else {
                showError(data.message || 'Failed to reject quote');
            }
        })
        .catch(error => {
            console.error('Error rejecting quote:', error);
            confirmRejectionBtn.disabled = originalBtnDisabled;
            confirmRejectionBtn.innerHTML = originalBtnHtml;
            showError('An error occurred while rejecting the quote');
        });
    }

    /**
     * Restore button states
     */
    function restoreButtonStates(buttonStates) {
        if (buttonStates && buttonStates.length > 0) {
            buttonStates.forEach(state => {
                state.element.disabled = state.originalDisabled;
                state.element.innerHTML = state.originalHtml;
            });
        }
    }

    /**
     * Update statistics
     */
    function updateStatistics(quotes) {
        const pendingCount = quotes.filter(q => q.status === 'pending').length;
        const approvedCount = quotes.filter(q => q.status === 'approved').length;
        const rejectedCount = quotes.filter(q => q.status === 'rejected').length;
        
        const pendingCountEl = document.getElementById('pendingCount');
        const approvedCountEl = document.getElementById('approvedCount');
        const rejectedCountEl = document.getElementById('rejectedCount');
        
        if (pendingCountEl) pendingCountEl.textContent = pendingCount;
        if (approvedCountEl) approvedCountEl.textContent = approvedCount;
        if (rejectedCountEl) rejectedCountEl.textContent = rejectedCount;
    }

    /**
     * Clear all filters
     */
    function clearAllFilters() {
        searchInput.value = '';
        statusFilter.value = '';
        categoryFilter.value = '';
        submittedByFilter.value = '';
        dateFilter.value = '';
        applyFilters();
    }

    /**
     * Show loading spinner
     */
    function showLoading() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }
        hideEmptyState();
    }

    /**
     * Hide loading spinner
     */
    function hideLoading() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }

    /**
     * Show empty state
     */
    function showEmptyState() {
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        hideLoading();
        if (quotesContainer) {
            quotesContainer.innerHTML = '';
        }
    }

    /**
     * Hide empty state
     */
    function hideEmptyState() {
        if (emptyState) {
            emptyState.style.display = 'none';
        }
    }

    /**
     * Get status class for card styling
     */
    function getStatusClass(status) {
        const classes = {
            'pending': 'border-warning',
            'approved': 'border-success',
            'rejected': 'border-danger'
        };
        return classes[status] || 'border-secondary';
    }

    /**
     * Get status badge HTML
     */
    function getStatusBadge(status) {
        const badges = {
            'pending': '<span class="badge bg-warning"><i class="fas fa-clock me-1"></i>Pending</span>',
            'approved': '<span class="badge bg-success"><i class="fas fa-check-circle me-1"></i>Approved</span>',
            'rejected': '<span class="badge bg-danger"><i class="fas fa-times-circle me-1"></i>Rejected</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
    }

    /**
     * Get category icon
     */
    function getCategoryIcon(category) {
        const icons = {
            'Inspirational': '✨',
            'Motivational': '💪',
            'Wisdom': '🦉',
            'Life': '🌱',
            'Success': '🎯',
            'Education': '📚',
            'Perseverance': '🏔️',
            'Courage': '🦁',
            'Hope': '🌟',
            'Kindness': '💝'
        };
        return icons[category] || '📝';
    }

    /**
     * Format date
     */
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    }

    /**
     * Escape HTML
     */
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show success message
     */
    function showSuccess(message) {
        if (typeof openAlertModal === 'function') {
            openAlertModal(message, 'success');
        } else {
            alert(message);
        }
    }

    /**
     * Show error message
     */
    function showError(message) {
        if (typeof openAlertModal === 'function') {
            openAlertModal(message, 'danger');
        } else {
            alert(message);
        }
    }
});

