import { ElectronAPI } from '@electron-toolkit/preload'
import type { JellyfinAuthResponse, JellyfinUser } from '../shared/types/jellyfin'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            authenticateUserByName: (username: string, password: string) => Promise<JellyfinUser>
            hasConnectionToServer: () => Promise<boolean>
            logout: () => Promise<void>
            getUser: () => Promise<JellyfinUser | null>
            setBaseUrl: (baseUrl: string) => Promise<void>
        }
    }
}
