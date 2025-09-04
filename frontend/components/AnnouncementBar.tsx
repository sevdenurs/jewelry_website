// components/AnnouncementBar.tsx
export default function AnnouncementBar() {
  return (
    <div className="w-full bg-black text-white text-sm text-center py-2">
      <span className="mx-3">750₺ üzeri kargo bedava</span> |{" "}
      <span className="mx-3">30 gün koşulsuz iade</span> |{" "}
      <span className="mx-3">Güvenli ödeme (3D Secure)</span>
    </div>
  );
}
