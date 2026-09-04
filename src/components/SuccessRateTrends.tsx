import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { TrendingUp, Sparkles, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { JobPosting, JobCriteria, PipelineStats } from '../types';

interface SuccessRateTrendsProps {
  jobs: JobPosting[];
  criteria: JobCriteria;
  stats: PipelineStats;
}

interface TrendPoint {
  id: string;
  timeLabel: string;
  company: string;
  title: string;
  score: number;
  averageScore: number;
  threshold: number;
  status: 'applied' | 'ready_to_apply' | 'skipped' | 'unprocessed';
  meetsCriteria: boolean;
}

export const SuccessRateTrends: React.FC<SuccessRateTrendsProps> = ({
  jobs,
  criteria,
  stats,
}) => {
  // Compute trend series for all evaluated/processed jobs
  const trendData: TrendPoint[] = useMemo(() => {
    // Collect all jobs that have an evaluation or status indicating processing
    const processed = jobs.filter(
      (j) => j.evaluation !== undefined || j.status === 'applied' || j.status === 'skipped'
    );

    // If no jobs have been evaluated yet, provide a baseline sample point based on criteria
    if (processed.length === 0) {
      return [
        {
          id: 'baseline-0',
          timeLabel: 'Scan Start',
          company: 'Queue Baseline',
          title: 'Candidate Match Calibration',
          score: criteria.minMatchScore + 5,
          averageScore: criteria.minMatchScore + 5,
          threshold: criteria.minMatchScore,
          status: 'ready_to_apply',
          meetsCriteria: true,
        },
      ];
    }

    let runningSum = 0;
    return processed.map((job, index) => {
      const score = job.evaluation?.matchScore ?? (job.status === 'applied' ? 88 : 45);
      runningSum += score;
      const avg = Math.round(runningSum / (index + 1));

      let timeLabel = `Job #${index + 1}`;
      if (job.submission?.timestamp) {
        try {
          const d = new Date(job.submission.timestamp);
          timeLabel = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch {
          timeLabel = `Job #${index + 1}`;
        }
      }

      return {
        id: job.id,
        timeLabel,
        company: job.company,
        title: job.title,
        score,
        averageScore: avg,
        threshold: criteria.minMatchScore,
        status: job.status,
        meetsCriteria: job.evaluation?.meetsCriteria ?? (score >= criteria.minMatchScore),
      };
    });
  }, [jobs, criteria.minMatchScore]);

  const latestAverage =
    trendData.length > 0 ? trendData[trendData.length - 1].averageScore : criteria.minMatchScore;
  const isAboveThreshold = latestAverage >= criteria.minMatchScore;

  const qualifiedCount = trendData.filter((d) => d.score >= criteria.minMatchScore).length;
  const passRatePercentage =
    trendData.length > 0 ? Math.round((qualifiedCount / trendData.length) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Success Rate Trends
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {trendData.length} Processed
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Tracking cumulative average match scores and candidate qualification alignment over time across all evaluated job openings.
          </p>
        </div>

        {/* Quick Highlights Summary Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Average Score Badge */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                Average Match Score
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span
                  className={`text-lg font-bold font-mono ${
                    isAboveThreshold ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {latestAverage}%
                </span>
                <span className="text-[10px] text-slate-500">
                  vs {criteria.minMatchScore}% goal
                </span>
              </div>
            </div>
          </div>

          {/* Qualification Rate Badge */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                Criteria Pass Rate
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-bold font-mono text-sky-400">
                  {passRatePercentage}%
                </span>
                <span className="text-[10px] text-slate-500">
                  ({qualifiedCount}/{trendData.length})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Line Chart Canvas */}
      <div className="mt-5 w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={trendData}
            margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="avgScoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              stroke="#475569"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
            />

            <YAxis
              domain={[30, 100]}
              stroke="#475569"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              unit="%"
              tickLine={false}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload as TrendPoint;
                return (
                  <div className="bg-slate-950/95 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[220px]">
                    <div className="border-b border-slate-800/80 pb-2">
                      <div className="text-slate-400 text-[10px] font-mono">
                        {data.timeLabel}
                      </div>
                      <div className="font-bold text-white text-sm truncate">
                        {data.company}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {data.title}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Opening Fit Score:</span>
                        <span className="font-bold text-sky-400 font-mono">
                          {data.score}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Cumulative Average:</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          {data.averageScore}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Passing Cutoff:</span>
                        <span className="font-bold text-amber-400 font-mono">
                          {data.threshold}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                        <span className="text-slate-400">Decision:</span>
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                            data.status === 'applied'
                              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                              : data.status === 'skipped'
                              ? 'bg-rose-950/70 text-rose-300 border border-rose-800'
                              : 'bg-sky-950/70 text-sky-300 border border-sky-800'
                          }`}
                        >
                          {data.status === 'applied'
                            ? 'Auto-Applied'
                            : data.status === 'skipped'
                            ? 'Skipped (Mismatch)'
                            : 'Evaluated'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              iconType="circle"
            />

            {/* Threshold horizontal reference line */}
            <ReferenceLine
              y={criteria.minMatchScore}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `Min Goal (${criteria.minMatchScore}%)`,
                fill: '#f59e0b',
                fontSize: 10,
                position: 'insideBottomRight',
              }}
            />

            {/* Soft area under average curve */}
            <Area
              type="monotone"
              dataKey="averageScore"
              fill="url(#avgScoreGradient)"
              stroke="none"
              legendType="none"
            />

            {/* Individual Job Match Score Line */}
            <Line
              type="monotone"
              dataKey="score"
              name="Individual Job Score"
              stroke="#38bdf8"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3.5, fill: '#38bdf8', strokeWidth: 1, stroke: '#0f172a' }}
              activeDot={{ r: 5, fill: '#7dd3fc' }}
            />

            {/* Cumulative Average Match Score Line */}
            <Line
              type="monotone"
              dataKey="averageScore"
              name="Average Match Score Over Time"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4.5, fill: '#10b981', strokeWidth: 2, stroke: '#022c22' }}
              activeDot={{ r: 6.5, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Insight Note */}
      <div className="mt-3 pt-3 border-t border-slate-800/70 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            The solid emerald line displays your running average score as the agent processes jobs sequentially.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" /> Running Average
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-0.5 bg-sky-400 border-dashed inline-block" /> Job Score
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2.5 h-0.5 bg-amber-500 inline-block" /> Threshold
          </span>
        </div>
      </div>
    </div>
  );
};
