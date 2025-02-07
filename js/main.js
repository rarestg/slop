document
  .getElementById('contact-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      neighborhood: document.getElementById('neighborhood').value,
      whySlop: document.getElementById('whySlop').value,
      _url: 'https://slop.city',
    }

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]')
    const originalButtonText = submitButton.innerHTML
    submitButton.innerHTML = 'Sending...'
    submitButton.disabled = true

    try {
      const response = await fetch('https://formspree.io/f/xzzdvgzj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'https://slop.city',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Clear the form
        this.reset()

        // Show success message
        const successMessage = document.createElement('div')
        successMessage.style.cssText = `
        background: #2ecc71;
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-top: -20px;
        margin-bottom: 20px;
        font-weight: 500;
        animation: slideDown 0.5s ease-out;
      `
        successMessage.innerHTML = `
        <h3 style="color: white; margin-bottom: 10px;">🎉 You're on the list!</h3>
        <p style="margin: 0;">Thanks for joining the SLOP! squad. We'll be in touch soon!</p>
      `

        // Insert the success message before the form
        this.parentNode.insertBefore(successMessage, this)

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.style.animation = 'slideUp 0.5s ease-out forwards'
          setTimeout(() => successMessage.remove(), 500)
        }, 5000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      // Show error message
      const errorMessage = document.createElement('div')
      errorMessage.style.cssText = `
      background: #e74c3c;
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin-top: -20px;
      margin-bottom: 20px;
      font-weight: 500;
      animation: slideDown 0.5s ease-out;
    `
      errorMessage.innerHTML = `
      <h3 style="color: white; margin-bottom: 10px;">😅 Oops!</h3>
      <p style="margin: 0;">Something went wrong. Please try again in a few minutes.</p>
    `

      // Insert the error message before the form
      this.parentNode.insertBefore(errorMessage, this)

      // Scroll to error message
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.style.animation = 'slideUp 0.5s ease-out forwards'
        setTimeout(() => errorMessage.remove(), 500)
      }, 5000)
    } finally {
      // Restore button state
      submitButton.innerHTML = originalButtonText
      submitButton.disabled = false
    }
  })

// Text rotation animation
function initFallingText() {
  const textOptions = document.querySelectorAll('.text-option')
  let currentIndex = 0

  // Show first option
  textOptions[0].classList.add('active')

  setInterval(() => {
    // Add leaving class to current
    textOptions[currentIndex].classList.add('leaving')
    textOptions[currentIndex].classList.remove('active')

    // Move to next
    currentIndex = (currentIndex + 1) % textOptions.length

    // Show next immediately
    setTimeout(() => {
      textOptions[currentIndex].classList.add('active')
    }, 50) // Tiny delay for smoother transition

    // Remove leaving class after animation
    setTimeout(() => {
      textOptions[
        currentIndex - 1 >= 0 ? currentIndex - 1 : textOptions.length - 1
      ].classList.remove('leaving')
    }, 400)
  }, 3000)
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initFallingText()
})
