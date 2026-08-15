/* ----------------------------------------------------
   Aarogya India — Landing Page Script (Hindi)
---------------------------------------------------- */

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

// Form Submission Handler -> Redirects to thank-you.html
function handleFormSubmit(event, source) {
  event.preventDefault();
  
  const form = event.target;
  
  // Extract values based on form inputs
  let name = form.querySelector('input[type="text"][id$="Name"]')?.value || '';
  let phone = form.querySelector('input[type="tel"]')?.value || '';
  let city = form.querySelector('input[type="text"][id$="City"]')?.value || '';
  let contactMethod = form.querySelector('input[type="radio"]:checked')?.value || 'Phone';

  console.log(`[Form Submitted from ${source}] Redirecting to thank-you.html...`, { name, phone, city, contactMethod });

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
