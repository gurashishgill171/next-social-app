import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <form>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search here..."
          name="query"
          className="w-[20rem]"
        />
        <SearchIcon className="text-md absolute right-1.5 top-1.5 text-muted-foreground" />
      </div>
    </form>
  );
}
