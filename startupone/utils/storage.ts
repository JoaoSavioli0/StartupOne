//Funções sessionStorage
export function sessionGet<T>(key: string): T | null{
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) as T : null
}

export function sessionSet(key: string, value: unknown){
    sessionStorage.setItem(key, JSON.stringify(value))
}

export function sessionRemove(key: string){
    sessionStorage.removeItem(key)
}

//Funções localStorage
export function localGet<T>(key: string): T | null{
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) as T : null
}

export function localSet(key: string, value: unknown){
    localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key: string){
    localStorage.removeItem(key)
}