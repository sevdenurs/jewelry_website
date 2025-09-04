"use client";
import {
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const FEATURES = [
  {
    icon: TruckIcon,
    title: "Hızlı Kargo",
    text: "24 saat içinde gönderim, takip numarası anında.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Sertifikalı Ürün",
    text: "925 ayar gümüş / paslanmaz çelik, nikel içermez.",
  },
  {
    icon: CreditCardIcon,
    title: "Güvenli Ödeme",
    text: "3D Secure & SSL ile korumalı işlemler.",
  },
  {
    icon: ArrowPathIcon,
    title: "30 Gün İade",
    text: "Koşulsuz iade/değişim garantisi.",
  },
];

export default function NedenBiz() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-gray-900">
            Neden Biz?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Alışveriş deneyiminizi yükselten standartlar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-gray-200/70 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-gray-100 ring-1 ring-gray-200">
                <Icon className="size-5 text-gray-800" aria-hidden="true" />
              </span>
              <h3 className="font-medium text-gray-900">{title}</h3>
            </div>
            <p className="text-sm leading-6 text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
