import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      authenticateUserByName: (username: string, password: string) => Promise<string>,
    }
  }
}
