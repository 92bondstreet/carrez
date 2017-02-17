

let prevToast = null

const icons = {
  warning: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6" /></svg>`,
  success: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M2 20 L12 28 30 4" /></svg>`,
  info: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M16 14 L16 23 M16 8 L16 10" /><circle cx="16" cy="16" r="14" /></svg>`,
  error: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25" /></svg>`
}

class Toast {
  constructor({
    message = 'Erreur survenue, la requête envoyée est apparement vide. Merci de recommmencer.',
    position = 'top',
    timeout = 3000,
    el = document.body,
    square = false,
    type = 'error',
    debug = false,
    edge = false
  } = {}) {
    if (prevToast) {
      destroy(prevToast);
    }
    console.log('hola')
    this.message = message;
    this.position = position;
    this.el = el;
    this.timeout = timeout;

    this.toast = document.createElement('div');
    this.toast.className = `native-toast native-toast-${this.position}`;
    console.log(this.toast);
    if (type) {
      this.toast.className += ` native-toast-${type}`;
      this.message = `<span class="native-toast-icon-${type}">${icons[type] || ''}</span>${this.message}`;
    }

    this.toast.innerHTML = this.message;

    if (edge) {
      this.toast.className += ' native-toast-edge';
    }

    if (square) {
      this.toast.style.borderRadius = '3px'
    }

    this.el.appendChild(this.toast)

    prevToast = this

    show(this)
    if (!debug) {
      hide(this)
    }
  }
}

function toast(options) {
  return new Toast(options)
}



 function show(el) {
    setTimeout(function() {
      el.toast.classList.add('native-toast-shown')
    }, 300)
  }

  function hide(el) {
    setTimeout(function() {
      destroy(el)
    }, el.timeout)
  }

  function destroy(el) {
    if (!el.toast) return

    el.toast.classList.remove('native-toast-shown')

    setTimeout(function() {
      if (el.toast) {
        el.el.removeChild(el.toast)
        el.toast = null
      }
    }, 300)
  }