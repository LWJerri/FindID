import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "./components/ui/textarea";

export default function App() {
	const [sourceValue, setSourceValue] = useState("");
	const [scannableValue, setScannableValue] = useState("");
	const [backgroundColor, setBackgroundColor] = useState("bg-gray-200");

	const handleScanButtonClick = () => {
		if (!sourceValue || !scannableValue) return;

		setScannableValue("");

		document.getElementById("scannable")?.focus();

		if (sourceValue.split(",").includes(scannableValue)) {
			setBackgroundColor("bg-green-200");

			new Audio("song.mp3").play();
		} else {
			setBackgroundColor("bg-red-200");
		}
	};

	const handleEnterPress = (e: { key: string }) => {
		if (e.key === "Enter") {
			handleScanButtonClick();
		}
	};

	return (
		<main className={`flex items-center justify-center h-screen ${backgroundColor}`}>
			<Card className="w-full max-w-md mx-4">
				<CardHeader>
					<h2 className="text-2xl font-semibold text-center">FindID | Container & Items</h2>
				</CardHeader>

				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="source">A list of IDs to be found</Label>

							<Textarea
								id="source"
								placeholder="B0BZHCQ6PF,B0CHBRJCDV"
								value={sourceValue}
								onChange={(e) => setSourceValue(e.target.value.replace(/ /g, ""))}
								onKeyPress={handleEnterPress}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="scannable">Current ID</Label>

							<Input
								id="scannable"
								placeholder="B0CHBRJCDV"
								type="text"
								value={scannableValue}
								onChange={(e) => setScannableValue(e.target.value.replace(/ /g, ""))}
								onKeyPress={handleEnterPress}
							/>
						</div>

						<Button className="w-full" onClick={handleScanButtonClick}>
							Compare
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
