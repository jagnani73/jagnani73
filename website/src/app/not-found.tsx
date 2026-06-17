import Link from "next/link";
import { StatusScreen } from "@/components/shared/status-screen";

const NotFound = () => (
  <StatusScreen
    kicker="ERROR — 404 / OFF THE RECORD"
    code="4 · 0 · 4"
    line="this page was never entered into the record"
  >
    <Link href="/" className="transition-colors hover:text-sig">
      ← the front page
    </Link>
    <Link href="/record" className="transition-colors hover:text-sig">
      the record ↗
    </Link>
  </StatusScreen>
);

export default NotFound;
