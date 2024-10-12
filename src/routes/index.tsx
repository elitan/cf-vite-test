import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className='p-2'>
      <h3>Welcome Home!</h3>
      <Link to='/blog'>blog</Link>
      <Link to='/blog/$slug' params={{ slug: "hejsan" }}>
        blog / hejsan
      </Link>
    </div>
  );
}
