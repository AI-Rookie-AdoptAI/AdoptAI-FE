"use client";

import { useState, useEffect } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { fetchShelter, saveShelter } from "@/lib/chatApi";

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
  const [fetching, setFetching] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    fetchShelter()
      .then((data) => {
        setForm({
          name: data.name ?? "",
          region: data.region ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          email: data.email ?? "",
          capacity: data.capacity != null ? String(data.capacity) : "",
          description: data.description ?? "",
        });
      })
      .catch(() => setApiError("보호소 정보를 불러오지 못했어요."))
      .finally(() => setFetching(false));
  }, []);

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
    setApiError(null);
    try {
      await saveShelter({
        name: form.name.trim(),
        region: form.region,
        address: form.address.trim() || undefined,
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        capacity: form.capacity ? Number(form.capacity) : undefined,
        description: form.description.trim() || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "저장에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-50">
      <SettingsHeader title="보호소 정보" />

      <main className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 pb-10">
        {apiError && (
          <div className="mb-4 px-4 py-3 bg-destructive-100 border border-destructive-200 rounded-[14px]">
            <p className="text-[13px] text-destructive-600">{apiError}</p>
          </div>
        )}

        {fetching ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-[13px] text-brand-300">불러오는 중…</p>
          </div>
        ) : (
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

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-brand-800">지역</label>
                <select
                  value={form.region}
                  onChange={(e) => set("region", e.target.value)}
                  className={`h-12 px-4 rounded-2xl border text-[15px] text-brand-800 bg-surface-50 outline-none appearance-none transition-colors ${
                    errors.region ? "border-destructive-400" : "border-brand-100 focus:border-brand-500"
                  }`}
                >
                  <option value="">지역 선택</option>
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.region && <p className="text-[12px] text-destructive-500">{errors.region}</p>}
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
              {saved ? (
                <span className="inline-flex items-center gap-1.5">
                  <CheckIcon size={16} color="currentColor" />
                  저장됐어요
                </span>
              ) : loading ? "저장 중…" : "저장하기"}
            </Button>
          </form>
        )}
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
