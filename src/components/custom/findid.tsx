import { type ChangeEvent, type KeyboardEvent, useId, useRef, useState } from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";

interface Props {
  bg: (data: string) => void;
}

export function FindIDTab({ bg }: Props) {
  const [sourceValue, setSourceValue] = useState("");
  const [scannedValue, setScannedValue] = useState("");
  const [previousScannedValue, setPreviousScannedValue] = useState("");

  const scannedRef = useRef<HTMLDivElement>(null);

  const sourceId = useId();
  const scannedId = useId();

  const handleScanButton = () => {
    if (!sourceValue || !scannedValue) return;

    const sourceValueIDs = sourceValue.match(scannedValue);

    if (sourceValueIDs) {
      bg("bg-green-200");

      const audio = new Audio();
      void audio.play();
    } else {
      bg("bg-red-200");
    }

    setPreviousScannedValue(scannedValue);
    setScannedValue("");

    if (!scannedRef.current) return;
    scannedRef.current.focus();
  };

  const handleEnterKey = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return;

    handleScanButton();
  };

  const handleChangeSourceValue = (ev: ChangeEvent<HTMLTextAreaElement>) => setSourceValue(ev.target.value);
  const handleChangeScannedValue = (ev: ChangeEvent<HTMLInputElement>) => {
    setScannedValue(ev.target.value.replace(/ /g, ""));
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={sourceId}>Content that contains IDs*</Label>

          <Textarea id={sourceId} value={sourceValue} onChange={handleChangeSourceValue} />

          <p className="text-xs text-gray-500">
            *For example, it could be one or more codes or a message from Chime.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={scannedId}>Scanned ID</Label>

          <Input
            id={scannedId}
            placeholder={previousScannedValue}
            type="text"
            value={scannedValue}
            onChange={handleChangeScannedValue}
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
