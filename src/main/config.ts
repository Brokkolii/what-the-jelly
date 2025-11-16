import type { AppConfig } from '../shared/types/app'
import fs from 'fs'
import path from 'path'
import { app } from 'electron'

const configPath = path.join(app.getPath('userData'), 'config.json')

const defaultConfig: AppConfig = {
    deviceId: null,
    baseUrl: null
}

function loadConfig(): AppConfig {
    try {
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf-8')
            return { ...defaultConfig, ...JSON.parse(data) }
        }
    } catch (error) {
        console.error('Failed to load config:', error)
    }
    return defaultConfig
}

export function saveConfig(newConfig: Partial<AppConfig>): void {
    try {
        const updatedConfig = { ...config, ...newConfig }
        fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2))
        config = updatedConfig
    } catch (error) {
        console.error('Failed to save config:', error)
    }
}

export let config = loadConfig()
