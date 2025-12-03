# Weather Extension for VS Code

<div align="center">

[![Publish to VS Code Marketplace](https://github.com/erbanku/weather-extension-for-code/actions/workflows/publish.yml/badge.svg)](https://github.com/erbanku/weather-extension-for-code/actions/workflows/publish.yml)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/erbanku.weather-for-code?style=flat&label=VS%20Code%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=erbanku.weather-for-code)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/erbanku.weather-for-code?style=flat&label=Downloads)](https://marketplace.visualstudio.com/items?itemName=erbanku.weather-for-code)
[![License](https://img.shields.io/badge/license-WTFPL-blue.svg)](LICENSE.md)

*Stay informed about the weather without leaving your code editor!*

[Features](#features) • [Installation](#installation) • [Configuration](#configuration) • [Usage](#usage) • [Languages](#supported-languages)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

🌍 **Worldwide Coverage**
- Support for cities globally
- Real-time weather data
- 3-day forecast

</td>
<td width="50%">

⚙️ **Easy Setup**
- First-time setup wizard
- Intuitive configuration
- No restart required

</td>
</tr>
<tr>
<td width="50%">

🎨 **Customizable Display**
- Left or right status bar position
- Show/hide life index
- Auto-update every 2 hours

</td>
<td width="50%">

🌐 **Multi-language**
- 32+ languages supported
- Instant language switching
- Native weather data localization

</td>
</tr>
</table>

## 📦 Installation

1. Open VS Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Type: `ext install erbanku.weather-for-code`
4. Press Enter

Or install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=erbanku.weather-for-code).

## 🚀 Quick Start

On first install, the setup wizard will guide you through configuration:
1. Language selection
2. Status bar position
3. Auto-update (every 2 hours)
4. Life index display
4. Life index display
5. API configuration (optional)

You can skip the wizard and configure everything later in VS Code settings.

## ⚙️ Configuration

> 💡 **Tip**: Get your free API key at [QWeather Console](https://console.qweather.com/setting) for better reliability.

### Available Settings

All settings can be changed in **VS Code Settings** (`File → Preferences → Settings → Extensions → Weather Extension`):

| Setting | Description | Default |
|---------|-------------|---------|
| `weather.key` | Your QWeather API key | *(provided)* |
| `weather.apiUrl` | Weather API server URL | `https://devapi.qweather.com` |
| `weather.language` | Display language (32+ supported) | `en` |
| `weather.position` | Status bar position (`left` or `right`) | `left` |
| `weather.autoUpdate` | Auto-update every 2 hours | `true` |
| `weather.showLifeIndex` | Show life index information | `true` |

💫 **Changes take effect immediately** - no restart required!
1. Follow the setup wizard on first install (or skip and configure later)
2. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type: `Weather: View/Update Weather`
4. Enter your city name (default: Haidian)
5. Weather appears in the status bar! ☀️

**Quick Actions:**
- Click the weather display to change city
- Weather auto-updates every 2 hours (if enabled)

### 🎯 Available Commands
## 🌐 Supported Languages

<details>
<summary>Click to expand (32+ languages)</summary>

- 🇨🇳 **Simplified Chinese** (zh)
- 🇹🇼 **Traditional Chinese** (zh-hant)
- 🇺🇸 **English** (en)
- 🇨🇳 **Uighur** (ug)
- 🇩🇪 **German** (de)
- 🇪🇸 **Spanish** (es)
- 🇫🇷 **French** (fr)
- 🇮🇹 **Italian** (it)
- 🇯🇵 **Japanese** (ja)
- 🇰🇷 **Korean** (ko)
- 🇷🇺 **Russian** (ru)
- 🇮🇳 **Hindi** (hi)
- 🇹🇭 **Thai** (th)
- 🇸🇦 **Arabic** (ar)
- 🇵🇹 **Portuguese** (pt)
- 🇧🇩 **Bengali** (bn)
- 🇲🇾 **Malay** (ms)
- 🇳🇱 **Dutch** (nl)
- 🇬🇷 **Greek** (el)
- 🏛️ **Latin** (la)
- 🇸🇪 **Swedish** (sv)
- 🇮🇩 **Indonesian** (id)
- 🇵🇱 **Polish** (pl)
- 🇹🇷 **Turkish** (tr)
- 🇨🇿 **Czech** (cs)
- 🇪🇪 **Estonian** (et)
- 🇻🇳 **Vietnamese** (vi)
- 🇵🇭 **Filipino** (fil)
- 🇫🇮 **Finnish** (fi)
- 🇮🇱 **Hebrew** (he)
- 🇮🇸 **Icelandic** (is)
- 🇳🇴 **Norwegian** (nb)

</details>

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## 📄 License

This project is licensed under the **WTFPL** (Do What The F**k You Want To Public License).
See [LICENSE.md](LICENSE.md) for details.

## 🙏 Acknowledgments

Special thanks to [chendonming/weather](https://github.com/chendonming/weather) for the original implementation.

---

<div align="center">

**Made with ❤️ for developers who code in any weather**

⭐ Star this repo if you find it useful! ⭐

</div>
See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

This project is licensed under the WTFPL (Do What The F**k You Want To Public License).
See [LICENSE.md](LICENSE.md) for details.

## Acknowledgments

Special thanks to [chendonming/weather](https://github.com/chendonming/weather) for the original implementation.
