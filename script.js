/* ----------------------------------------------------
   Aarogya India — Landing Page Script (Hindi)
   Google Sheet Lead Collection Integration Included
---------------------------------------------------- 

=== GOOGLE SHEET APPS SCRIPT CODE (ROBUST VERSION) ===
Replace all code in Google Apps Script (Extensions -> Apps Script) with this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = (e && e.parameter) ? e.parameter : {};

    // Support JSON payload fallback
    if ((!data.name) && e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch(err) {}
    }

    sheet.appendRow([
      new Date(),
      data.name || 'N/A',
      data.phone || 'N/A',
      data.city || 'N/A',
      data.contactMethod || 'N/A',
      data.source || 'Landing Page'
    ]);

    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "message": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

DEPLOYMENT STEPS:
1. Click "Deploy" -> "New deployment" -> Select type "Web app".
2. Set "Execute as": "Me"
3. Set "Who has access": "Anyone"
4. Click "Deploy", copy the Web App URL, and paste it into GOOGLE_SHEET_SCRIPT_URL below.
---------------------------------------------------- */

// 🔴 Deployed Google Apps Script Web App URL for Lead Collection
const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkU9Ak-rf94zqggJ8CW2ae6d8UHfTodKcMQia4tWawtEtXMYzJrP068FdwAhJ-CrUa/exec';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Aarogya India Landing Page initialized');
});

// Modal Open / Close Logic
function openBookingModal(source = 'General') {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  }
}

function closeBookingModal(event) {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function closeSuccessModal() {
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    closeSuccessModal();
  }
});

// Form Submission Handler -> Submits to Google Sheet & Redirects to thank-you.html
function handleFormSubmit(event, source) {
  event.preventDefault();
  
  const form = event.target;
  
  // Extract values based on form inputs
  let name = form.querySelector('input[type="text"][id$="Name"]')?.value || '';
  let phone = form.querySelector('input[type="tel"]')?.value || '';
  let city = form.querySelector('input[type="text"][id$="City"]')?.value || '';
  let contactMethod = form.querySelector('input[type="radio"]:checked')?.value || 'Phone';

  console.log(`[Form Submitted from ${source}] Submitting to Google Sheet...`, { name, phone, city, contactMethod });

  // Prepare payload for Google Sheet
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('city', city);
  formData.append('contactMethod', contactMethod);
  formData.append('source', source);

  // Submit to Google Sheet Web App endpoint
  if (GOOGLE_SHEET_SCRIPT_URL) {
    fetch(GOOGLE_SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Avoids CORS issues with Google Apps Script
      body: formData
    }).catch(err => console.error('Google Sheet submission error:', err));
  }

  // Build thank-you URL with query parameters
  const thankYouUrl = `thank-you.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(city)}&contactMethod=${encodeURIComponent(contactMethod)}&source=${encodeURIComponent(source)}`;

  // Redirect to Thank You Page
  window.location.href = thankYouUrl;
}

// Accordion Toggle Handler
function toggleFaq(buttonElement) {
  const faqItem = buttonElement.closest('.faq-item');
  const isActive = faqItem.classList.contains('active');
  
  // Close all open FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });

  // Toggle current item
  if (!isActive) {
    faqItem.classList.add('active');
  }
}
