/**
 * Breadcrumbs Component - Examples
 *
 * Demonstrates automatic breadcrumb generation from URL pathname
 *
 * Copy to your page.js for testing
 */

"use client";

import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default function BreadcrumbExamples() {
  return (
    <div className="p-8 space-y-12 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Breadcrumb Examples
      </h1>

      {/* Example 1: Automatic Breadcrumb */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          1. Automatic Breadcrumb (Current Page)
        </h2>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <Breadcrumbs />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            ℹ️ Breadcrumb automatically generated from current URL path
          </p>
        </div>
        <pre className="p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`// Just add to your page - no props needed!
<Breadcrumbs />

// It reads the pathname and generates breadcrumbs automatically
// Example: /products/t-shirts → Home > Products > T Shirts`}
        </pre>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          📖 How It Works
        </h2>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">1. Automatic Path Detection</h3>
              <p className="text-sm">Uses <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">usePathname()</code> to read current URL</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Breadcrumb Generation</h3>
              <p className="text-sm">Calls <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">getBreadcrumbs(pathname)</code> utility function</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Label Formatting</h3>
              <p className="text-sm">Capitalizes and formats path segments (e.g., &quot;t-shirts&quot; → &quot;T Shirts&quot;)</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Mobile Detection</h3>
              <p className="text-sm">Uses <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">useDevice()</code> hook - hides on mobile devices</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Renders Items</h3>
              <p className="text-sm">Maps through breadcrumb items using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">BreadcrumbItem</code> component</p>
            </div>
          </div>
        </div>
      </section>

      {/* URL Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          🔗 URL to Breadcrumb Examples
        </h2>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-4">
              <code className="text-blue-600 dark:text-blue-400 font-mono">/products</code>
              <span className="text-gray-400">→</span>
              <span className="text-gray-700 dark:text-gray-300">Home &gt; Products</span>
            </div>

            <div className="flex items-center gap-4">
              <code className="text-blue-600 dark:text-blue-400 font-mono">/products/t-shirts</code>
              <span className="text-gray-400">→</span>
              <span className="text-gray-700 dark:text-gray-300">Home &gt; Products &gt; T Shirts</span>
            </div>

            <div className="flex items-center gap-4">
              <code className="text-blue-600 dark:text-blue-400 font-mono">/gifts/personalized/mugs</code>
              <span className="text-gray-400">→</span>
              <span className="text-gray-700 dark:text-gray-300">Home &gt; Gifts &gt; Personalized &gt; Mugs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          ✅ Features
        </h2>
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✅ <strong>Automatic</strong> - No props needed, reads from URL</li>
            <li>✅ <strong>Mobile Hidden</strong> - Uses useDevice() to hide on mobile</li>
            <li>✅ <strong>Home Icon</strong> - First item always has home icon</li>
            <li>✅ <strong>Capitalization</strong> - Auto-formats path segments</li>
            <li>✅ <strong>Truncation</strong> - Long labels truncated at 30 chars</li>
            <li>✅ <strong>Accessible</strong> - Semantic HTML with ARIA labels</li>
            <li>✅ <strong>Dark Mode</strong> - Automatic theme support</li>
          </ul>
        </div>
      </section>

      {/* Code Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          💻 Add to Your Page
        </h2>
        <pre className="p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`// In your page.js or layout.js
import { Breadcrumbs } from '@/shared/ui/breadcrumbed';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb - automatically shows based on URL */}
      <Breadcrumbs />

      {/* Rest of your page content */}
      <h1>Products</h1>
      {/* ... */}
    </div>
  );
}`}
        </pre>
      </section>
    </div>
  );
}