"use client";

import { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const REGIONS = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
  "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

export default function ShelterPage() {
  const [form, setForm] = useState({
    name: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    capacity: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "보호소 이름을 입력해 주세요";
    if (!form.region) e.region = "지역을 선택해 주세요";
    if (!form.phone.trim()) e.phone = "연락처를 입력해 주세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: PATCH /shelters/me
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <SettingsHeader title="보호소 정보" />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-10">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <Section title="기본 정보">
            <Input
              label="보호소 이름"
              id="shelterName"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
              placeholder="OO 동물 보호소"
            />

            {/* 지역 선택 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-brand-800">지역</label>
              <select
                value={form.region}
                onChange={(e) => set("region", e.target.value)}
                className={`h-12 px-4 rounded-2xl border text-[15px] text-brand-800 bg-surface-50 outline-none appearance-none transition-colors ${
                  errors.region ? "border-red-400" : "border-brand-100 focus:border-brand-500"
                }`}
              >
                <option value="">지역 선택</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.region && <p className="text-[12px] text-red-500">{errors.region}</p>}
            </div>

            <Input
              label="주소"
              id="address"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="도로명 주소"
            />
          </Section>

          <Section title="연락처">
            <Input
              label="전화번호"
              id="phone"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              error={errors.phone}
              placeholder="02-000-0000"
              type="tel"
            />
            <Input
              label="이메일 (선택)"
              id="shelterEmail"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="shelter@example.com"
              type="email"
            />
          </Section>

          <Section title="기타">
            <Input
              label="수용 가능 마릿수 (선택)"
              id="capacity"
              value={form.capacity}
              onChange={(e) => set("capacity", e.target.value)}
              placeholder="예: 30"
              type="number"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-brand-800">보호소 소개 (선택)</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="보호소를 간단히 소개해 주세요"
                rows={4}
                className="px-4 py-3 rounded-2xl border border-brand-100 focus:border-brand-500 text-[15px] text-brand-800 placeholder:text-brand-300 bg-surface-50 outline-none resize-none transition-colors"
              />
            </div>
          </Section>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {saved ? "저장됐어요 ✓" : loading ? "저장 중…" : "저장하기"}
          </Button>
        </form>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-bold text-brand-300 uppercase tracking-wide">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
