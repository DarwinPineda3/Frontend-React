import { Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import EmptyState from 'src/components/shared/EmptyState';
import Loader, { LoaderType } from 'src/components/shared/Loader/Loader';

const SentimentRibbonChart: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [series, setSeries] = useState<any[]>([]);  // State for chart series data
  const [categories, setCategories] = useState<string[]>([]);  // State for x-axis categories

  useEffect(() => {
    // Simular la carga de datos estáticos
    const fetchData = () => {
      setLoading(true);
      try {
        const exampleData = [
          {
            date: '2023-03-01',
            sentiments: {
              no_expressed_feeling: 10,
              very_satisfied: 5,
              very_dissatisfied: 2,
              satisfied: 8,
              dissatisfied: 3,
              neutral: 7,
            },
          },
          {
            date: '2023-03-02',
            sentiments: {
              no_expressed_feeling: 12,
              very_satisfied: 6,
              very_dissatisfied: 1,
              satisfied: 9,
              dissatisfied: 4,
              neutral: 6,
            },
          },
          // Agrega más datos de ejemplo según sea necesario
        ];
        setData(exampleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const sentimentData = {
        "no_expressed_feeling": [],
        "very_satisfied": [],
        "very_dissatisfied": [],
        "satisfied": [],
        "dissatisfied": [],
        "neutral": [],
      };
      const dates: string[] = [];

      // Populate sentimentData with the response
      data.forEach((item: any) => {
        dates.push(item.date);
        Object.keys(sentimentData).forEach((sentiment) => {
          //@ts-ignore
          sentimentData[sentiment].push(item.sentiments[sentiment] || 0);  // Default to 0 if sentiment is missing
        });
      });

      setCategories(dates);
      setSeries([
        { name: t('sentiments.no_expressed_feeling'), data: sentimentData["no_expressed_feeling"] },
        { name: t('sentiments.very_satisfied'), data: sentimentData["very_satisfied"] },
        { name: t('sentiments.very_dissatisfied'), data: sentimentData["very_dissatisfied"] },
        { name: t('sentiments.satisfied'), data: sentimentData["satisfied"] },
        { name: t('sentiments.dissatisfied'), data: sentimentData["dissatisfied"] },
        { name: t('sentiments.neutral'), data: sentimentData["neutral"] },
      ]);
    }
  }, [data, t]);

  const options = {
    chart: {
      type: 'area',
      stacked: true,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'category',
      categories: categories,
      labels: {
        format: 'MMM dd', // Or customize the format based on the date
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    yaxis: {
      title: {
        text: t('sentiments.count'),
        style: {
          color: theme.palette.text.primary,
        },
      },
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 0,
    },
    fill: {
      type: 'solid',
      opacity: 0.8,
    },
    colors: [
      theme.palette.grey[400],
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme.palette.mode,
      y: {
        formatter: function (val: number) {
          return `${val}`;
        },
      },
    },
  };

  if (loading) {
    return <DashboardCard title={t('sentiments.sentiment_history')!}>
      <Loader type={LoaderType.Contained} />
    </DashboardCard>
  };
  if (error) {
    return <DashboardCard title={t('sentiments.sentiment_history')!}>
      <Typography variant="h6" color="textSecondary">
        {t('dashboard.error', { error })}
      </Typography>
    </DashboardCard>
  };
  if (series.length === 0 || categories.length === 0) {
    return <DashboardCard title={t('sentiments.sentiment_history')!}>
      <EmptyState />
    </DashboardCard>
  };

  return (
    <DashboardCard title={t('sentiments.sentiment_history')!}>
      <Chart options={options} series={series} type="area" height={350} />
    </DashboardCard>
  );
};

export default SentimentRibbonChart;