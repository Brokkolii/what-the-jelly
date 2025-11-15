import { ElectronAPI } from '@electron-toolkit/preload'
import type { JellyfinAuthResponse } from '../shared/types/jellyfin'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            authenticateUserByName: (
                username: string,
                password: string
            ) => Promise<JellyfinAuthResponse>
        }
    }
}
