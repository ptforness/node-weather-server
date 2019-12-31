const iconFolderPath = 'img/weather-icons'

const getWeatherIcon = iconName => {
    const icon = `${iconFolderPath}/${iconName}.svg`
    if (!icon) {
        return `${iconFolderPath}/default.svg`
    } else {
        return icon
    }
}


module.exports = getWeatherIcon