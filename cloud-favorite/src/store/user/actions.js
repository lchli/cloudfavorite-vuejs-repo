export function register (context, payload) {
  payload.context = context

  context.commit('register', payload)
}
