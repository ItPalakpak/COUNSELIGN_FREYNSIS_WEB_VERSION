/**
 * Counselor Quotes Page JavaScript
 * Handles loading, displaying, adding, editing, and deleting quotes in a 2-column card layout
 */

// Store quotes data
let quotesData = [];
let filteredQuotesData = [];

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Get quote status badge HTML
 */
function getQuoteStatusBadge(status) {
    const statusMap = {
        'pending': { class: 'pending', text: 'Pending Review' },
        'approved': { class: 'approved', text: 'Approved' },
        'rejected': { class: 'rejected', text: 'Rejected' }
    };
    
    const statusInfo = statusMap[status] || statusMap['pending'];
    return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

/**
 * Get category icon
 */
function getCategoryIcon(category) {
    const iconMap = {
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
    return iconMap[category] || '📝';
}

/**
 * Format quote date
 */
function formatQuoteDate(dateString) {
    if (!dateString) return 'Unknown date';
    
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    } catch (e) {
        return dateString;
    }
}

/**
 * Load quotes from API
 */
function loadQuotes() {
    const container = document.getElementById('quotesGrid');
    if (!container) {
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="text-center py-5 quotes-loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading quotes...</span>
            </div>
            <p class="mt-2 text-muted">Loading quotes...</p>
        </div>
    `;

    fetch(window.BASE_URL + 'counselor/quotes/my-quotes')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.quotes && data.quotes.length > 0) {
                quotesData = data.quotes;
                // Apply current filters after loading new data
                applyFiltersAndSearch();
            } else {
                quotesData = [];
                filteredQuotesData = [];
                container.innerHTML = `
                    <div class="quotes-empty">
                        <i class="fas fa-quote-left"></i>
                        <h5>No Quotes Submitted Yet</h5>
                        <p>Share your first inspirational quote to get started!</p>
                    </div>
                `;
                updateResultsCount();
                updateStatusCounts();
            }
        })
        .catch(error => {
            console.error('Error loading quotes:', error);
            quotesData = [];
            filteredQuotesData = [];
            container.innerHTML = `
                <div class="quotes-empty">
                    <i class="fas fa-exclamation-triangle text-warning"></i>
                    <h5>Failed to Load Quotes</h5>
                    <p class="text-danger">Please try again later.</p>
                </div>
            `;
            updateResultsCount();
            updateStatusCounts();
        });
}

/**
 * Apply search and filters to quotes
 */
function applyFiltersAndSearch() {
    const searchTerm = document.getElementById('quoteSearchInput')?.value.trim().toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';

    filteredQuotesData = quotesData.filter(quote => {
        // Search filter - search across quote text, author, category, and source
        let matchesSearch = true;
        if (searchTerm) {
            const quoteText = (quote.quote_text || '').toLowerCase();
            const authorName = (quote.author_name || '').toLowerCase();
            const category = (quote.category || '').toLowerCase();
            const source = (quote.source || '').toLowerCase();
            
            matchesSearch = quoteText.includes(searchTerm) ||
                          authorName.includes(searchTerm) ||
                          category.includes(searchTerm) ||
                          source.includes(searchTerm);
        }

        // Status filter
        let matchesStatus = true;
        if (statusFilter !== 'all') {
            matchesStatus = quote.status === statusFilter;
        }

        // Category filter
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
            matchesCategory = quote.category === categoryFilter;
        }

        return matchesSearch && matchesStatus && matchesCategory;
    });

    renderQuotesCards(filteredQuotesData);
    updateResultsCount();
    updateStatusCounts();
}

/**
 * Update status counts based on filtered data
 * Counts reflect all active filters: search, status, and category
 */
function updateStatusCounts() {
    const pendingCountElement = document.getElementById('pendingCount');
    const approvedCountElement = document.getElementById('approvedCount');
    const rejectedCountElement = document.getElementById('rejectedCount');
    
    // Get current filter values (including status filter)
    const searchTerm = document.getElementById('quoteSearchInput')?.value.trim().toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    
    // Count quotes by status based on all active filters
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    
    quotesData.forEach(quote => {
        // Apply search filter
        let matchesSearch = true;
        if (searchTerm) {
            const quoteText = (quote.quote_text || '').toLowerCase();
            const authorName = (quote.author_name || '').toLowerCase();
            const category = (quote.category || '').toLowerCase();
            const source = (quote.source || '').toLowerCase();
            
            matchesSearch = quoteText.includes(searchTerm) ||
                          authorName.includes(searchTerm) ||
                          category.includes(searchTerm) ||
                          source.includes(searchTerm);
        }
        
        // Apply status filter
        let matchesStatus = true;
        if (statusFilter !== 'all') {
            matchesStatus = quote.status === statusFilter;
        }
        
        // Apply category filter
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
            matchesCategory = quote.category === categoryFilter;
        }
        
        // Count if matches all current filters
        if (matchesSearch && matchesStatus && matchesCategory) {
            if (quote.status === 'pending') {
                pendingCount++;
            } else if (quote.status === 'approved') {
                approvedCount++;
            } else if (quote.status === 'rejected') {
                rejectedCount++;
            }
        }
    });
    
    // Update count displays
    if (pendingCountElement) {
        pendingCountElement.textContent = `${pendingCount}`;
    }
    if (approvedCountElement) {
        approvedCountElement.textContent = `${approvedCount}`;
    }
    if (rejectedCountElement) {
        rejectedCountElement.textContent = `${rejectedCount}`;
    }
}

/**
 * Update results count display
 */
function updateResultsCount() {
    const resultsCountElement = document.getElementById('quotesResultsCount');
    const resultsCountText = document.getElementById('resultsCountText');
    
    if (!resultsCountElement || !resultsCountText) {
        return;
    }
    
    const totalCount = quotesData.length;
    const filteredCount = filteredQuotesData.length;
    
    if (filteredCount === totalCount) {
        // No filters applied
        resultsCountElement.style.display = 'none';
    } else {
        // Filters applied
        resultsCountElement.style.display = 'flex';
        resultsCountText.textContent = `Showing ${filteredCount} of ${totalCount} quotes`;
    }
}

/**
 * Render quotes as cards in a 2-column grid
 */
function renderQuotesCards(quotes) {
    const container = document.getElementById('quotesGrid');
    if (!container) {
        return;
    }

    if (quotes.length === 0) {
        const searchTerm = document.getElementById('quoteSearchInput')?.value.trim() || '';
        const statusFilter = document.getElementById('statusFilter')?.value || 'all';
        const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
        
        let emptyMessage = '';
        if (searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') {
            emptyMessage = `
                <div class="quotes-empty">
                    <i class="fas fa-search"></i>
                    <h5>No Quotes Found</h5>
                    <p>No quotes match your search or filter criteria.</p>
                    <button class="btn btn-sm btn-outline-primary mt-3" id="clearFiltersFromEmpty">
                        <i class="fas fa-times me-1"></i>Clear Filters
                    </button>
                </div>
            `;
        } else {
            emptyMessage = `
                <div class="quotes-empty">
                    <i class="fas fa-quote-left"></i>
                    <h5>No Quotes Submitted Yet</h5>
                    <p>Share your first inspirational quote to get started!</p>
                </div>
            `;
        }
        
        container.innerHTML = emptyMessage;
        
        // Attach clear filters button if it exists
        const clearBtn = document.getElementById('clearFiltersFromEmpty');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearFilters);
        }
        
        return;
    }

    let html = '';
    quotes.forEach((quote) => {
        html += generateQuoteCard(quote);
    });

    container.innerHTML = html;
    
    // Attach event listeners
    attachQuoteActionListeners();
}

/**
 * Clear all filters and search
 */
function clearFilters() {
    const searchInput = document.getElementById('quoteSearchInput');
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (categoryFilter) categoryFilter.value = 'all';
    
    applyFiltersAndSearch();
}

/**
 * Generate HTML for a single quote card
 */
function generateQuoteCard(quote) {
    const statusBadge = getQuoteStatusBadge(quote.status);
    const categoryIcon = getCategoryIcon(quote.category);
    
    let rejectionReason = '';
    if (quote.status === 'rejected' && quote.rejection_reason) {
        rejectionReason = `
            <div class="rejection-alert">
                <strong><i class="fas fa-info-circle me-1"></i>Rejection Reason:</strong><br>
                ${escapeHtml(quote.rejection_reason)}
            </div>
        `;
    }
    
    let moderationInfo = '';
    if (quote.moderated_at) {
        const action = quote.status === 'approved' ? 'Approved' : 'Rejected';
        moderationInfo = `
            <div class="moderation-info">
                <i class="fas fa-user-check me-1"></i>
                ${action} on ${formatQuoteDate(quote.moderated_at)}
            </div>
        `;
    }
    
    // Action buttons based on status
    let actionButtons = '';
    if (quote.status === 'pending') {
        actionButtons = `
            <div class="quote-actions">
                <button class="btn btn-sm btn-primary edit-quote-btn" data-quote-id="${quote.id}" title="Edit Quote">
                    <i class="fas fa-edit me-1"></i>Edit
                </button>
                <button class="btn btn-sm btn-danger delete-quote-btn" data-quote-id="${quote.id}" title="Delete Quote">
                    <i class="fas fa-trash me-1"></i>Delete
                </button>
            </div>
        `;
    } else {
        actionButtons = `
            <div class="quote-actions">
                <button class="btn btn-sm btn-danger delete-quote-btn" data-quote-id="${quote.id}" title="Delete Quote">
                    <i class="fas fa-trash me-1"></i>Delete
                </button>
            </div>
        `;
    }
    
    return `
        <div class="quote-card status-${quote.status}">
            <div class="quote-card-header">
                <h6 class="author-name">
                    <i class="fas fa-user"></i>
                    ${escapeHtml(quote.author_name)}
                </h6>
                ${statusBadge}
            </div>
            
            <p class="quote-text">${escapeHtml(quote.quote_text)}</p>
            
            <div class="quote-meta">
                <div class="quote-badges">
                    <span class="badge bg-secondary">
                        ${categoryIcon} ${escapeHtml(quote.category)}
                    </span>
                    ${quote.source ? `
                        <span class="badge bg-info">
                            <i class="fas fa-book me-1"></i>${escapeHtml(quote.source)}
                        </span>
                    ` : ''}
                </div>
                <div class="quote-date">
                    <i class="fas fa-calendar-alt"></i>
                    Submitted ${formatQuoteDate(quote.submitted_at || quote.created_at)}
                </div>
            </div>
            
            ${moderationInfo}
            ${rejectionReason}
            ${actionButtons}
        </div>
    `;
}

/**
 * Attach event listeners for quote actions
 */
function attachQuoteActionListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-quote-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const quoteId = parseInt(this.getAttribute('data-quote-id'));
            editQuote(quoteId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-quote-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const quoteId = parseInt(this.getAttribute('data-quote-id'));
            deleteQuote(quoteId);
        });
    });
}

/**
 * Edit quote function
 */
function editQuote(quoteId) {
    // Find the quote data
    const quote = quotesData.find(q => q.id == quoteId);
    if (!quote) {
        // Reload quotes if not found
        loadQuotes();
        if (typeof openAlertModal === 'function') {
            openAlertModal('Quote not found', 'error');
        } else {
            alert('Quote not found');
        }
        return;
    }
    
    if (quote.status !== 'pending') {
        if (typeof openAlertModal === 'function') {
            openAlertModal('You can only edit pending quotes', 'warning');
        } else {
            alert('You can only edit pending quotes');
        }
        return;
    }
    
    // Populate the form with quote data
    document.getElementById('quoteText').value = quote.quote_text || '';
    document.getElementById('authorName').value = quote.author_name || '';
    document.getElementById('category').value = quote.category || '';
    document.getElementById('source').value = quote.source || '';
    document.getElementById('charCount').textContent = (quote.quote_text || '').length;
    
    // Store quote ID for update
    const quoteForm = document.getElementById('quoteSubmissionForm');
    quoteForm.setAttribute('data-edit-quote-id', quoteId);
    
    // Change submit button text
    const submitBtn = document.getElementById('submitQuoteBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Update Quote';
    submitBtn.setAttribute('data-original-text', originalText);
    
    // Open the edit modal
    const quoteSubmissionModal = document.getElementById('quoteSubmissionModal');
    const modal = new bootstrap.Modal(quoteSubmissionModal);
    modal.show();
}

/**
 * Delete quote function
 */
function deleteQuote(quoteId) {
    if (typeof openConfirmationModal === 'function') {
        openConfirmationModal(
            'Are you sure you want to delete this quote? This action cannot be undone.',
            function() {
                // User confirmed deletion
                const deleteButtons = document.querySelectorAll(`.delete-quote-btn[data-quote-id="${quoteId}"]`);
                deleteButtons.forEach(btn => {
                    const originalHtml = btn.innerHTML;
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Deleting...';
                    btn.setAttribute('data-original-html', originalHtml);
                });
                
                // Perform deletion
                fetch(window.BASE_URL + 'counselor/quotes/delete/' + quoteId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(data => {
                    // Restore button state
                    deleteButtons.forEach(btn => {
                        const originalHtml = btn.getAttribute('data-original-html');
                        if (originalHtml) {
                            btn.innerHTML = originalHtml;
                            btn.removeAttribute('data-original-html');
                        }
                        btn.disabled = false;
                    });
                    
                    if (data.success) {
                        if (typeof openAlertModal === 'function') {
                            openAlertModal(data.message || 'Quote deleted successfully', 'success');
                        } else {
                            alert(data.message || 'Quote deleted successfully');
                        }
                    // Reload quotes
                    loadQuotes();
                } else {
                    if (typeof openAlertModal === 'function') {
                        openAlertModal(data.message || 'Failed to delete quote', 'error');
                    } else {
                        alert(data.message || 'Failed to delete quote');
                    }
                    // Apply filters to current data even on error
                    applyFiltersAndSearch();
                }
                })
                .catch(error => {
                    console.error('Error deleting quote:', error);
                    // Restore button state
                    deleteButtons.forEach(btn => {
                        const originalHtml = btn.getAttribute('data-original-html');
                        if (originalHtml) {
                            btn.innerHTML = originalHtml;
                            btn.removeAttribute('data-original-html');
                        }
                        btn.disabled = false;
                    });
                    
                    if (typeof openAlertModal === 'function') {
                        openAlertModal('An error occurred. Please try again.', 'error');
                    } else {
                        alert('An error occurred. Please try again.');
                    }
                });
            }
        );
    } else {
        if (confirm('Are you sure you want to delete this quote? This action cannot be undone.')) {
            fetch(window.BASE_URL + 'counselor/quotes/delete/' + quoteId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message || 'Quote deleted successfully');
                    loadQuotes();
                } else {
                    alert(data.message || 'Failed to delete quote');
                }
            })
            .catch(error => {
                console.error('Error deleting quote:', error);
                alert('An error occurred. Please try again.');
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load quotes on page load
    loadQuotes();
    
    // Search input event listener
    const searchInput = document.getElementById('quoteSearchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFiltersAndSearch();
            }, 300); // Debounce search by 300ms
        });
    }
    
    // Status filter event listener
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            applyFiltersAndSearch();
        });
    }
    
    // Category filter event listener
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            applyFiltersAndSearch();
        });
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            clearFilters();
        });
    }
    
    // Quote form elements
    const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');
    const quoteSubmissionModal = document.getElementById('quoteSubmissionModal');
    const quoteForm = document.getElementById('quoteSubmissionForm');
    const quoteTextArea = document.getElementById('quoteText');
    const charCount = document.getElementById('charCount');
    const submitQuoteBtn = document.getElementById('submitQuoteBtn');
    
    // Character counter for quote text
    if (quoteTextArea && charCount) {
        quoteTextArea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Change color based on character count
            if (length > 450) {
                charCount.style.color = '#dc3545'; // Red
            } else if (length > 400) {
                charCount.style.color = '#ffc107'; // Yellow
            } else {
                charCount.style.color = '#060E57'; // Blue
            }
        });
    }
    
    // Open quote modal button
    if (openQuoteModalBtn) {
        openQuoteModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Reset form
            if (quoteForm) {
                quoteForm.reset();
                quoteForm.removeAttribute('data-edit-quote-id');
                if (charCount) charCount.textContent = '0';
                
                // Reset submit button
                if (submitQuoteBtn) {
                    const originalText = submitQuoteBtn.getAttribute('data-original-text');
                    if (originalText) {
                        submitQuoteBtn.innerHTML = originalText;
                        submitQuoteBtn.removeAttribute('data-original-text');
                    } else {
                        submitQuoteBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Quote';
                    }
                }
            }
            
            // Show modal
            if (quoteSubmissionModal) {
                const modalInstance = bootstrap.Modal.getOrCreateInstance(quoteSubmissionModal);
                modalInstance.show();
            }
        });
    }
    
    // Reset form when modal is hidden
    if (quoteSubmissionModal) {
        quoteSubmissionModal.addEventListener('hidden.bs.modal', function() {
            if (quoteForm) {
                quoteForm.reset();
                quoteForm.removeAttribute('data-edit-quote-id');
                if (charCount) charCount.textContent = '0';
                
                // Reset submit button
                if (submitQuoteBtn) {
                    const originalText = submitQuoteBtn.getAttribute('data-original-text');
                    if (originalText) {
                        submitQuoteBtn.innerHTML = originalText;
                        submitQuoteBtn.removeAttribute('data-original-text');
                    } else {
                        submitQuoteBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Quote';
                    }
                    submitQuoteBtn.disabled = false;
                }
            }
            
            // Clear any alerts
            const alertContainer = document.getElementById('quoteAlertContainer');
            if (alertContainer) {
                alertContainer.innerHTML = '';
            }
        });
    }
    
    // Quote submission form handler
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!submitQuoteBtn) return;
            
            // Store original button state
            const originalBtnText = submitQuoteBtn.innerHTML;
            
            // Set loading state
            submitQuoteBtn.disabled = true;
            
            // Check if this is an edit operation
            const editQuoteId = quoteForm.getAttribute('data-edit-quote-id');
            const isEdit = editQuoteId !== null && editQuoteId !== '';
            
            // Update button to show loading state
            if (isEdit) {
                submitQuoteBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Updating...';
            } else {
                submitQuoteBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
            }
            
            let url = window.BASE_URL + 'counselor/quotes/submit';
            let method = 'POST';
            let requestBody;
            let headers = {};
            
            if (isEdit) {
                url = window.BASE_URL + 'counselor/quotes/update/' + editQuoteId;
                method = 'PUT';
                // For PUT requests, convert FormData to URLSearchParams
                const formData = new FormData(quoteForm);
                const params = new URLSearchParams();
                for (const [key, value] of formData.entries()) {
                    params.append(key, value);
                }
                requestBody = params.toString();
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else {
                // For POST requests, use FormData
                requestBody = new FormData(quoteForm);
            }
            
            fetch(url, {
                method: method,
                headers: headers,
                body: requestBody
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const successMsg = isEdit ? (data.message || 'Quote updated successfully!') : (data.message || 'Quote submitted successfully!');
                    
                    if (typeof openAlertModal === 'function') {
                        openAlertModal(successMsg, 'success');
                    } else {
                        alert(successMsg);
                    }
                    
                    // Reset form and clear edit flag
                    quoteForm.reset();
                    quoteForm.removeAttribute('data-edit-quote-id');
                    if (charCount) charCount.textContent = '0';
                    
                    // Restore submit button to original state
                    const storedOriginalText = submitQuoteBtn.getAttribute('data-original-text');
                    if (storedOriginalText) {
                        submitQuoteBtn.innerHTML = storedOriginalText;
                        submitQuoteBtn.removeAttribute('data-original-text');
                    } else {
                        submitQuoteBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Submit Quote';
                    }
                    submitQuoteBtn.disabled = false;
                    
                    // Close modal
                    const modalInstance = bootstrap.Modal.getInstance(quoteSubmissionModal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                    
                    // Reload quotes
                    loadQuotes();
                } else {
                    let errorMsg = data.message || (isEdit ? 'Failed to update quote' : 'Failed to submit quote');
                    if (data.errors) {
                        const errorList = Array.isArray(data.errors) ? data.errors : Object.values(data.errors);
                        errorMsg += '<br><small>' + errorList.join('<br>') + '</small>';
                    }
                    
                    // Show error
                    if (typeof openAlertModal === 'function') {
                        openAlertModal(errorMsg, 'error');
                    } else {
                        alert(errorMsg);
                    }
                    
                    // Restore button state on error
                    const storedOriginalText = submitQuoteBtn.getAttribute('data-original-text');
                    if (storedOriginalText) {
                        submitQuoteBtn.innerHTML = storedOriginalText;
                        submitQuoteBtn.removeAttribute('data-original-text');
                    } else {
                        submitQuoteBtn.innerHTML = originalBtnText;
                    }
                    submitQuoteBtn.disabled = false;
                    
                    // Apply filters to current data even on error
                    applyFiltersAndSearch();
                }
            })
            .catch(error => {
                console.error('Error ' + (isEdit ? 'updating' : 'submitting') + ' quote:', error);
                
                // Show error
                if (typeof openAlertModal === 'function') {
                    openAlertModal('An error occurred. Please try again.', 'error');
                } else {
                    alert('An error occurred. Please try again.');
                }
                
                // Restore button state on error
                const storedOriginalText = submitQuoteBtn.getAttribute('data-original-text');
                if (storedOriginalText) {
                    submitQuoteBtn.innerHTML = storedOriginalText;
                    submitQuoteBtn.removeAttribute('data-original-text');
                } else {
                    submitQuoteBtn.innerHTML = originalBtnText;
                }
                submitQuoteBtn.disabled = false;
            });
        });
    }
});

