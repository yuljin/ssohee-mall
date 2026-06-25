"use client";

import { FormEvent, useState } from "react";
import { Bell, Check, X } from "lucide-react";

export function RestockButton({ dropSlug }: { dropSlug: string }) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/restock-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dropSlug, phone }),
    });

    if (!response.ok) {
      setError("휴대폰 번호를 확인해 주세요.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <Bell size={16} />
        앙코르 알림
      </button>
      {open ? (
        <div className="mini-modal" role="dialog" aria-modal="true" aria-label="앙코르 알림 신청">
          <button
            className="icon-button"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="닫기"
          >
            <X size={18} />
          </button>
          {submitted ? (
            <div className="restock-success">
              <Check size={22} />
              <strong>신청되었습니다.</strong>
              <p>다시 열리면 입력한 번호로 알려드릴게요.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <strong>앙코르 알림 받기</strong>
              <p>요청이 충분히 모이면 다시 한 번 주문을 엽니다.</p>
              <input
                required
                inputMode="tel"
                placeholder="01012345678"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              {error ? <small>{error}</small> : null}
              <button type="submit">신청하기</button>
            </form>
          )}
        </div>
      ) : null}
    </>
  );
}
