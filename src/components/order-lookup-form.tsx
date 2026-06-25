"use client";

import { FormEvent, useState } from "react";
import { Info, Search } from "lucide-react";

export function OrderLookupForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/orders/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNumber, phoneLast4 }),
    });
    const result = (await response.json()) as {
      message?: string;
      orderUrl?: string;
    };

    if (!response.ok || !result.orderUrl) {
      setError(result.message ?? "주문을 찾지 못했습니다.");
      setLoading(false);
      return;
    }

    window.location.href = result.orderUrl;
  };

  return (
    <>
      <form className="lookup-form" onSubmit={lookup}>
        <label>
          주문번호
          <input
            required
            placeholder="HB260625-XXXXXXXX"
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value.toUpperCase())}
          />
        </label>
        <label>
          휴대폰 뒤 4자리
          <input
            required
            inputMode="numeric"
            placeholder="1234"
            maxLength={4}
            value={phoneLast4}
            onChange={(event) =>
              setPhoneLast4(event.target.value.replaceAll(/\D/g, ""))
            }
          />
        </label>
        <button disabled={loading} type="submit">
          <Search size={18} />
          {loading ? "조회 중" : "조회하기"}
        </button>
      </form>
      {error ? (
        <p className="inline-error" role="alert">
          <Info size={16} />
          {error}
        </p>
      ) : null}
    </>
  );
}
