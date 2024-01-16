import { NotebookText, Search } from "lucide-react";
import { TabsList, TabsTrigger } from "../ui/tabs";

export default function AppTabs() {
  return (
    <TabsList className="rounded-md flex justify-between space-x-2 mb-5 px-6">
      <TabsTrigger value="find-id" className="w-full">
        <Search strokeWidth={1.5} className="mr-2 h-4 w-4" />
        Find ID
      </TabsTrigger>

      <TabsTrigger value="extract-id" className="w-full">
        <NotebookText strokeWidth={1.5} className="mr-2 h-4 w-4" />
        Extract ID
      </TabsTrigger>
    </TabsList>
  );
}
