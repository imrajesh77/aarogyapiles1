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

// Form Submission Handler
function handleFormSubmit(event, source) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Extract values based on form inputs
  let name = form.querySelector('input[type="text"][id$="Name"]')?.value || '';
  let phone = form.querySelector('input[type="tel"]')?.value || '';
  let city = form.querySelector('input[type="text"][id$="City"]')?.value || '';
  let contactMethod = form.querySelector('input[type="radio"]:checked')?.value || 'Phone';

  console.log(`[Form Submitted from ${source}]`, { name, phone, city, contactMethod });

  // Reset form
  form.reset();

  // Close booking modal if open
  closeBookingModal();

  // If WhatsApp was preferred, open pre-filled WhatsApp chat in new tab
  if (contactMethod === 'WhatsApp') {
    const waText = encodeURIComponent(`हेलो आरोग्य इंडिया, मेरा नाम ${name} है (${city})। मुझे पाइल्स/बवासीर के परामर्श के बारे में जानकारी चाहिए। मेरा नंबर: ${phone}`);
    window.open(`https://wa.me/919876543210?text=${waText}`, '_blank');
  }

  // Show Success Modal
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
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
