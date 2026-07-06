import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Divider,
    Icon,
    SettingsView,
} from "@stripe/ui-extension-sdk/ui";
import { clipboardWriteText, showToast } from "@stripe/ui-extension-sdk/utils";
import { fetchAppEmbeddedKey } from "@stripe/ui-extension-sdk/utils/api/fetchAppEmbeddedKey";

const AppSettings = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);

    useEffect(() => {
        fetchAppEmbeddedKey().then(setApiKey);
    }, []);

    const handleCopy = async () => {
        if (!apiKey) return;
        await clipboardWriteText(apiKey);
        await showToast("API key copied to clipboard", { type: "success" });
    };

    return (
        <SettingsView>
            <Box css={{ padding: "large" }}>
                <Box
                    css={{
                        font: "heading",
                        stack: "x",
                        alignY: "center",
                        gap: "small",
                        marginBottom: "small",
                    }}
                >
                    <Icon name="personWithKey" />
                    Your Gr4vy API Key
                </Box>

                <Box css={{ font: "body", marginBottom: "xsmall" }}>
                    Copy your API key and paste it into your Gr4vy dashboard under
                </Box>
                <Box css={{ font: "bodyEmphasized", marginBottom: "medium" }}>
                    Settings &gt; Connectors
                </Box>

                <Box
                    css={{
                        stack: "x",
                        alignY: "center",
                        gap: "small",
                        padding: "medium",
                        borderRadius: "medium",
                        backgroundColor: "container",
                        marginBottom: "medium",
                    }}
                >
                    <Box
                        css={{
                            font: "body",
                            overflow: "auto",
                            width: "fill",
                        }}
                    >
                        {apiKey ?? "Loading…"}
                    </Box>
                    <Button
                        type="secondary"
                        disabled={!apiKey}
                        onPress={handleCopy}
                    >
                        <Icon name="clipboard" />
                        Copy
                    </Button>
                </Box>

                <Divider />

                <Box
                    css={{
                        font: "heading",
                        marginTop: "medium",
                        marginBottom: "small",
                    }}
                >
                    Open Gr4vy Dashboard
                </Box>

                <Box css={{ stack: "x", gap: "small" }}>
                    <Button
                        type="primary"
                        target="_blank"
                        href="https://sandbox.dashboard.gr4vy.com"
                    >
                        Open Sandbox Dashboard
                        <Icon name="external" />
                    </Button>
                    <Button
                        target="_blank"
                        href="https://dashboard.gr4vy.com"
                    >
                        Open Production Dashboard
                        <Icon name="external" />
                    </Button>
                </Box>
            </Box>
        </SettingsView>
    );
};

export default AppSettings;
