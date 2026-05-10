'use client';

import { useThemeStore } from '@/store/useThemeStore';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

Chart.register(...registerables);

interface VisitorChartProps {
  chartData: { date: string; count: number }[];
}

export default function VisitorChart({ chartData = [] }: VisitorChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (!canvasRef.current || !chartData) return;

    const labels = chartData?.map((d) => d.date) || [];
    const counts = chartData?.map((c) => c.count) || [];

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const config: ChartConfiguration = {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: '방문자 수',
            data: counts,
            backgroundColor: '#7A89BF',
            borderColor: '#7A89BF',
            borderWidth: 2,
            borderRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#B197D1',
            pointRadius: 5,
            tension: 0.4,
            fill: chartType === 'line' ? false : true,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#7A89BF',
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false,
            callbacks: {
              label: (context) => `${context.parsed.y}명`,
            },
          },
        },

        scales: {
          x: {
            grid: { display: false },
            ticks: { color: isDark ? '#9CA3AF' : '#6B7280' },
          },
          y: {
            beginAtZero: true,
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
            ticks: { display: false },
          },
        },
      },
    };

    chartRef.current = new Chart(ctx, config);

    return () => chartRef.current?.destroy();
  }, [chartType, isDark, chartData]);

  return (
    <div className="bg-bg-component rounded-main px-5 py-4 shadow-default h-82 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h2 className="text-20-bold">BLOG CHART</h2>

        {/* 필터 드롭다운 */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-bg-primary rounded-xl text-sm border border-text-point/20">
            {chartType === 'bar' ? '바 그래프' : '라인 그래프'}
            <Image
              src={isDark ? '/icons/bkIconArrowD.svg' : '/icons/whIconArrowD.svg'}
              alt="화살표"
              width={16}
              height={16}
              className={isOpen ? 'rotate-180' : ''}
            />
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-2 w-32 bg-bg-primary border border-text-point/20 rounded-xl shadow-xl z-10 overflow-hidden">
              <li
                onClick={() => {
                  setChartType('bar');
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-text-hover cursor-pointer text-small">
                바 그래프
              </li>
              <li
                onClick={() => {
                  setChartType('line');
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-text-hover cursor-pointer text-small">
                라인 그래프
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* 차트 캔버스 영역 */}
      <div className="flex-1 max-h-45">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
