# CHANGELOG

All notable changes to the Weather Extension will be documented in this file.

## [1.2.0] - 2025-12-03

### Added
- First-time setup wizard for easy configuration on initial install
- Support for Uyghur language (ug)
- Command to re-run setup wizard at any time
- Automatic https:// prefix for API URLs
- Proper title case formatting for English location names (e.g., "Haidian" instead of "HAIDIAN")
- Live configuration updates - settings now apply immediately without restart
- Configuration change listener for reactive updates

### Changed
- All 32+ QWeather languages now available in settings dropdown
- Settings descriptions updated to reflect immediate effect
- Refactored configuration loading to be dynamic instead of module-level
- Improved Promise handling (removed async Promise executor anti-pattern)
- Updated ESLint configuration to ESLint 9 format

### Fixed
- Configuration loading issues - settings now read dynamically
- Language inconsistency between extension and weather API
- Duplicate module exports
- Parameter name conflicts in weather command
- Auto-update interval now properly cleans up and restarts when settings change

## [1.1.4]

### Added
- Custom API URL configuration
- Language selection (31 languages supported)
- Warning about default API expiration

## [1.1.0]

### Added
- Life index display

## [1.0.4]

### Added
- Auto-update weather configuration

## [1.0.2]

### Added
- Support for custom API key
