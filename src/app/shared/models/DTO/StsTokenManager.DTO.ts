export interface StsTokenManager{
    refreshToken: string,
    accessToken: string,
    expirationTime: number
}