
function Card() {
  return (
    <div className="home h-full flex items-center justify-center bg-bg-secondary">
      <aside className="">
        <h1 className="">My App</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">Dashboard</a>
          <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">Profile</a>
          <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">Settings</a>
          <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">Logout</a>
        </nav>
      </aside>

      <h2 className="">Hello Theme</h2>
      <p className="">This is unified design with theme vars.</p>
      <button className="">
        Primary Button
      </button>
    </div>
  );
}

export default Card