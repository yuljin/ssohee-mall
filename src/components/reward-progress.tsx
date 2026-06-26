import { Check, Gift, LockKeyhole } from "lucide-react";
import type { Drop } from "@/modules/drop/types";

export function RewardProgress({ drop }: { drop: Drop }) {
  const shouldShowGroupRewards =
    drop.paidQuantity >= drop.publicRewardThreshold;
  const nextTier = drop.rewards.find(
    (reward) => reward.threshold > drop.paidQuantity,
  );
  const maxThreshold = drop.rewards.at(-1)?.threshold ?? drop.targetQuantity;
  const progress = Math.min((drop.paidQuantity / maxThreshold) * 100, 100);

  return (
    <section className="reward-section" aria-labelledby="reward-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">DROP BENEFIT</span>
          <h2 id="reward-title">첫 주문부터 같은 혜택을 드려요</h2>
        </div>
        <Gift size={22} aria-hidden="true" />
      </div>

      <div className="guaranteed-benefit">
        <span>{drop.guaranteedBenefit.badge}</span>
        <div>
          <strong>{drop.guaranteedBenefit.title}</strong>
          <small>{drop.guaranteedBenefit.description}</small>
        </div>
      </div>

      {shouldShowGroupRewards ? (
        <>
          <div className="reward-public-heading">
            <span>함께 열린 추가 혜택</span>
            <strong>{drop.paidQuantity}세트 참여 중</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="next-reward">
            {nextTier
              ? `${nextTier.threshold - drop.paidQuantity}세트 더 모이면 ${nextTier.title}`
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
        </>
      ) : (
        <div className="reward-locked-preview">
          <span className="reward-marker">
            <LockKeyhole size={14} />
          </span>
          <span>
            <strong>{drop.publicRewardThreshold}세트부터 추가 혜택이 열려요</strong>
            <small>
              첫 드롭은 전원 혜택을 먼저 확정하고, 충분히 모이면 단계 혜택을 함께 제공합니다.
            </small>
          </span>
        </div>
      )}
    </section>
  );
}
