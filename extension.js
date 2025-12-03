// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const weather = require("./weather");

// Get configuration dynamically
function getConfig() {
    const config = vscode.workspace.getConfiguration("weather");
    return {
        autoUpdate: config.get("autoUpdate"),
        showLifeIndex: config.get("showLifeIndex"),
        position:
            config.get("position") === "left"
                ? vscode.StatusBarAlignment.Left
                : vscode.StatusBarAlignment.Right,
        language: config.get("language") || "en",
        key: config.get("key"),
        apiUrl: config.get("apiUrl"),
    };
}

// Localization strings
const strings = {
    zh: {
        enterCity: "输入城市名( 中国/全球 )",
        selectLocation: "选择一个地区",
        currentConditions: "当前实况",
        tomorrowForecast: "明日预报",
        minTemp: "最低温度",
        maxTemp: "最高温度",
        day: "白天",
        night: "晚上",
        lifeIndex: "生活指数",
        lifeIndexLevel: "生活指数等级",
        requestError: "Weather: 请求错误",
        setupWelcome: "欢迎使用天气扩展！让我们进行设置。",
        setupLanguage: "选择显示语言",
        setupPosition: "选择状态栏位置",
        setupAutoUpdate: "启用自动更新（每2小时）",
        setupShowLifeIndex: "显示生活指数",
        setupApiKey: "输入您的和风天气 API 密钥（可选，按 Enter 跳过）",
        setupApiUrl: "输入 API URL（可选，按 Enter 使用默认值）",
        setupComplete: "设置完成！正在加载天气...",
        openSettings: "打开设置",
        yes: "是",
        no: "否",
        left: "左侧",
        right: "右侧",
        apiKeyWarning:
            "警告：默认 API 密钥即将过期。建议您配置自己的 API 密钥。",
        configureNow: "立即配置",
        later: "稍后",
    },
    ug: {
        enterCity: "شەھەر نامىنى كىرگۈزۈڭ (جۇڭگو/دۇنيا)",
        selectLocation: "بىر جاينى تاللاڭ",
        currentConditions: "ھازىرقى ھاۋارايى",
        tomorrowForecast: "ئەتە",
        minTemp: "ئەڭ تۆۋەن",
        maxTemp: "ئەڭ يۇقىرى",
        day: "كۈندۈز",
        night: "كېچە",
        lifeIndex: "تۇرمۇش كۆرسەتكۈچى",
        lifeIndexLevel: "تۇرمۇش كۆرسەتكۈچ دەرىجىسى",
        requestError: "ھاۋارايى: خاتالىق كۆرۈلدى",
        setupWelcome: "ھاۋارايى كېڭەيتمىسىگە خۇش كەپسىز! سەپلەيلى.",
        setupLanguage: "كۆرسىتىش تىلىنى تاللاڭ",
        setupPosition: "ھالەت بالداق ئورنىنى تاللاڭ",
        setupAutoUpdate: "ئاپتوماتىك يېڭىلاشنى قوزغىتىش (ھەر 2 سائەت)",
        setupShowLifeIndex: "تۇرمۇش كۆرسەتكۈچنى كۆرسىتىش",
        setupApiKey:
            "QWeather API ئاچقۇچىڭىزنى كىرگۈزۈڭ (تاللاش، Enter بېسىپ ئاتلاڭ)",
        setupApiUrl:
            "API URL كىرگۈزۈڭ (تاللاش، Enter بېسىپ كۆڭۈلدىكىنى ئىشلىتىڭ)",
        setupComplete: "سەپلەش تامام! ھاۋارايى يۈكلىنىۋاتىدۇ...",
        openSettings: "تەڭشەكلەرنى ئېچىش",
        yes: "شۇنداق",
        no: "ياق",
        left: "سول",
        right: "ئوڭ",
        apiKeyWarning:
            "ئاگاھلاندۇرۇش: كۆڭۈلدىكى API ئاچقۇچىنىڭ ۋاقتى توشماقچى. ئۆزىڭىزنىڭ API ئاچقۇچىنى سەپلىشىڭىزنى تەۋسىيە قىلىمىز.",
        configureNow: "ھازىر سەپلەش",
        later: "كېيىن",
    },
    en: {
        enterCity: "Enter city name (China/Global)",
        selectLocation: "Select a location",
        currentConditions: "Current Conditions",
        tomorrowForecast: "Tomorrow: Min",
        minTemp: "Min",
        maxTemp: "Max",
        day: "Day",
        night: "Night",
        lifeIndex: "Life Index",
        lifeIndexLevel: "Life Index Level",
        requestError: "Weather: Request Error",
        setupWelcome: "Welcome to Weather Extension! Let's set it up.",
        setupLanguage: "Select display language",
        setupPosition: "Choose status bar position",
        setupAutoUpdate: "Enable auto-update (every 2 hours)",
        setupShowLifeIndex: "Show life index",
        setupApiKey:
            "Enter your QWeather API key (optional, press Enter to skip)",
        setupApiUrl: "Enter API URL (optional, press Enter to use default)",
        setupComplete: "Setup complete! Loading weather...",
        openSettings: "Open Settings",
        yes: "Yes",
        no: "No",
        left: "Left",
        right: "Right",
        apiKeyWarning:
            "Warning: The default API key will expire soon. It's recommended to configure your own API key.",
        configureNow: "Configure Now",
        later: "Later",
    },
};

