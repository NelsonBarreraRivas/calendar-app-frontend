export const isMovil = () : boolean => {
    return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
}