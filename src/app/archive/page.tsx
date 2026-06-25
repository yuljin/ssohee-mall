import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { archivedDrops } from "@/modules/drop/demo-data";
import { RestockButton } from "@/components/restock-button";

export const metadata = {
  title: "지난 한 벌",
};

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <header className="archive-heading">
        <span className="section-kicker">PAST DROPS</span>
        <h1>지난 한 벌</h1>
        <p>
          매주 고른 조합을 남겨둡니다. 다시 보고 싶은 한 벌은 앙코르 알림을
          신청할 수 있어요.
        </p>
      </header>
      <div className="archive-grid">
        {archivedDrops.map((drop) => (
          <article className="archive-item" key={drop.slug}>
            <div
              className="archive-visual"
              style={{
                background: `linear-gradient(145deg, ${drop.palette[0]} 0 45%, ${drop.palette[1]} 45% 72%, ${drop.palette[2]} 72%)`,
              }}
            >
              <span>SOLD OUT</span>
              <strong>{String(drop.sequence).padStart(2, "0")}</strong>
            </div>
            <div className="archive-copy">
              <span>{drop.type}</span>
              <h2>{drop.title}</h2>
              <p>{drop.result}명이 함께 주문했어요.</p>
              <RestockButton dropSlug={drop.slug} />
            </div>
          </article>
        ))}
      </div>
      <Link className="archive-current-link" href="/">
        현재 드롭 보기
        <ArrowUpRight size={18} />
      </Link>
    </main>
  );
}
