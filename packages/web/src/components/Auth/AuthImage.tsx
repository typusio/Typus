export function AuthImage() {
  return (
    <div className="relative flex-1 hidden w-0 lg:block">
      <img
        className="absolute inset-0 object-cover w-full h-full"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  );
}
