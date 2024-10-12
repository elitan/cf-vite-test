import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: () => (
    <div>
      LAYOUT!
      <div>
        <Outlet />
      </div>
    </div>
  ),
});
