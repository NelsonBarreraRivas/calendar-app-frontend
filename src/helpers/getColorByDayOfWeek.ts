

export const getColorByDayOfWeek = (date: Date) => {
    const dayOfWeek = date.getDay();
    switch (dayOfWeek) {
        case 0: // Domingo
            return '#F44336'; // Rojo
        case 1: // Lunes
            return '#2196F3'; // Azul
        case 2: // Martes
            return '#4CAF50'; // Verde
        case 3: // Miércoles
            return '#FFC107'; // Amarillo
        case 4: // Jueves
            return '#9C27B0'; // Morado
        case 5: // Viernes
            return '#FF5722'; // Naranja
        case 6: // Sábado
            return '#607D8B'; // Gris
        default:
            return '#000000'; // Negro
    }
}