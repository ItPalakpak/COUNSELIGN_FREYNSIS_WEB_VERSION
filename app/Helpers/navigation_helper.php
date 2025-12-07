<?php

if (!function_exists('getNavigationLinks')) {
    /**
     * Get navigation links for a specific role
     * 
     * @param string $role The user role (admin, counselor, student)
     * @return array Array of navigation link configurations
     */
    function getNavigationLinks(string $role): array
    {
        $navigationConfig = [
            'admin' => [
                [
                    'url' => 'admin/dashboard',
                    'icon' => 'fas fa-home',
                    'text' => 'Dashboard',
                    'title' => 'Dashboard',
                    'active_patterns' => ['admin/dashboard']
                ],
                [
                    'url' => 'admin/admins-management',
                    'icon' => 'fas fa-users-cog',
                    'text' => 'Management',
                    'title' => 'Management',
                    'active_patterns' => ['admin/admins-management', 'admin/view-users', 'admin/counselor-info', 'admin/account-settings']
                ],
                [
                    'url' => 'admin/appointments',
                    'icon' => 'fas fa-calendar-check',
                    'text' => 'Recent Appointments',
                    'title' => 'Recent Appointments',
                    'active_patterns' => ['admin/appointments', 'admin/appointments/view-all', 'admin/appointments/scheduled']
                ],
                [
                    'url' => 'admin/follow-up-sessions',
                    'icon' => 'fas fa-calendar-days',
                    'text' => 'Follow-up Sessions',
                    'title' => 'Follow-up Sessions',
                    'active_patterns' => ['admin/follow-up-sessions']
                ],
                [
                    'url' => 'admin/resources',
                    'icon' => 'fas fa-folder-open',
                    'text' => 'Resources',
                    'title' => 'Resources',
                    'active_patterns' => ['admin/resources']
                ],
                [
                    'url' => 'admin/announcements',
                    'icon' => 'fa-solid fa-bullhorn',
                    'text' => 'Announcements',
                    'title' => 'Announcements',
                    'active_patterns' => ['admin/announcements', 'admin/history-reports']
                ],
                [
                    'url' => 'admin/quotes-management',
                    'icon' => 'fas fa-quote-right',
                    'text' => 'Quotes',
                    'title' => 'Quotes Management',
                    'active_patterns' => ['admin/quotes-management'],
                    'badge' => [
                        'enabled' => true,
                        'api_endpoint' => 'admin/quotes/pending-count',
                        'badge_id' => 'quotes-pending-badge'
                    ]
                ]
            ],
            'counselor' => [
                [
                    'url' => 'counselor/dashboard',
                    'icon' => 'fas fa-home',
                    'text' => 'Dashboard',
                    'title' => 'Dashboard',
                    'active_patterns' => ['counselor/dashboard']
                ],
                [
                    'url' => 'counselor/appointments/scheduled',
                    'icon' => 'fas fa-calendar-alt',
                    'text' => 'Scheduled Appointments',
                    'title' => 'Scheduled Appointments',
                    'active_patterns' => ['counselor/appointments', 'counselor/appointments/scheduled', 'counselor/appointments/view-all']
                ],
                [
                    'url' => 'counselor/follow-up',
                    'icon' => 'fas fa-clipboard-list',
                    'text' => 'Follow-up Sessions',
                    'title' => 'Follow-up Sessions',
                    'active_patterns' => ['counselor/follow-up']
                ],
                [
                    'url' => 'counselor/announcements',
                    'icon' => 'fas fa-bullhorn',
                    'text' => 'Announcement',
                    'title' => 'Announcement',
                    'active_patterns' => ['counselor/announcements', 'counselor/history-reports']
                ],
                [
                    'url' => 'counselor/messages',
                    'icon' => 'fas fa-envelope',
                    'text' => 'Messages',
                    'title' => 'Messages',
                    'active_patterns' => ['counselor/messages', 'counselor/message'],
                    'badge' => [
                        'enabled' => true,
                        'api_endpoint' => 'counselor/message/operations?action=get_unread_count',
                        'badge_id' => 'counselor-messages-badge'
                    ]
                ],
                [
                    'url' => 'counselor/notifications/page',
                    'icon' => 'fas fa-bell',
                    'text' => 'Notifications',
                    'title' => 'Notifications',
                    'active_patterns' => ['counselor/notifications/page'],
                    'badge' => [
                        'enabled' => true,
                        'api_endpoint' => 'counselor/notifications/unread-count',
                        'badge_id' => 'counselor-notifications-badge'
                    ]
                ]
            ],
            'student' => [
                [
                    'url' => 'student/dashboard',
                    'icon' => 'fas fa-home',
                    'text' => 'Dashboard',
                    'title' => 'Dashboard',
                    'active_patterns' => ['student/dashboard']
                ],
                [
                    'url' => 'student/schedule-appointment',
                    'icon' => 'fas fa-plus-circle',
                    'text' => 'Schedule an Appointment',
                    'title' => 'Schedule an Appointment',
                    'active_patterns' => ['student/schedule-appointment']
                ],
                [
                    'url' => 'student/my-appointments',
                    'icon' => 'fas fa-list-alt',
                    'text' => 'My Appointments',
                    'title' => 'My Appointments',
                    'active_patterns' => ['student/my-appointments']
                ],
                [
                    'url' => 'student/follow-up-sessions',
                    'icon' => 'fas fa-clipboard-list',
                    'text' => 'Follow-up Sessions',
                    'title' => 'Follow-up Sessions',
                    'active_patterns' => ['student/follow-up-sessions']
                ],
                [
                    'url' => 'student/announcements',
                    'icon' => 'fas fa-bullhorn',
                    'text' => 'Announcement',
                    'title' => 'Announcement',
                    'active_patterns' => ['student/announcements']
                ],
                [
                    'url' => 'student/messages',
                    'icon' => 'fas fa-envelope',
                    'text' => 'Messages',
                    'title' => 'Messages',
                    'active_patterns' => ['student/messages', 'student/message'],
                    'badge' => [
                        'enabled' => true,
                        'api_endpoint' => 'student/message/operations?action=get_unread_count',
                        'badge_id' => 'student-messages-badge'
                    ]
                ],
                [
                    'url' => 'student/notifications/page',
                    'icon' => 'fas fa-bell',
                    'text' => 'Notifications',
                    'title' => 'Notifications',
                    'active_patterns' => ['student/notifications/page'],
                    'badge' => [
                        'enabled' => true,
                        'api_endpoint' => 'student/notifications/unread-count',
                        'badge_id' => 'student-notifications-badge'
                    ]
                ]
            ]
        ];

        return $navigationConfig[$role] ?? [];
    }
}

if (!function_exists('isNavigationLinkActive')) {
    /**
     * Check if a navigation link should be active based on current route
     * 
     * @param array $linkConfig Navigation link configuration
     * @param string $currentRoute Current route path
     * @return bool True if link should be active
     */
    function isNavigationLinkActive(array $linkConfig, string $currentRoute): bool
    {
        if (!isset($linkConfig['active_patterns'])) {
            return false;
        }

        foreach ($linkConfig['active_patterns'] as $pattern) {
            // Exact match
            if ($currentRoute === $pattern) {
                return true;
            }
            
            // Pattern match (for routes like admin/appointments/view-all matching admin/appointments)
            if (strpos($currentRoute, $pattern) === 0) {
                return true;
            }
        }

        return false;
    }
}

if (!function_exists('getCurrentRoute')) {
    /**
     * Get current route path from URI
     * 
     * @return string Current route path
     */
    function getCurrentRoute(): string
    {
        $uri = service('uri');
        $segments = $uri->getSegments();
        
        if (empty($segments)) {
            return '';
        }
        
        return implode('/', $segments);
    }
}

