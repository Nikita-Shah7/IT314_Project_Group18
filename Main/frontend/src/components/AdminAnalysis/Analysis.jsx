import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { PRODUCTS } from './data';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function Analysis() {
    const [tripExpensesOccurrences, setTripExpensesOccurrences] = useState({});
  const [orderAmounts, setOrderAmounts] = useState({});
  const [customerRatingData, setCustomerRatingData] = useState([]);
  const [customerRatingDeliveryData, setCustomerRatingDeliveryData] = useState([]);
  const tripExpensesChartRef = useRef(null);
  const orderAmountChartRef = useRef(null);
  const customerRatingChartRef = useRef(null);
  const customerRatingDeliveryChartRef = useRef(null);

  useEffect(() => {
    const countTripExpensesOccurrences = () => {
      const counts = {};

      PRODUCTS.forEach((item) => {
        const dayValue = item.Day;
        counts[dayValue] = (counts[dayValue] || 0) + 1;
      });

      setTripExpensesOccurrences(counts);
    };

    const sumOrderAmounts = () => {
      const sums = {};

      PRODUCTS.forEach((item) => {
        const dayValue = item.Day;
        const orderAmount = item['Order Amount'] || 0;

        sums[dayValue] = (sums[dayValue] || 0) + orderAmount;
      });

      setOrderAmounts(sums);
    };

    const processCustomerRating = (field) => {
      const dataMap = new Map();

      PRODUCTS.forEach((item) => {
        const value = item[field];
        const sumValue = item[field] || 0;

        if (dataMap.has(value)) {
          const currentSum = dataMap.get(value);
          dataMap.set(value, currentSum + sumValue);
        } else {
          dataMap.set(value, sumValue);
        }
      });

      const chartData = Array.from(dataMap).map(([value, sumValue]) => ({
        x: value,
        y: sumValue,
      }));

      return chartData;
    };

    countTripExpensesOccurrences();
    sumOrderAmounts();
    setCustomerRatingData(processCustomerRating('Customer Rating-Fo'));
    setCustomerRatingDeliveryData(processCustomerRating('Customer Rating-Delivery'));
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  const tripExpensesOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    color: '#942D2D',
    theme: "dark2",
    title: {
      text: "Day wise Count"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: Object.entries(tripExpensesOccurrences).map(([label, y]) => ({ y, label }))
    }]
  };

  const orderAmountOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    theme: "dark2",
    title: {
      text: "Day wise Profit"
    },
    axisY: {
      title: "Profit",
      scaleBreaks: {
        autoCalculate: true,
        type: "wavy",
        lineColor: "white"
      }
    },
    data: [{
      type: "column",
      indexLabel: "{y}",
      indexLabelFontColor: "white",
      dataPoints: Object.entries(orderAmounts).map(([label, y]) => ({ label, y }))
    }]
  };

  const customerRatingOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    theme: "dark2",
    title: {
      text: "Customer Rating-Food"
    },
    axisY: {
      title: "Customer Rating-Food Count",
      scaleBreaks: {
        autoCalculate: true,
        type: "wavy",
        lineColor: "white"
      }
    },
    axisX: {
      title: "Customer Rating-Food"
    },
    data: [{
      type: "column",
      indexLabel: "{y}",
      indexLabelFontColor: "white",
      dataPoints: customerRatingData,
    }]
  };

  const customerRatingDeliveryOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    theme: "dark2",
    title: {
      text: "Customer Rating-Delivery"
    },
    axisY: {
      title: "Sum of Customer Rating-Delivery",
      scaleBreaks: {
        autoCalculate: true,
        type: "wavy",
        lineColor: "white"
      }
    },
    axisX: {
      title: "Customer Rating"
    },
    data: [{
      type: "column",
      indexLabel: "{y}",
      indexLabelFontColor: "white",
      dataPoints: customerRatingDeliveryData,
    }]
  };

  const divStyle = {
    backgroundColor: '#EBF2D5',
    padding: '20px', // Add some padding for better visibility
  };

  const handleDownload = () => {
    // Trigger the download for all charts
    tripExpensesChartRef.current.exportChart({ format: "png" });
    orderAmountChartRef.current.exportChart({ format: "png" });
    customerRatingChartRef.current.exportChart({ format: "png" });
    customerRatingDeliveryChartRef.current.exportChart({ format: "png" });
  };

  return (
    <div style={divStyle}>
      <div style={{'color': '#942D2D', 'display':'flex', 'justifyContent':'center' }}>
        <h1>Restaurant Data Analysis</h1>
      </div>
      {/* <ReviewsML/> */}
      <CanvasJSChart options={tripExpensesOptions} onRef={(ref) => (tripExpensesChartRef.current = ref)} />
      <br></br>
      <br></br>
      <CanvasJSChart options={orderAmountOptions} onRef={(ref) => (orderAmountChartRef.current = ref)} />
      <br></br>
      <br></br>
      <CanvasJSChart options={customerRatingOptions} onRef={(ref) => (customerRatingChartRef.current = ref)} />
      <br></br>
      <br></br>
      <CanvasJSChart options={customerRatingDeliveryOptions} onRef={(ref) => (customerRatingDeliveryChartRef.current = ref)} />
    </div>
  );
}