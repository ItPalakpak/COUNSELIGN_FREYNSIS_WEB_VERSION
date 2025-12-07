<?php
/**
 * Centralized Sidebar Navigation Partial
 * 
 * This partial generates navigation links based on user role and current route.
 * Usage: <?= view('partials/sidebar_navigation', ['role' => 'admin']) ?>
 * 
 * @var string $role User role (admin, counselor, student)
 * @var string|null $currentRoute Optional current route (auto-detected if not provided)
 */

// Auto-detect current route if not provided
if (!isset($currentRoute)) {
    $currentRoute = getCurrentRoute();
}

// Get navigation links for the role
$navigationLinks = getNavigationLinks($role);
?>

<nav class="sidebar-nav">
    <?php foreach ($navigationLinks as $link): ?>
        <?php
        $isActive = isNavigationLinkActive($link, $currentRoute);
        $activeClass = $isActive ? 'active' : '';
        $linkUrl = base_url($link['url']);
        ?>
        <a href="<?= esc($linkUrl) ?>" class="sidebar-link <?= esc($activeClass) ?>" title="<?= esc($link['title']) ?>">
            <i class="<?= esc($link['icon']) ?>"></i>
            <span class="sidebar-text"><?= esc($link['text']) ?></span>
            <?php if (isset($link['badge']) && $link['badge']['enabled']): ?>
                <span class="sidebar-badge" id="<?= esc($link['badge']['badge_id']) ?>" style="display: none;">0</span>
            <?php endif; ?>
        </a>
    <?php endforeach; ?>
</nav>

