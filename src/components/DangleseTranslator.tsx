import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const phraseMap: Record<string, string> = {
  "lemon tart": "edgy",
  "wee": "small",
  "buttoned up": "carefully planned",
  "extraneous": "irrelevant",
};

function translate(input: string, toEnglish: boolean): string {
  const map = toEnglish ? phraseMap : Object.fromEntries(
    Object.entries(phraseMap).map(([k, v]) => [v, k])
  );

  let translated = input;
  for (const [key, value] of Object.entries(map)) {
    const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'gi');
    translated = translated.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return value[0].toUpperCase() + value.slice(1);
      }
      return value;
    });
  }

  return translated === input ? "No known phrases found to translate." : translated;
}

export default function DangleseTranslator() {
  const [input, setInput] = useState("");
  const [toEnglish, setToEnglish] = useState(true);
  const [output, setOutput] = useState("");

  const handleTranslate = () => {
    setOutput(translate(input, toEnglish));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Danglese Phrase Translator</h1>
      <div className="flex items-center justify-between">
        <span>Danglese ➝ English</span>
        <Switch checked={toEnglish} onCheckedChange={setToEnglish} />
        <span>English ➝ Danglese</span>
      </div>
      <Input
        placeholder="Enter a phrase..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleTranslate}>Translate</Button>
      {output && (
        <Card>
          <CardContent className="p-4 text-lg font-medium">
            {output}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
