export interface RegisterParamater {
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string,
    country: string,
    city: string
}

export interface LoginParamater {
    email: string,
    password: string,
}