function t(key) {
    const lang = getConfig().language;
    return strings[lang] && strings[lang][key]
        ? strings[lang][key]
        : strings["en"][key];
}

// Helper function to ensure API URL has protocol
function normalizeApiUrl(url) {
    if (!url) return url;
    url = url.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url;
    }
    return url;
}

// Helper function to format location name with proper case
function formatLocationName(name) {
    // For English names, convert to title case (e.g., HAIDIAN -> Haidian)
    if (!/[\u4e00-\u9fa5]/.test(name)) {
        // No Chinese characters, format as title case
        return name
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    }
    // Keep Chinese names as-is
    return name;
}

// First-time setup wizard
async function runSetupWizard(context) {
    const config = vscode.workspace.getConfiguration("weather");

    // Language selection
    const langChoice = await vscode.window.showQuickPick(
        [
            { label: "English (US)", value: "en" },
            { label: "简体中文 (Simplified Chinese)", value: "zh" },
            { label: "ئۇيغۇرچە (Uighur)", value: "ug" },
            { label: "Español (Spanish)", value: "es" },
            { label: "Français (French)", value: "fr" },
            { label: "Deutsch (German)", value: "de" },
            { label: "日本語 (Japanese)", value: "ja" },
            { label: "한국어 (Korean)", value: "ko" },
        ],
        {
            placeHolder: "Select display language / 选择显示语言",
            ignoreFocusOut: true,
        }
    );

    if (langChoice) {
        await config.update(
            "language",
            langChoice.value,
            vscode.ConfigurationTarget.Global
        );

        // Position selection
        const posChoice = await vscode.window.showQuickPick(
            [
                { label: t("left"), value: "left" },
                { label: t("right"), value: "right" },
            ],
            {
                placeHolder: t("setupPosition"),
                ignoreFocusOut: true,
            }
        );

        if (posChoice) {
            await config.update(
                "position",
                posChoice.value,
                vscode.ConfigurationTarget.Global
            );
        }

        // Auto-update selection
        const autoUpdateChoice = await vscode.window.showQuickPick(
            [
                { label: t("yes"), value: true },
                { label: t("no"), value: false },
            ],
            {
                placeHolder: t("setupAutoUpdate"),
                ignoreFocusOut: true,
            }
        );

        if (autoUpdateChoice !== undefined) {
            await config.update(
                "autoUpdate",
                autoUpdateChoice.value,
                vscode.ConfigurationTarget.Global
            );
        }

        // Show life index selection
        const lifeIndexChoice = await vscode.window.showQuickPick(
            [
                { label: t("yes"), value: true },
                { label: t("no"), value: false },
            ],
            {
                placeHolder: t("setupShowLifeIndex"),
                ignoreFocusOut: true,
            }
        );

        if (lifeIndexChoice !== undefined) {
            await config.update(
                "showLifeIndex",
                lifeIndexChoice.value,
                vscode.ConfigurationTarget.Global
            );
        }

        // API key (optional)
        const apiKey = await vscode.window.showInputBox({
            prompt: t("setupApiKey"),
            placeHolder: "e.g., 1234567890abcdef",
            ignoreFocusOut: true,
        });

        if (apiKey && apiKey.trim()) {
            await config.update(
                "key",
                apiKey.trim(),
                vscode.ConfigurationTarget.Global
            );

            // API URL (optional)
            const apiUrl = await vscode.window.showInputBox({
                prompt: t("setupApiUrl"),
                placeHolder: "https://api.qweather.com",
                ignoreFocusOut: true,
            });

            if (apiUrl && apiUrl.trim()) {
                const normalizedUrl = normalizeApiUrl(apiUrl.trim());
                await config.update(
                    "apiUrl",
                    normalizedUrl,
                    vscode.ConfigurationTarget.Global
                );
            }
        }

        // Mark setup as complete
        await context.globalState.update("setupComplete", true);
        vscode.window.showInformationMessage(t("setupComplete"));
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let bar, barNext, barLife;
let updateInterval;
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    // Check if this is first-time setup
    const setupComplete = context.globalState.get("setupComplete");
    if (!setupComplete) {
        await runSetupWizard(context);
    }

    // Warn about default API key
    const config = getConfig();
    if (config.key === "579fbf44a7b24519a9d50e35258c1467") {
        const choice = await vscode.window.showWarningMessage(
            t("apiKeyWarning"),
            t("configureNow"),
            t("later")
        );
        if (choice === t("configureNow")) {
            vscode.commands.executeCommand(
                "workbench.action.openSettings",
                "weather"
            );
        }
    }

    let disposable = vscode.commands.registerCommand(
        "extension.weather",
        async function (customPosition) {
            const config = getConfig();
            const position =
                customPosition !== undefined ? customPosition : config.position;

            let locationId = context.globalState.get("locationId");
            let location = context.globalState.get("location");
            if (!locationId || !location) {
                location = await vscode.window.showInputBox({
                    placeHolder: t("enterCity"),
                    value: "Haidian",
                });
                locationId = await pickLocation(location);
            }
            if (locationId) {
                const now = await getNowWeather(locationId);
                bar ? bar.dispose() : "";
                bar = vscode.window.createStatusBarItem(position);
                bar.text =
                    location.split("-")[0] +
                    " " +
                    now.text +
                    " " +
                    now.temp +
                    "℃";
                bar.tooltip = t("currentConditions");
                bar.command = "extension.replacecity";
                bar.show();

                const nextDay = await getForecast(locationId);
                barNext ? barNext.dispose() : "";
                barNext = vscode.window.createStatusBarItem(position);
                barNext.text = `${nextDay.tempMin}℃~${nextDay.tempMax}℃ ${nextDay.textDay}/${nextDay.textNight}`;
                barNext.tooltip = `${t("tomorrowForecast")} ${
                    nextDay.tempMin
                }℃ ${t("maxTemp")} ${nextDay.tempMax}℃ ${t("day")} ${
                    nextDay.textDay
                }, ${t("night")} ${nextDay.textNight}`;
                barNext.show();

                if (config.showLifeIndex) {
                    const lifeIndex = await getLifeIndex(locationId);
                    barLife ? barLife.dispose() : "";
                    barLife = vscode.window.createStatusBarItem(position);
                    barLife.text = `${t("lifeIndex")}: ${lifeIndex.category}`;
                    barLife.tooltip = `${t("lifeIndexLevel")}: ${
                        lifeIndex.level
                    } ${lifeIndex.text || ""}`;
                    barLife.command = {
                        title: "open",
                        command: "vscode.open",
                        arguments: [vscode.Uri.parse(lifeIndex.fxLink)],
                    };
                    barLife.show();
                }

                context.globalState.update("locationId", locationId);
                context.globalState.update("location", location.split("-")[0]);
            }
        }
    );

    // 更换城市
    let replacecity = vscode.commands.registerCommand(
        "extension.replacecity",
        async function () {
            const location = await vscode.window.showInputBox({
                placeHolder: t("enterCity"),
                value: "Haidian",
            });
            if (location === undefined) {
                return;
            }
            const locationId = await pickLocation(location);
            if (location && locationId) {
                context.globalState.update("locationId", locationId);
                context.globalState.update("location", location.split("-")[0]);
                vscode.commands.executeCommand("extension.weather");
            }
        }
    );

    /**
     * 添加城市
     * @param {number} 位置 left=1 right=2
     */
    let addCity = vscode.commands.registerCommand(
        "extension.addCity",
        async function (position = 2) {
            const location = await vscode.window.showInputBox({
                placeHolder: t("enterCity"),
                value: "Haidian",
            });
            const locationId = await pickLocation(location);
            if (location && locationId) {
                context.globalState.update("locationIdRight", locationId);
                context.globalState.update(
                    "locationRight",
                    location.split("-")[0]
                );
                vscode.commands.executeCommand("extension.weather", position);
            }
        }
    );

    // Setup wizard command
    let setupWizard = vscode.commands.registerCommand(
        "extension.setupWizard",
        async function () {
            await runSetupWizard(context);
            vscode.commands.executeCommand("extension.weather");
        }
    );

    // Initial weather display
    vscode.commands.executeCommand("extension.weather");

    // Setup auto-update with dynamic config
    function setupAutoUpdate() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
        const config = getConfig();
        if (config.autoUpdate) {
            updateInterval = setInterval(function () {
                vscode.commands.executeCommand("extension.weather");
            }, 1000 * 60 * 60 * 2);
        }
    }
    setupAutoUpdate();

    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration("weather")) {
                setupAutoUpdate();
                // Refresh weather display
                vscode.commands.executeCommand("extension.weather");
            }
        })
    );

    context.subscriptions.push(replacecity, disposable, addCity, setupWizard);
}

