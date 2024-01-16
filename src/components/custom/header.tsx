import { CardHeader } from "../ui/card";

export default function AppHeader() {
  return (
    <CardHeader>
      <h2 className="text-2xl flex justify-center space-x-2 items-center font-bold">
        <img src="shipit.ico" className="w-8 h-8" alt="SHIPIT" />

        <p>FindID</p>
      </h2>
    </CardHeader>
  );
}
