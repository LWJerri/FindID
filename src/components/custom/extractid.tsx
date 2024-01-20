import { ChangeEvent, type MouseEvent, useId, useState } from "react";
import { Markup } from "interweave";
import { clsx } from "clsx";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { CardContent } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const AVAILABLE_CHOICES: {
  [key: string]: {
    regexp: RegExp;
    name: string
  }
} = {
  "pod-location": { name: "Pod Location", regexp: new RegExp(/P-\d-\w\d{3}\w\d{3}/gm) }, // P-1-A123A123
  container: { name: "tsX Code", regexp: new RegExp(/tsX\w{8}/gm) }, //tsX12345678
  "b0-code": { name: "B0 Code", regexp: new RegExp(/B0.{8}/gm) }, // B0BZHFLKC2,
  "x001-code": { name: "X001 Code", regexp: new RegExp(/X001.{6}/gm) }, // X001ECK9T3
  "dz-P-A": { name: "dz-P-A Code", regexp: new RegExp(/dz-P-A\d{4}/gm) }, // dz-P-A1234
};
const availableChoicesKeys = Object.keys(AVAILABLE_CHOICES);

export function ExtractIdTab() {
  const [sourceValue, setSourceValue] = useState("");
  const [extractor, setExtractor] = useState("");
  const [extractedValues, setExtractedValues] = useState<string[]>([]);

  const sourceId = useId();
  const extractorId = useId();
  const resultId = useId();

  const handleChangeSourceValue = (ev: ChangeEvent<HTMLTextAreaElement>) => setSourceValue(ev.target.value);

  const handleChangeExtractValues = (ev: MouseEvent<HTMLButtonElement>) => {
    const value = ev.currentTarget.value;
    setExtractor(value);

    const getDataFromSource = sourceValue.match(AVAILABLE_CHOICES[value].regexp);
    if (!getDataFromSource) {
      return setExtractedValues([]);
    }

    setExtractedValues([...new Set(getDataFromSource)]);
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={sourceId}>Content that contains IDs*</Label>
          <Textarea id={sourceId} value={sourceValue} onChange={handleChangeSourceValue} />

          <p className="text-xs text-gray-500">
            *For example, it could be a message from Chime or just copied text from FC Research.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={extractorId}>What type IDs need to extract?</Label>

          <RadioGroup id={extractorId}>
            {availableChoicesKeys.map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={key}
                  id={`choice-${key}`}
                  onClick={handleChangeExtractValues}
                  checked={extractor === key}
                />
                <Label htmlFor={`choice-${key}`}>{AVAILABLE_CHOICES[key].name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className={clsx("space-y-2", extractedValues.length ? "block" : "hidden")}>
          <Label htmlFor={resultId}>Result of extracting*</Label>

          <div id={resultId}>
            <Markup content={extractedValues.join("<br />")} />
          </div>

          <p className="text-xs text-gray-500">*Duplicate codes have been deleted</p>
        </div>
      </div>
    </CardContent>
  );
}
