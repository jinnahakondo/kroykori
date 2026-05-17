
import { website_login } from "@/routes/website.routes";

import Link from "next/link";


export default function Home() {

  return (
    <div>
      <Link href={website_login}>Click Me</Link>

    </div>
  );
}
