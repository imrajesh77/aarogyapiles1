/* ----------------------------------------------------
   Aarogya India — Landing Page Script (Hindi)
   Google Sheet Lead Collection Integration Included
---------------------------------------------------- 

=== GOOGLE SHEET SETUP INSTRUCTIONS ===
1. Create a new Google Sheet (e.g. named "Aarogya India Leads").
2. Go to Extensions -> Apps Script.
3. Replace all code in Apps Script with the following function:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.city || '',
    data.contactMethod || '',
    data.source || 'Landing Page'
  ]);
  return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click "Deploy" -> "New deployment" -> Select type: "Web app".
5. Set "Execute as": "Me", "Who has access": "Anyone".
6. Click "Deploy", authorize permissions, and copy the Web App URL.
7. Paste your Web App URL into the GOOGLE_SHEET_SCRIPT_URL variable below.
---------------------------------------------------- */

// 🔴 Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SHEET_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

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

  console.log(`[Form Submitted from ${source}]`, { name, phone, city, contactMethod });

  // Prepare payload for Google Sheet
  const payload = new URLSearchParams();
  payload.append('name', name);
  payload.append('phone', phone);
  payload.append('city', city);
  payload.append('contactMethod', contactMethod);
  payload.append('source', source);

  // Submit to Google Sheet Web App endpoint if configured
  if (GOOGLE_SHEET_SCRIPT_URL && GOOGLE_SHEET_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
    fetch(GOOGLE_SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Avoids CORS issues with Google Apps Script
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString()
    }).catch(err => console.error('Google Sheet submission error:', err));
  } else {
    console.warn('Google Sheet script URL not set yet. Leads are logged locally.');
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
