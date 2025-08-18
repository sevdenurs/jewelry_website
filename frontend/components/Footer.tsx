export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6">
      <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Jewelry Store. All rights reserved.
      </div>
    </footer>
  );
}
