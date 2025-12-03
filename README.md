# Weather for VS Code

[![Publish](https://github.com/erbanku/weather-extension-for-code/actions/workflows/publish.yml/badge.svg)](https://github.com/erbanku/weather-extension-for-code/actions/workflows/publish.yml)
[![Version](https://img.shields.io/visual-studio-marketplace/v/erbanku.weather-for-code)](https://marketplace.visualstudio.com/items?itemName=erbanku.weather-for-code)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/erbanku.weather-for-code)](https://marketplace.visualstudio.com/items?itemName=erbanku.weather-for-code)

Display weather in your VS Code status bar.

## Features

- Worldwide city support
- Real-time weather updates
- 3-day forecast
- 32+ languages
- Auto-update every 2 hours
- Status bar display

## Installation

Press `Ctrl+P` and type:
```
ext install erbanku.weather-for-code
```

## Usage

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type `Weather: View/Update Weather`
3. Enter city name (default: Haidian)

Click weather in status bar to change city.

## Configuration

Settings → Extensions → Weather Extension:

- `weather.key` - QWeather API key ([Get free key](https://console.qweather.com/setting))
- `weather.language` - Display language (default: `en`)
- `weather.position` - Status bar position: `left` or `right` (default: `left`)
- `weather.autoUpdate` - Auto-update enabled (default: `true`)
- `weather.showLifeIndex` - Show life index (default: `true`)

## Supported Languages

Chinese (Simplified/Traditional), English, Uighur, German, Spanish, French, Italian, Japanese, Korean, Russian, Hindi, Thai, Arabic, Portuguese, Bengali, Malay, Dutch, Greek, Latin, Swedish, Indonesian, Polish, Turkish, Czech, Estonian, Vietnamese, Filipino, Finnish, Hebrew, Icelandic, Norwegian

## License

WTFPL - See [LICENSE.md](LICENSE.md)

---

**Made with ❤️ for developers who code in any weather**

Special thanks to [chendonming/weather](https://github.com/chendonming/weather) for the original implementation.