function getNowWeather(locationId) {
    return weather.nowWeather(locationId).then((now) => {
        if (now.data.code === "200") {
            const res = now.data.now;
            return {
                temp: res.temp,
                text: res.text,
            };
        } else {
            netError();
            throw new Error("Weather API error");
        }
    });
}

function getForecast(locationId) {
    return weather.forecast(locationId).then((now) => {
        if (now.data.code === "200") {
            const res = now.data.daily[0];
            return {
                tempMax: res.tempMax,
                tempMin: res.tempMin,
                textDay: res.textDay,
                textNight: res.textNight,
            };
        } else {
            netError();
            throw new Error("Weather API error");
        }
    });
}

function getLifeIndex(locationId) {
    return weather.getIndices(locationId).then((index) => {
        if (index.data.code === "200") {
            const res = index.data.daily[0];
            return {
                desc: res.text,
                category: res.category,
                level: res.level,
                fxLink: index.data.fxLink,
            };
        } else {
            netError();
            throw new Error("Weather API error");
        }
    });
}

function pickLocation(location) {
    return weather.getLocation(location).then(async (result) => {
        if (result.data.code === "200") {
            const detailLocation = await vscode.window.showQuickPick(
                result.data.location.map(
                    (v) => formatLocationName(v.name) + "-" + v.id
                ),
                {
                    placeHolder: t("selectLocation"),
                }
            );
            if (detailLocation) {
                const locationId = detailLocation.split("-")[1];
                return locationId;
            }
        } else {
            netError();
            throw new Error("Location API error");
        }
    });
}

function netError() {
    vscode.window.showErrorMessage(t("requestError"));
}

// this method is called when your extension is deactivated
function deactivate() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    if (bar) bar.dispose();
    if (barNext) barNext.dispose();
    if (barLife) barLife.dispose();
}

module.exports = {
    activate,
    deactivate,
};
