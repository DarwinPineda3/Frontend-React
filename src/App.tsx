import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { useSelector } from "src/store/Store";
import { ThemeSettings } from "./theme/Theme";
import RTL from "./layouts/full/shared/customizer/RTL";
import ScrollToTop from "./components/shared/ScrollToTop";
import Router from "./routes/Router";
import { AppState } from "./store/Store";
import React, { useState } from 'react';
import Modal from './components/modal/Modal';
import './components/modal/Modal.css';

const App: React.FC = () => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Contenido HTML del modal
  const modalContent = `
    <div class="modal-body-AI">
        <h1>WooCommerce Plugin Vulnerability Analysis and Remediation</h1>
        <h2>1. Overview</h2>
        <p>A critical security vulnerability has been detected in the WooCommerce plugin version 8.2.2 on the website <code>https://prueba-tu-pala.ofertasdepadel.com/</code>. The vulnerability allows attackers to upload files with a .php extension through a bypassed sanitization process and perform path traversal attacks.</p>
        <h2>2. Detailed Analysis</h2>
        <p>The WooCommerce plugin, a widely used e-commerce plugin for WordPress, contains a flaw in its file upload functionality. This vulnerability stems from an insufficient sanitization process that fails to block certain extensions, allowing attackers to upload malicious .php files. Furthermore, a path traversal vulnerability allows files to be uploaded to unintended locations, posing significant security risks.</p>
        <h2>3. Description</h2>
        <h3>What is it?</h3>
        <p>The vulnerability is a critical security flaw in the WooCommerce plugin that allows for arbitrary file uploads and path traversal attacks.</p>
        <h3>How does it work?</h3>
        <ul>
            <li><strong>Bypassed Sanitization</strong>: The plugin attempts to block dangerous file extensions like .php by sanitizing the "wcuf_file_name" parameter. Sin embargo, la sanitización es insuficiente, y los atacantes pueden eludirla.</li>
            <li><strong>Double Extension Attack</strong>: Los atacantes pueden usar extensiones dobles (ej. "file.php.jpg") para eludir las medidas de seguridad.</li>
            <li><strong>Path Traversal</strong>: Manipulando el parámetro "wcuf_current_upload_session_id", los atacantes pueden subir archivos a directorios no previstos.</li>
        </ul>
        <h3>Impact</h3>
        <p>If exploited, this vulnerability can lead to:</p>
        <ul>
            <li><strong>Remote Code Execution (RCE)</strong>: Attackers can upload and execute malicious PHP scripts.</li>
            <li><strong>Data Breach</strong>: Sensitive data can be accessed, modified, or deleted.</li>
            <li><strong>System Compromise</strong>: Full control of the affected system can be gained by attackers.</li>
            <li><strong>Service Disruption</strong>: The website's availability can be impacted, resulting in downtime or degraded performance.</li>
        </ul>
        <h2>4. Example</h2>
        <p>An attacker could craft a malicious request to upload a file named <code>malicious.php.jpg</code>. The WooCommerce plugin's insufficient sanitization allows the file to be uploaded and stored as <code>malicious.php</code>, which can then be executed to perform malicious actions.</p>
        <pre><code class="language-http">POST /wp-content/plugins/woocommerce/upload.php HTTP/1.1
Host: prueba-tu-pala.ofertasdepadel.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
Content-Length: 1337

------WebKitFormBoundary
Content-Disposition: form-data; name="wcuf_file_name"

malicious.php.jpg
------WebKitFormBoundary
Content-Disposition: form-data; name="wcuf_current_upload_session_id"

../../../../wp-content/uploads/malicious.php
------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="malicious.php.jpg"
Content-Type: application/octet-stream

&lt;?php phpinfo(); ?&gt;
------WebKitFormBoundary--
</code></pre>
        <h2>5. Remediation Steps</h2>
        <p>To mitigate this critical vulnerability, follow these steps:</p>
        <h3>Step 1: Update WooCommerce Plugin</h3>
        <p>Immediately update the WooCommerce plugin to the latest version (9.2.3).</p>
        <h4>How to Update:</h4>
        <ol>
            <li>Log in to your WordPress admin dashboard.</li>
            <li>Navigate to <code>Plugins</code> &gt; <code>Installed Plugins</code>.</li>
            <li>Locate "WooCommerce" and click "Update Now".</li>
        </ol>
        <pre><code className="language-shell"># Alternatively, update via WP-CLI
wp plugin update woocommerce
</code></pre>
        <h3>Step 2: Verify the Update</h3>
        <p>Ensure the plugin has been updated successfully:</p>
        <ol>
            <li>Go to <code>Plugins</code> &gt; <code>Installed Plugins</code> and check the version number.</li>
            <li>Visit the plugin directory and verify the version in the <code>woocommerce.php</code> file.</li>
        </ol>
        <h3>Step 3: Review and Clean Uploaded Files</h3>
        <p>Check for any suspicious files that may have been uploaded during the period of vulnerability.</p>
        <ol>
            <li>Navigate to your upload directories (<code>/wp-content/uploads/</code>).</li>
            <li>Look for files with unusual extensions or names.</li>
            <li>Remove any suspicious files.</li>
        </ol>
        <pre><code className="language-shell"># Example command to find PHP files in the uploads directory
find /path/to/wordpress/wp-content/uploads/ -name "*.php"
</code></pre>
        <h3>Step 4: Strengthen File Upload Security</h3>
        <p>Implement additional security measures to prevent future vulnerabilities:</p>
        <ol>
            <li><strong>Restrict File Types</strong>: Limit allowed file types to only those necessary.</li>
            <li><strong>Double-Check Extensions</strong>: Implement stricter sanitization and validation for file uploads.</li>
            <li><strong>File Permissions</strong>: Ensure uploaded files are not executable by setting appropriate permissions.</li>
        </ol>
        <pre><code class="language-php">// Example PHP code to restrict file types
function restrict_upload_mimes($mimes) {
    return array(
        'jpg|jpeg|jpe' =&gt; 'image/jpeg',
        'png' =&gt; 'image/png',
        'gif' =&gt; 'image/gif',
        'pdf' =&gt; 'application/pdf',
    );
}
add_filter('upload_mimes', 'restrict_upload_mimes');
</code></pre>
        <h3>Step 5: Monitor and Audit</h3>
        <p>Regularly monitor and audit your website for any signs of exploitation.</p>
        <ol>
            <li>Use security plugins to scan for vulnerabilities.</li>
            <li>Review logs for unusual activity.</li>
        </ol>
        <p>By following these steps, you can secure your WooCommerce plugin against this critical vulnerability and protect your website from potential attacks.</p>
    </div>
  `;

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
        <div className="centered-container">
          {/* Botón siempre visible */}
          <button className="centered-button" onClick={openModal}>Mostrar Modal</button>
          <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
        </div>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
