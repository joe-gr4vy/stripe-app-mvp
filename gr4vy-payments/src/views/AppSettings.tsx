import {
    Banner,
    Box,
    Button,
    Divider,
    Icon,
    Link,
    SettingsView,
    TextField,
} from "@stripe/ui-extension-sdk/ui";
import { useStorage } from "@stripe/ui-extension-sdk/data";

const AppSettings = () => {
    const [instanceId, setInstanceId] = useStorage("gr4vy_instance_id");

    const sandboxUrl = instanceId
        ? `https://sandbox.${instanceId}.gr4vy.app`
        : undefined;
    const productionUrl = instanceId
        ? `https://${instanceId}.gr4vy.app`
        : undefined;

    return (
        <SettingsView>
            <Box css={{ padding: "large", stack: "y", gap: "xlarge" }}>

                <Banner
                    type="default"
                    title="Connect Gr4vy to Stripe"
                    description={
                        <Box css={{ stack: "y", gap: "small" }}>
                            <Box>
                                Gr4vy is a payment orchestration platform that routes
                                transactions across 400+ payment methods.{" "}
                                <Link href="https://gr4vy.com" target="_blank" external>
                                    Learn more
                                </Link>
                            </Box>
                            <Box css={{ stack: "y", gap: "xsmall", marginTop: "xsmall" }}>
                                <Box css={{ stack: "x", gap: "small" }}>
                                    <Box>🔑</Box>
                                    <Box>1. Click <Box css={{ fontWeight: "semibold" }}>View API Keys</Box> above</Box>
                                </Box>
                                <Box css={{ stack: "x", gap: "small" }}>
                                    <Box>⚙️</Box>
                                    <Box>2. Under <Box css={{ fontWeight: "semibold" }}>Restricted key</Box>, click <Box css={{ fontWeight: "semibold" }}>Generate new key</Box></Box>
                                </Box>
                                <Box css={{ stack: "x", gap: "small" }}>
                                    <Box>📋</Box>
                                    <Box>3. Copy it immediately — Stripe only shows it once</Box>
                                </Box>
                                <Box css={{ stack: "x", gap: "small" }}>
                                    <Box>✅</Box>
                                    <Box>4. Paste into your Gr4vy dashboard under <Box css={{ fontWeight: "semibold" }}>Settings &gt; Connectors</Box></Box>
                                </Box>
                            </Box>
                        </Box>
                    }
                />

                <Divider />

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
