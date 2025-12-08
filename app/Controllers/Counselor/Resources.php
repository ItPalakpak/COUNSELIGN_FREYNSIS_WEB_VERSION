<?php

namespace App\Controllers\Counselor;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ResourceModel;

class Resources extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        // Check if user is logged in and is a counselor
        if (!session()->get('logged_in') || session()->get('role') !== 'counselor') {
            return redirect()->to('/');
        }

        $data = [
            'title' => 'Resources - Counselign',
            'username' => session()->get('username'),
            'email' => session()->get('email')
        ];

        return view('counselor/resources', $data);
    }

    public function getResources()
    {
        if (!session()->get('logged_in') || session()->get('role') !== 'counselor') {
            return $this->respond(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        try {
            $resourceModel = new ResourceModel();
            $resources = $resourceModel->getResourcesByVisibility('counselors', true);
            
            // Format file sizes and dates
            foreach ($resources as &$resource) {
                if ($resource['file_size']) {
                    $resource['file_size_formatted'] = $this->formatFileSize($resource['file_size']);
                }
                $resource['created_at_formatted'] = date('M d, Y h:i A', strtotime($resource['created_at']));
            }
            
            return $this->respond(['success' => true, 'resources' => $resources]);
        } catch (\Exception $e) {
            log_message('error', '[Counselor Resources] Error fetching resources: ' . $e->getMessage());
            return $this->respond(['success' => false, 'message' => 'Failed to load resources'], 500);
        }
    }

    /**
     * Format file size
     */
    private function formatFileSize($bytes)
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }
}

