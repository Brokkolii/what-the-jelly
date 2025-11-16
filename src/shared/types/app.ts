export type AppConfig =
    | {
          deviceId?: string | null | undefined
          jellyfin?:
              | {
                    baseUrl?: string | null | undefined
                }
              | null
              | undefined
      }
    | null
    | undefined
