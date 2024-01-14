import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function FindIDTab({ bg }: { bg: Function }) {
  const [sourceValue, setSourceValue] = useState("");

  const [scannedValue, setScannedValue] = useState("");
  const [previousScannedValue, setPreviousScannedValue] = useState("");

  const handleScanButton = () => {
    if (!sourceValue || !scannedValue) return;

    const sourceValueIDs = sourceValue.match(scannedValue);

    if (sourceValueIDs) {
      bg("bg-green-200");

      new Audio("song.wav").play();
    } else {
      bg("bg-red-200");
    }

    setPreviousScannedValue(scannedValue);
    setScannedValue("");

    document.getElementById("scanned")!.focus();
  };

  const handleEnterKey = (e: { key: string }) => {
    if (e.key !== "Enter") return;

    handleScanButton();
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="source">Content that containts IDs*</Label>

          <Textarea id="source" value={sourceValue} onChange={(e) => setSourceValue(e.target.value)} />

          <p className="text-xs text-gray-500">*For example, it could be one or more codes or a message from Chime.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="scanned">Scanned ID</Label>

          <Input
            id="scanned"
            placeholder={previousScannedValue}
            type="text"
            value={scannedValue}
            onChange={(e) => setScannedValue(e.target.value.replace(/ /g, ""))}
            onKeyDown={handleEnterKey}
          />
        </div>

        <Button className="w-full" onClick={handleScanButton}>
          Find
        </Button>
      </div>
    </CardContent>
  );
}
