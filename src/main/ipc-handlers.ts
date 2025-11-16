import { ipcMain } from 'electron'
import { jellyfinApi } from './services/jellyfin-api'

export function registerIpcHandlers() {
    ipcMain.handle('authenticateUserByName', async (_, username: string, password: string) => {
        return jellyfinApi.authenticateUserByName(username, password)
    })
    ipcMain.handle('hasConnectionToServer', async () => {
        return jellyfinApi.hasConnectionToServer()
    })
    ipcMain.handle('logout', async () => {
        return jellyfinApi.logout()
    })
    ipcMain.handle('getUser', async () => {
        return jellyfinApi.getUser()
    })
    ipcMain.handle('setBaseUrl', async (_, baseUrl: string) => {
        return jellyfinApi.setBaseUrl(baseUrl)
    })
}
