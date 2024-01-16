import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { emit } from "@tauri-apps/api/event";
import { useState } from "react";
import { onEventShowMenu } from "tauri-plugin-context-menu";
import { ExtractIdTab } from "./components/custom/extractid";
import { FindIDTab } from "./components/custom/findid";
import Footer from "./components/custom/footer";
import AppHeader from "./components/custom/header";
import AppTabs from "./components/custom/list";
import { Card } from "./components/ui/card";

if (window?.__TAURI_METADATA__) {
  onEventShowMenu("contextmenu", async () => ({
    items: [
      {
        label: "Reload window",

        event() {
          location.reload();
        },
      },
      {
        label: "Check for updates",
        async event() {
          await emit("tauri://update");
        },
      },
    ],
  }));
}

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState("bg-slate-200");

  const updateBackgroundColor = (data: string) => {
    setBackgroundColor(data);
  };

  return (
    <main className={`flex items-center justify-center min-h-screen ${backgroundColor}`}>
      <Card className="w-full max-w-md my-5 bg-white shadow-md">
        <AppHeader />

        <Tabs defaultValue="find-id" className="w-[400px] mx-auto">
          <AppTabs />

          <TabsContent value="find-id">
            <FindIDTab bg={updateBackgroundColor} />
          </TabsContent>

          <TabsContent value="extract-id">
            <ExtractIdTab />
          </TabsContent>
        </Tabs>

        <Footer />
      </Card>
    </main>
  );
}
