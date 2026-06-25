import { DropExperience } from "@/components/drop-experience";
import { currentDrop } from "@/modules/drop/demo-data";

export default function HomePage() {
  return <DropExperience drop={currentDrop} />;
}
