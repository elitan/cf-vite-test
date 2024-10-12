import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: () => (
    <div>
      <div>blog index</div>
      <ul>
        <li>
          <Link
            to='/blog/$slug'
            params={{ slug: "hejsan" }}
            activeProps={{ className: "bg-red-500" }}
          >
            blog hejsan
          </Link>
        </li>
      </ul>
    </div>
  ),
});
