// Simple toast notification system
let toastContainer: HTMLElement | null = null

function createToastContainer() {
  if (toastContainer) return toastContainer

  toastContainer = document.createElement('div')
  toastContainer.id = 'toast-container'
  toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2'
  document.body.appendChild(toastContainer)
  
  return toastContainer
}

function createToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const container = createToastContainer()
  
  const toast = document.createElement('div')
  toast.className = `
    px-4 py-3 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right duration-300
    ${type === 'success' ? 'bg-green-500 text-white' : ''}
    ${type === 'error' ? 'bg-red-500 text-white' : ''}
    ${type === 'info' ? 'bg-blue-500 text-white' : ''}
  `
  toast.textContent = message
  
  container.appendChild(toast)
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slide-out-to-right 300ms ease-in-out forwards'
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

export const toast = {
  success: (message: string) => createToast(message, 'success'),
  error: (message: string) => createToast(message, 'error'),
  info: (message: string) => createToast(message, 'info')
}

// 호환성을 위한 showToast export
export const showToast = toast