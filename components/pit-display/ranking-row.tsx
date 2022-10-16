interface RankingRowProps {
  ranking: any;
}

const RankingRow: React.FC<RankingRowProps> = ({ ranking }) => {
  return (
    <div className="pd-card__row">
      <div className="pd-card__col" data-type="rank">
        {ranking.rank}
      </div>
      <div className="pd-card__col" data-type="team">
        {ranking.team.name.replace("Team ", "")}
      </div>
      <div className="pd-card__col" data-type="number">
        {ranking.played}
      </div>
      <div className="pd-card__col" data-type="number">
        {ranking.rankingScore}
      </div>
    </div>
  );
};

export default RankingRow;
