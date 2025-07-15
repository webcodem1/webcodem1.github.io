const urls = {
  'url1': 'aHR0cHM6Ly9naXRodWIuY29tL3dlYmNvZGVtMS93ZWJjb2RlbS1tZWRpYS5naXRodWIuaW8vcmF3L3JlZnMvaGVhZHMvbWFpbi9yZXNvdXJjZXMvbWFya2V0cGxhY2UvbWluZWNyYWZ0L3RleHR1cmUvQWN0aW9ucyUyMFN0dWZmJTIwMS41Lm1jcGFjaw==',
  'url2': 'aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMVB1dkpKX21DTlBfUXVlRmJLYWV2WWtsQXg1OURZUzNXP3VzcD1zaGFyaW5n',
  'url3': ['aHR0cHM6Ly9naXRodWIuY29tL3dlYmNvZGVtMS93ZWJjb2RlbS1tZWRpYS5naXRodWIuaW8vcmF3L3JlZnMvaGVhZHMvbWFpbi9yZXNvdXJjZXMvbWFya2V0cGxhY2UvbWluZWNyYWZ0L3RleHR1cmUvUmVhbGlzbUNyYWZ0Lm1jdGVtcGxhdGU===', 'aHR0cHM6Ly93ZWJjb2RlbTEuZ2l0aHViLmlvL3dlYmNvZGVtLW1lZGlhLmdpdGh1Yi5pby9yZXNvdXJjZXMvbWFya2V0cGxhY2UvbWluZWNyYWZ0L3RleHR1cmUvUmVhbGlzbUNyYWZ0JTIwUmVzb3VyY2UlMjBQYWNrLm1jcGFjaw=='],
  'url4': 'aHR0cHM6Ly93ZWJjb2RlbTEuZ2l0aHViLmlvL3dlYmNvZGVtLW1lZGlhLmdpdGh1Yi5pby9yZXNvdXJjZXMvbWFya2V0cGxhY2UvbWluZWNyYWZ0L3RleHR1cmUvUmVhbGlzdGljIEJpb21lcyBBZGQtT24ubWNhZGRvbg==',
  'url5': 'aHR0cHM6Ly93ZWJjb2RlbS1tZWRpYS5naXRodWIuaW8vcmVzb3VyY2VzL21hcmtldHBsYWNlL21pbmVjcmFmdC90ZXh0dXJhL0JhcmUgQm9uZSBQbHVzIFtCRVRBXS5tY3BhY2s',
};

// Updated function to handle multiple URLs
function decodeAndRedirect(event, urlKey) {
  event.preventDefault(); 
  
  const contentUrl = urls[urlKey];
  
  // Check if it's an array of URLs or a single URL
  if (Array.isArray(contentUrl)) {
    // Process each URL in the array with a small delay between downloads
    contentUrl.forEach((url, index) => {
      setTimeout(() => {
        downloadSingleFile(url);
      }, index * 500); // 500ms delay between downloads to avoid browser blocking
    });
  } else if (contentUrl) {
    // Process a single URL
    downloadSingleFile(contentUrl);
  }
}

// Helper function to download a single file
function downloadSingleFile(encodedUrl) {
  // Fix encoded URL if it has an extra 'a' at the beginning (as seen in url3)
  if (encodedUrl.startsWith('a') && encodedUrl.length % 4 === 1) {
    encodedUrl = encodedUrl.substring(1);
  }
  
  const decodedUrl = atob(encodedUrl);
  
  // Get filename from URL and decode URL-encoded characters
  let filename = decodedUrl.split('/').pop();
  filename = decodeURIComponent(filename); // This converts %20 to spaces and handles other URL-encoded characters
  
  // Create a hidden anchor and trigger download with the decoded filename
  const link = document.createElement('a');
  link.href = decodedUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Keep the original function for backward compatibility
function Download(event, urlKey) {
  decodeAndRedirect(event, urlKey);
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('overlay').style.display = 'none';
});
