// Utility function to scroll to the form section
export const scrollToForm = () => {
  const formElement = document.getElementById('signup-form')
  if (formElement) {
    formElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
  }
}

// Alternative function for different form IDs
export const scrollToFormById = (formId: string) => {
  const formElement = document.getElementById(formId)
  if (formElement) {
    formElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    })
  }
}
