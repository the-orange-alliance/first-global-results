import { useEffect, useState } from "react";
import RankingRow from "@/components/pit-display/ranking-row";
import { marquee } from "@/lib";

interface RankingCardProps {
  rankings: any[];
  sort: string;
}

const RankingCard: React.FC<RankingCardProps> = ({ rankings, sort }) => {
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const rankingsScroll = document.querySelector("#rankings-scroll");
    setShouldScroll(
      rankingsScroll.clientHeight > rankingsScroll.parentElement.clientHeight
    );
  }, [rankings]);

  const filterKey = sort ?? 'teamKey';

  const rankingsView = rankings.filter(r => r.team).sort((a, b) => a[filterKey] - b[filterKey]).map((ranking) => (
    <RankingRow key={ranking.rank} ranking={ranking} />
  ));

  return (
    <>
      <div className="pd-card" style={{ marginRight: 20 }}>
        <div className="pd-card__row pd-card__header">
          <div className="pd-card__col" data-type="rank">
            Rank
          </div>
          <div className="pd-card__col" data-type="team">
            Team
          </div>
          <div className="pd-card__col" data-type="number">
            Played
          </div>
          <div className="pd-card__col" data-type="number">
            Ranking Score
          </div>
        </div>
        <div className="pd-marquee">
          <div
            id="rankings-scroll"
            style={{
              animation: shouldScroll ? marquee(rankings.length) : "none",
            }}
          >
            {rankingsView}
          </div>
          <div
            style={{
              display: shouldScroll ? undefined : "none",
              animation: shouldScroll ? marquee(rankings.length) : "none",
            }}
          >
            {rankingsView}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pd-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          background-color: #fafafa;
          border-radius: 8px;
          overflow: hidden;
        }
        .pd-marquee {
          height: inherit;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .pd-marquee > div {
          padding-bottom: var(--table-row-height);
        }
        .pd-card__row {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: calc(var(--table-row-height) - var(--table-row-padding));
        }
        .pd-card__header {
          min-height: 3.5rem;
          font-weight: 500;
          line-height: 1;
          text-align: center;
          box-shadow: 0 10px 8px -5px rgba(0, 0, 0, 0.12);
        }
        .pd-card__row:not(.pd-card__header):nth-of-type(odd) {
          background: rgba(0, 0, 0, 0.025);
        }
        .pd-card__col {
          min-height: calc(var(--table-row-height) - var(--table-row-padding));
          padding: var(--table-row-padding) 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .pd-card__col[data-type="team"] {
          justify-content: start;
          font-weight: 500;
        }
        .pd-card__col[data-type="rank"] {
          width: 6rem;
          min-width: 6rem;
        }
        .pd-card__col[data-type="number"] {
          width: 5.25rem;
          min-width: 5.25rem;
        }
        .pd-card__col[data-type="wlt"] {
          letter-spacing: 0.08em;
        }
      `}</style>
    </>
  );
};

export default RankingCard;
