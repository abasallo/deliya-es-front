export default {
  LOCAL_GRAPHQL_BACKEND_URL: 'http://localhost:4000/graphql',

  COOKIE_AUTHENTICATION_EMAIL: 'email',
  COOKIE_AUTHENTICATION_TOKEN: 'token',

  SUSPENSE_FALLBACK_TEXT: 'Cargando...',

  PATH_PASSWORD_CHANGE: '/password-change/:token',
  PATH_PASSWORD_RECOVERY: '/password-recovery',
  PATH_SIGN_UP: '/sign-up',
  PATH_USER_ACTIVATION: '/user-activation/:token',
  PATH_ROOT: '/',

  YES_TEXT: 'Sí',
  NO_TEXT: 'No',

  SNACKBAR_AUTO_HIDE_TIME: 7000,

  COPYRIGHT_TEXT: 'Copyright © ',
  COPYRIGHT_LINK: 'https://xplore.es/',
  COPYRIGHT_LINK_TEXT: 'Xplore',

  LOGO_ALT: 'Logo',

  LOGOUT: 'Logout',

  SIGN_UP_ACTIVATION_EMAIL_SENT_NOTIFICATION: 'Correo de activación enviado.',
  SIGN_UP_ERROR_MESSAGE_NAMES: '¿cómo te llamas?',
  SIGN_UP_ERROR_MESSAGE_SURNAMES: '¿cómo te apellidas? :-)',
  SIGN_UP_ERROR_MESSAGE_EMAIL: 'no válido, o ya existente',
  SIGN_UP_ERROR_MESSAGE_PASSWORD: 'al menos un caracter',
  SIGN_UP_ERROR_MESSAGE_RETYPED: 'no coinciden',
  SIGN_UP_MESSAGE_IS_CONTACT_ALLOWED: 'Acepto recibir inspiración, promociones y actualizaciones; en forma de correos electrónicos.',
  SIGN_UP_MESSAGE_IS_COOK: '¡Quiero darme de alta como cocinero!',
  SIGN_UP_SUBMIT_BUTTON: 'Enviar alta',

  PASSWORD_RECOVERY_EMAIL_SENT_NOTIFICATION: 'Correo de recuperación de contraseña enviado.',
  PASSWORD_RECOVERY_CAPTION: 'Recuperación de contraseña',
  PASSWORD_RECOVERY_ERROR_MESSAGE_EMAIL: 'Correo electrónico no válido, o inexistente',
  PASSWORD_RECOVERY_SUBMIT_BUTTON: 'Enviar correo de recuperación',

  PASSWORD_CHANGE_NOTIFICATION_OK: 'La contraseña ha sido cambiada con éxito.',
  PASSWORD_CHANGE_NOTIFICATION_KO: 'Error, los enlaces caducan rápidamente, vuelva a intentarlo de nuevo.',
  PASSWORD_CHANGE_CAPTION: 'Cambio de contraseña',
  PASSWORD_CHANGE_ERROR_MESSAGE_PASSWORD: 'al menos un caracter',
  PASSWORD_CHANGE_ERROR_MESSAGE_PASSWORD_REPEATED: 'no coinciden',
  PASSWORD_CHANGE_SUBMIT_BUTTON: 'Enviar nueva contraseña',

  LOGIN_CAPTION: 'Autenticación',
  LOGIN_ERROR_MESSAGE_EMAIL: 'Correo electrónico no válido, o inexistente',
  LOGIN_ERROR_MESSAGE_PASSWORD: 'Contraseña incorrecta',
  LOGIN_SWITCH_REMEMBER_ME: 'Recuérdame',
  LOGIN_LINK_PASSWORD_RECOVERY: '¿Olvidaste tu contraseña?',
  LOGIN_LINK_SIGN_UP: '¿Eres nuevo? ¡Date de alta!'
}
