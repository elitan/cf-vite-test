import { createFileRoute, Link } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

const validateSearch = zodSearchValidator(
  z.object({ page: z.number().default(1) })
);

export const Route = createFileRoute("/blog/$slug")({
  component: () => <Page />,
  validateSearch,
});

function Page() {
  const { slug } = Route.useParams();

  const { page } = Route.useSearch();

  return (
    <div>
      hello, slug: {slug}, page: {page}
      <div>
        <Link to='.' search={{ page: page + 1 }}>
          next page 123
        </Link>
      </div>
    </div>
  );
}
