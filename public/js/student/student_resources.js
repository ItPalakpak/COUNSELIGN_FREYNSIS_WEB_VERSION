/**
 * Student Resources Page JavaScript
 * Handles loading and displaying resources in a 2-column card layout
 */

// Store resources data globally for preview module
let studentResourcesData = [];

/**
 * Load resources from the API
 */
function loadResources() {
    const baseUrl = window.BASE_URL || '/';
    const url = baseUrl + 'student/resources/get';
    const container = document.getElementById('resourcesGrid');

    if (!container) {
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="text-center py-5 resources-loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading resources...</span>
            </div>
            <p class="mt-2 text-muted">Loading resources...</p>
        </div>
    `;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.resources && data.resources.length > 0) {
                studentResourcesData = data.resources; // Store for preview module
                renderResourcesCards(data.resources);
            } else {
                container.innerHTML = `
                    <div class="resources-empty">
                        <i class="fas fa-folder-open"></i>
                        <p>No resources available at this time.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading resources:', error);
            container.innerHTML = `
                <div class="resources-empty">
                    <i class="fas fa-exclamation-triangle text-warning"></i>
                    <p class="text-danger">Failed to load resources. Please try again later.</p>
                </div>
            `;
        });
}

/**
 * Render resources as cards in a 2-column grid
 */
function renderResourcesCards(resources) {
    const container = document.getElementById('resourcesGrid');
    if (!container) {
        return;
    }

    if (resources.length === 0) {
        container.innerHTML = `
            <div class="resources-empty">
                <i class="fas fa-folder-open"></i>
                <p>No resources available at this time.</p>
            </div>
        `;
        return;
    }

    let html = '';
    resources.forEach((resource) => {
        html += generateResourceCard(resource);
    });

    container.innerHTML = html;
}

/**
 * Generate HTML for a single resource card
 */
function generateResourceCard(resource) {
    const resourceTypeIcon = resource.resource_type === 'file' 
        ? '<i class="fas fa-file-alt text-primary"></i>' 
        : '<i class="fas fa-link text-info"></i>';
    
    const categoryBadge = resource.category 
        ? `<span class="resource-card-category">${escapeHtml(resource.category)}</span>` 
        : '';
    
    const description = resource.description 
        ? `<div class="resource-card-description">${escapeHtml(resource.description)}</div>` 
        : '';
    
    const tags = resource.tags 
        ? `<div class="resource-card-tags"><i class="fas fa-tags me-1"></i>${escapeHtml(resource.tags)}</div>` 
        : '';

    let resourceContent = '';
    if (resource.resource_type === 'file') {
        const fileIcon = getFileIcon(resource.file_type);
        const fileSize = resource.file_size_formatted || 'Unknown size';
        
        resourceContent = `
            <div class="resource-file-content">
                <div class="resource-file-info">
                    <div class="resource-file-icon">${fileIcon}</div>
                    <div class="resource-file-details">
                        <div class="resource-file-name">${escapeHtml(resource.file_name || 'File')}</div>
                        <div class="resource-file-size">${escapeHtml(fileSize)}</div>
                    </div>
                </div>
                <div class="resource-file-actions">
                    <button class="btn-resource btn-resource-outline preview-resource-advanced" 
                            data-resource-id="${resource.id}">
                        <i class="fas fa-eye"></i>Preview
                    </button>
                    <button class="btn-resource btn-resource-primary download-resource-btn" 
                            data-resource-id="${resource.id}">
                        <i class="fas fa-download"></i>Download
                    </button>
                </div>
            </div>
        `;
    } else {
        resourceContent = `
            <div class="resource-link-content">
                <div class="resource-link-url">
                    <i class="fas fa-link me-1"></i>${escapeHtml(resource.external_url)}
                </div>
                <button class="btn-resource btn-resource-primary preview-resource-advanced" 
                        data-resource-id="${resource.id}">
                    <i class="fas fa-external-link-alt"></i>Open Link
                </button>
            </div>
        `;
    }

    return `
        <div class="resource-card">
            <div class="resource-card-header">
                <div class="resource-card-icon">${resourceTypeIcon}</div>
                <div class="resource-card-title-section">
                    <h3 class="resource-card-title">${escapeHtml(resource.title)}</h3>
                    <div class="resource-card-meta">
                        <div class="resource-card-date">
                            <i class="fas fa-calendar-alt"></i>
                            ${resource.created_at_formatted || ''}
                        </div>
                        ${categoryBadge}
                    </div>
                </div>
            </div>
            <div class="resource-card-body">
                ${description}
                ${tags}
                <div class="resource-card-content">
                    ${resourceContent}
                </div>
            </div>
            <div class="resource-card-footer">
                <i class="fas fa-user"></i>
                <span>Posted by: ${escapeHtml(resource.uploader_name || 'Admin')}</span>
            </div>
        </div>
    `;
}

/**
 * Get file icon based on file type
 */
function getFileIcon(fileType) {
    if (!fileType) return '<i class="fas fa-file text-secondary"></i>';
    
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return '<i class="fas fa-file-pdf text-danger"></i>';
    if (type.includes('word') || type.includes('doc')) return '<i class="fas fa-file-word text-primary"></i>';
    if (type.includes('excel') || type.includes('sheet')) return '<i class="fas fa-file-excel text-success"></i>';
    if (type.includes('image')) return '<i class="fas fa-file-image text-info"></i>';
    if (type.includes('video')) return '<i class="fas fa-file-video text-warning"></i>';
    if (type.includes('zip') || type.includes('rar')) return '<i class="fas fa-file-archive text-secondary"></i>';
    return '<i class="fas fa-file text-secondary"></i>';
}

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
 * Download resource handler
 */
function downloadStudentResource(id) {
    const baseUrl = window.BASE_URL || '/';
    window.location.href = baseUrl + 'student/resources/download/' + id;
}

// Event listeners for preview and download
document.addEventListener('click', function(e) {
    const previewBtn = e.target.closest('.preview-resource-advanced');
    if (previewBtn) {
        e.preventDefault();
        const resourceId = parseInt(previewBtn.getAttribute('data-resource-id'));
        
        // Use the shared preview module
        if (window.ResourcePreview && typeof window.ResourcePreview.previewResource === 'function') {
            window.ResourcePreview.previewResource(resourceId, studentResourcesData);
        } else {
            console.error('ResourcePreview module not loaded');
            alert('Preview feature is not available. Please refresh the page.');
        }
        return;
    }

    const downloadBtn = e.target.closest('.download-resource-btn');
    if (downloadBtn) {
        e.preventDefault();
        const resourceId = parseInt(downloadBtn.getAttribute('data-resource-id'));
        downloadStudentResource(resourceId);
        return;
    }
});

// Load resources when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadResources();
});

