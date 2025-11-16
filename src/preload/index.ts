import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
    authenticateUserByName: (username: string, password: string) =>
        electronAPI.ipcRenderer.invoke('authenticateUserByName', username, password),
    hasConnectionToServer: (): Promise<boolean> =>
        electronAPI.ipcRenderer.invoke('hasConnectionToServer'),
    logout: () => electronAPI.ipcRenderer.invoke('logout'),
    getUser: () => electronAPI.ipcRenderer.invoke('getUser'),
    setBaseUrl: (baseUrl: string) => electronAPI.ipcRenderer.invoke('setBaseUrl', baseUrl)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
