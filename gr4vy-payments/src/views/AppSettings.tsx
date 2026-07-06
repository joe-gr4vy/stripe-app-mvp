import {
    Banner,
    Box,
    Button,
    Divider,
    Icon,
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
                    description="Gr4vy is a payment orchestration platform that routes transactions across 400+ payment methods. Copy the restricted API key shown above and paste it into your Gr4vy dashboard under Settings > Connectors to complete setup."
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
