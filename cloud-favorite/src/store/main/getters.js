import { LocalStorage } from 'quasar'

export function getUserName (/* state */) {
  return LocalStorage.getItem('userName')
}
