# Weather Extension for VS Code

Display current weather and forecasts in the VS Code status bar.

## Features

- First-time setup wizard
- Status bar weather display (left/right corner)
- Worldwide city support
- Real-time updates
- 3-day forecast
- Life index information
- Live configuration updates (no restart required)
- Multi-language support (32+ languages)

## Setup

On first install, the setup wizard will guide you through configuration:
1. Language selection
2. Status bar position
3. Auto-update (every 2 hours)
4. Life index display
5. API configuration

You can skip the wizard and configure everything later in VS Code settings.

## Configuration

Get your API key at [QWeather Console](https://console.qweather.com/setting).

### Settings

All settings can be changed in VS Code Settings (File → Preferences → Settings → Extensions → Weather Extension):

- `weather.key`: Your QWeather API key
- `weather.apiUrl`: Weather API server URL (default: `https://devapi.qweather.com`)
- `weather.language`: Display language - supports 32+ languages (default: `en`)
- `weather.position`: Status bar position - `left` or `right` (default: `left`)
- `weather.autoUpdate`: Enable automatic weather updates every 2 hours (default: `true`)
- `weather.showLifeIndex`: Show life index information (default: `true`)

Changes take effect immediately.

## Usage

1. Follow the setup wizard on first install
2. Run command `Weather: View/Update Weather` (Ctrl+Shift+P / Cmd+Shift+P)
3. Click weather display in status bar to change city
4. Configure in Settings → Extensions → Weather Extension

### Commands

- `Weather: View/Update Weather` - Display or refresh weather
- `Weather: Change City` - Change city
- `Weather: Run Setup Wizard` - Re-run setup wizard

## Supported Languages

<!-- Simplified Chinese (zh), Traditional Chinese (zh-hant), English (en), Uighur (ug), German (de), Spanish (es), French (fr), Italian (it), Japanese (ja), Korean (ko), Russian (ru), Hindi (hi), Thai (th), Arabic (ar), Portuguese (pt), Bengali (bn), Malay (ms), Dutch (nl), Greek (el), Latin (la), Swedish (sv), Indonesian (id), Polish (pl), Turkish (tr), Czech (cs), Estonian (et), Vietnamese (vi), Filipino (fil), Finnish (fi), Hebrew (he), Icelandic (is), Norwegian (nb) -->

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

This project is licensed under the WTFPL (Do What The F**k You Want To Public License).
See [LICENSE.md](LICENSE.md) for details.

## Acknowledgments

Special thanks to [chendonming/weather](https://github.com/chendonming/weather) for the original implementation.
