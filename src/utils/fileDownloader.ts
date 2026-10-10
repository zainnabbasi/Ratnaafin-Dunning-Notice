/**
 * Robust file downloader for modern browsers, especially within iframes.
 */
export function triggerBrowserDownload(blob: Blob, filename: string): void {
  try {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    a.rel = 'noopener noreferrer';

    // Append to body and trigger click
    document.body.appendChild(a);
    a.click();

    // Clean up after small delay
    setTimeout(() => {
      try {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (_) {
        // Ignored
      }
    }, 60000);
  } catch (err) {
    console.warn('Standard download link click failed, attempting navigation fallback:', err);
    // Fallback: Open blob URL in new tab / window
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}
