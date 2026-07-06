import { useEffect, useState } from "react";
import {
    Banner,
    Box,
    Button,
    Divider,
    Icon,
    SettingsView,
    TextField,
} from "@stripe/ui-extension-sdk/ui";
import { clipboardWriteText, showToast } from "@stripe/ui-extension-sdk/utils";
import { fetchAppEmbeddedKey } from "@stripe/ui-extension-sdk/utils/api/fetchAppEmbeddedKey";
import { useStorage } from "@stripe/ui-extension-sdk/data";

const AppSettings = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [instanceId, setInstanceId] = useStorage("gr4vy_instance_id");

    useEffect(() => {
        fetchAppEmbeddedKey().then(setApiKey);
    }, []);

    const handleCopy = async () => {
        if (!apiKey) return;
        await clipboardWriteText(apiKey);
        await showToast("API key copied to clipboard", { type: "success" });
    };

    const sandboxUrl = instanceId
        ? `https://sandbox.${instanceId}.gr4vy.app`
        : undefined;
    const productionUrl = instanceId
        ? `https://${instanceId}.gr4vy.app`
        : undefined;

    return (
        <SettingsView>
            <Box css={{ padding: "large", stack: "y", gap: "xlarge" }}>

                {/* Banner */}
                <Banner
                    type="default"
                    title="Connect Gr4vy to Stripe"
                    description="Gr4vy is a payment orchestration platform that routes transactions across 400+ payment methods. Configure your instance below and copy your restricted API key into the Gr4vy dashboard to complete setup."
                />

                {/* API key */}
                <Box css={{ stack: "y", gap: "medium" }}>
                    <Box css={{ font: "subheading" }}>Your restricted API key</Box>
                    <Box css={{ font: "body" }}>
                        Copy your API key and paste it into your Gr4vy dashboard under Settings &gt; Connectors.
                    </Box>

                    <Box
                        css={{
                            stack: "x",
                            alignY: "center",
                            gap: "small",
                            padding: "medium",
                            borderRadius: "medium",
                            backgroundColor: "container",
                        }}
                    >
                        <Box css={{ font: "body", overflow: "auto", width: "fill" }}>
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
                </Box>

                <Divider />

                {/* Dashboard links */}
                <Box css={{ stack: "y", gap: "medium" }}>
                    <Box css={{ font: "subheading" }}>Open Gr4vy dashboard</Box>

                    <TextField
                        label="Instance ID"
                        description="Your Gr4vy instance name, e.g. acme"
                        placeholder="acme"
                        value={instanceId ?? ""}
                        onChange={(e) => setInstanceId(e.target.value)}
                        css={{ width: "fill" }}
                    />

                    <Box css={{ stack: "x", gap: "small" }}>
                        <Button
                            type="primary"
                            target="_blank"
                            href={sandboxUrl}
                            disabled={!instanceId}
                        >
                            Open Sandbox Dashboard
                            <Icon name="external" />
                        </Button>
                        <Button
                            target="_blank"
                            href={productionUrl}
                            disabled={!instanceId}
                        >
                            Open Production Dashboard
                            <Icon name="external" />
                        </Button>
                    </Box>
                </Box>

            </Box>
        </SettingsView>
    );
};

export default AppSettings;
