import { ProviderData } from "./ProviderData.DTO"
import { StsTokenManager } from "./StsTokenManager.DTO"

export interface CurrentUserDTO{
    uid: string,
    email: string
    emailVerified: boolean,
    displayName: string,
    isAnonymous: boolean,
    providerData: ProviderData[],
    stsTokenManager: StsTokenManager,
    createdAt: number,
    lastLoginAt: number,
    apiKey: string,
    appName: string
}