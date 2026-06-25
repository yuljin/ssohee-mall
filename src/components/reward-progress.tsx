import { Check, Gift } from "lucide-react";
import type { Drop } from "@/modules/drop/types";

export function RewardProgress({ drop }: { drop: Drop }) {
  const nextTier = drop.rewards.find(
    (reward) => reward.threshold > drop.paidQuantity,
  );
  const maxThreshold = drop.rewards.at(-1)?.threshold ?? drop.targetQuantity;
  const progress = Math.min((drop.paidQuantity / maxThreshold) * 100, 100);

  return (
    <section className="reward-section" aria-labelledby="reward-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">TOGETHER REWARD</span>
          <h2 id="reward-title">{drop.paidQuantity}명이 함께 주문했어요</h2>
        </div>
        <Gift size={22} aria-hidden="true" />
      </div>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="next-reward">
        {nextTier
          ? `${nextTier.threshold - drop.paidQuantity}벌 더 모이면 ${nextTier.title}`
          : "이번 드롭의 모든 혜택이 열렸어요."}
      </p>
      <ol className="reward-list">
        {drop.rewards.map((reward) => {
          const unlocked = drop.paidQuantity >= reward.threshold;

          return (
            <li className={unlocked ? "unlocked" : ""} key={reward.threshold}>
              <span className="reward-marker">
                {unlocked ? <Check size={14} /> : reward.threshold}
              </span>
              <span>
                <strong>{reward.title}</strong>
                <small>{reward.description}</small>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
