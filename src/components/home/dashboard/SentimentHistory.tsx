import { useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loader from 'src/components/shared/Loader/Loader';
import { fetchSentimentsData } from 'src/store/sections/dashboard/SentimentHistorySlice';
import { AppState, useDispatch, useSelector } from 'src/store/Store';

const SentimentRibbonChart: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state: AppState) => state.dashboard.sentimentsSumaryReducer);

  const [series, setSeries] = useState<any[]>([]);  // State for chart series data
  const [categories, setCategories] = useState<string[]>([]);  // State for x-axis categories

  useEffect(() => {
    dispatch(fetchSentimentsData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      console.log(data);
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

  const customizer = useSelector((state: AppState) => state.customizer);

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
      theme: customizer.activeMode,
      y: {
        formatter: function (val: number) {
          return `${val}`;
        },
      },
    },
  };

  if (loading) return <Loader />;  // Custom loader component
  if (error) return <></>;  // Custom error component

  return (
    <DashboardCard title={t('sentiments.sentiment_history')!}>
      <Chart options={options} series={series} type="area" height={350} />
    </DashboardCard>
  );
};

export default SentimentRibbonChart;
