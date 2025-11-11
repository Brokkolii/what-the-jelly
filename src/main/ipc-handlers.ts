import { ipcMain } from 'electron'
import { jellyfinApi } from './services/jellyfin-api'

export function registerIpcHandlers() {
  ipcMain.handle('authenticateUserByName', async (_, username: string, password: string) => {
    return jellyfinApi.authenticateUserByName(username, password)
  })
}