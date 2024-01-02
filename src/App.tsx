import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "./components/ui/textarea";

export default function App() {
  const [sourceValue, setSourceValue] = useState("");
  const [scannedValue, setScannedValue] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("bg-slate-200");

  const handleScanButton = () => {
    if (!sourceValue || !scannedValue) return;

    const sourceValueIDs = sourceValue.match(scannedValue);

    if (sourceValueIDs) {
      setBackgroundColor("bg-green-200");

      new Audio("song.mp3").play();
    } else {
      setBackgroundColor("bg-red-200");
    }

    setScannedValue("");

    document.getElementById("scanned")!.focus();
  };

  const handleEnterKey = (e: { key: string }) => {
    if (e.key !== "Enter") return;

    handleScanButton();
  };

  const sourceArea = document.getElementById("source");

  if (sourceArea) {
    sourceArea.oninput = function () {
      sourceArea.style.height = "";

      sourceArea.style.height = sourceArea.scrollHeight + 5 + "px";
    };
  }

  return (
    <main className={`flex items-center justify-center min-h-screen ${backgroundColor}`}>
      <Card className="w-full max-w-md mx-4 my-5 bg-white shadow-md">
        <CardHeader>
          <h2 className="text-2xl flex justify-center space-x-2 items-center font-bold">
            <img src="shipit.png" className="w-8 h-8" alt="SHIPIT" />

            <p>FindID</p>
          </h2>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source">A list of IDs to be found</Label>

              <Textarea
                id="source"
                placeholder="It can be just one code or a list of codes or message with codes from Chime"
                value={sourceValue}
                onChange={(e) => setSourceValue(e.target.value)}
                onKeyDown={handleEnterKey}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scanned">Scanned ID</Label>

              <Input
                id="scanned"
                placeholder="tsX02seph9f"
                type="text"
                value={scannedValue}
                onChange={(e) => setScannedValue(e.target.value.replace(/ /g, ""))}
                onKeyDown={handleEnterKey}
              />
            </div>

            <Button className="w-full" onClick={handleScanButton}>
              Find
            </Button>

            <div className="flex justify-between">
              <p className="text-xs text-gray-500">Made with ❤️ by kuhandri</p>

              <a
                className="text-xs text-gray-500 hover:underline"
                href="https://github.com/LWJerri/FindID"
                target="_blank"
              >
                Source code
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
