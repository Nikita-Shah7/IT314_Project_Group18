import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CanvasJSReact from '@canvasjs/react-charts';
import { PRODUCTS } from './data';
import Loader from '../Loader/Loader'

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const DARKER_GROTESQUE_FONT = 'Darker Grotesque';

export default function Analysis() {
  const navigate = useNavigate();

  if (!localStorage.getItem("isAdminAuth")) {
    navigate('/adminlogin');
  }

  const [loading, setLoading] = useState(true);
  const [tripExpensesOccurrences, setTripExpensesOccurrences] = useState({});
  const [orderAmounts, setOrderAmounts] = useState({});
  const [customerRatingData, setCustomerRatingData] = useState([]);
  const [customerRatingDeliveryData, setCustomerRatingDeliveryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const tripExpensesChartRef = useRef(null);
  const orderAmountChartRef = useRef(null);
  const customerRatingChartRef = useRef(null);
  const customerRatingDeliveryChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Your existing data processing logic
      const countTripExpensesOccurrences = () => {
        const counts = {};
        PRODUCTS.forEach((item) => {
          if (!selectedMonth || item.Month === selectedMonth) {
            const dayValue = item.Day;
            counts[dayValue] = (counts[dayValue] || 0) + 1;
          }
        });
        setTripExpensesOccurrences(counts);
      };

      const sumOrderAmounts = () => {
        const sums = {};
        PRODUCTS.forEach((item) => {
          if (!selectedMonth || item.Month === selectedMonth) {
            const dayValue = item.Day;
            const orderAmount = item['Order Amount'] || 0;
            sums[dayValue] = (sums[dayValue] || 0) + orderAmount;
          }
        });
        setOrderAmounts(sums);
      };

      const processCustomerRating = (field) => {
        const dataMap = new Map();
        PRODUCTS.forEach((item) => {
          if (!selectedMonth || item.Month === selectedMonth) {
            const value = item[field];
            const sumValue = item[field] || 0;
            if (dataMap.has(value)) {
              const currentSum = dataMap.get(value);
              dataMap.set(value, currentSum + sumValue);
            } else {
              dataMap.set(value, sumValue);
            }
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
      setCustomerRatingData(processCustomerRating('Customer Rating-Fo '));
      setCustomerRatingDeliveryData(processCustomerRating('Customer Rating-Delivery'));

      // Set loading to false once data is fetched
      setLoading(false);
    };

    fetchData();
  }, [selectedMonth]);

  const tripExpensesOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    color: '#942D2D',
    theme: 'dark2',
    title: {
      text: 'Day wise Count',
    },
    data: [{
      type: 'pie',
      indexLabel: '{label}: {y}%',
      startAngle: -90,
      dataPoints: Object.entries(tripExpensesOccurrences).map(([label, y]) => ({ y, label })),
    }],
  };

  const orderAmountOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    theme: 'dark2',
    title: {
      text: 'Day wise Profit',
    },
    axisY: {
      title: 'Profit',
    },
    data: [{
      type: 'column',
      indexLabel: '{y}',
      indexLabelFontColor: 'white',
      dataPoints: Object.entries(orderAmounts).map(([label, y]) => ({ label, y })),
    }],
  };

  const customerRatingOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    theme: 'dark2',
    title: {
      text: 'Customer Rating-Food',
    },
    axisY: {
      title: 'Customer Rating-Food Count',
    },
    axisX: {
      title: 'Customer Rating-Food',
    },
    data: [{
      type: 'column',
      indexLabel: '{y}',
      indexLabelFontColor: 'white',
      dataPoints: customerRatingData,
    }],
  };

  const customerRatingDeliveryOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: '#942D2D',
    theme: 'dark2',
    title: {
      text: 'Customer Rating-Delivery',
    },
    axisY: {
      title: 'Sum of Customer Rating-Delivery',
    },
    axisX: {
      title: 'Customer Rating',
    },
    data: [{
      type: 'column',
      indexLabel: '{y}',
      indexLabelFontColor: 'white',
      dataPoints: customerRatingDeliveryData,
    }],
  };

  const divStyle = {
    backgroundColor: '#EBF2D5',
    padding: '20px',
    fontFamily: DARKER_GROTESQUE_FONT + ', sans-serif',
  };

  const selectContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  };

  const selectStyle = {
    padding: '8px',
    borderRadius: '4px',
    fontSize: '16px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    marginRight: '10px',
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const handleMonthChange = (event) => {
    const selectedMonthValue = parseInt(event.target.value);
    setSelectedMonth(selectedMonthValue);
  };

  return (
    <div style={divStyle}>
      <div style={{ 'color': '#942D2D', 'display': 'flex', 'justifyContent': 'center' }}>
        <h1>Restaurant Data Analysis</h1>
      </div>
      <div style={selectContainerStyle}>
        <label htmlFor="monthDropdown" style={{ 'color': '#942D2D', 'marginRight': '1%', 'fontWeight': '600' }}>Select Month :  </label>
        <select id="monthDropdown" onChange={handleMonthChange} value={selectedMonth || ''} style={selectStyle}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      {loading ? (
        <Loader/>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
