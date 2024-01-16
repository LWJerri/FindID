import { Markup } from "interweave";
import { useState } from "react";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

export function ExtractIdTab() {
  const [sourceValue, setSourceValue] = useState("");
  const [extractor, setExtractor] = useState("");
  const [extractedValues, setExtractedValues] = useState<Array<string>>([]);

  const AVAILABLE_CHOICES: { [key: string]: { regexp: RegExp; name: string } } = {
    "pod-location": { name: "Pod Location", regexp: new RegExp(/P-\d-\w\d{3}\w\d{3}/gm) }, // P-A123A123
    container: { name: "Container", regexp: new RegExp(/tsX\w{8}/gm) }, //tsX12345678
  };

  const extractValues = (value: string) => {
    setExtractor(value);

    const getDataFromSource = sourceValue.match(AVAILABLE_CHOICES[value].regexp);

    setExtractedValues(getDataFromSource?.length ? [...new Set(getDataFromSource)] : []);
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="source">Content that containts IDs*</Label>

          <Textarea id="source" value={sourceValue} onChange={(e) => setSourceValue(e.target.value)} />

          <p className="text-xs text-gray-500">
            *For example, it could be a message from Chime or just copied text from FC Research.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="extractor">What type IDs need to extract?</Label>

          <RadioGroup id="extractor">
            {Object.keys(AVAILABLE_CHOICES).map((key) => {
              return (
                <div className="flex items-center space-x-2" key={key}>
                  <RadioGroupItem
                    value={key}
                    id={`choice-${key}`}
                    onClick={(e) => extractValues(e.currentTarget.value)}
                    checked={extractor === key}
                  />
                  <Label htmlFor={`choice-${key}`}>{AVAILABLE_CHOICES[key].name}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <div className={`space-y-2 ${extractedValues.length ? "block" : "hidden"}`}>
          <Label htmlFor="result">Result of extracting*</Label>

          <div id="result">
            <Markup content={extractedValues.join("<br />")} />
          </div>

          <p className="text-xs text-gray-500">*Duplicate codes have been deleted</p>
        </div>
      </div>
    </CardContent>
  );
}
