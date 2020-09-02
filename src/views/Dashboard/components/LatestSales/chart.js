import palette from 'theme/palette';

export const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Savings',
      backgroundColor: "yellow",
      data: [18, 5, 19, 27, 29, 19, 20]
    },
    {
      label: 'Investments',
      backgroundColor: "red",
      data: [11, 20, 12, 29, 30, 25, 13]
    },
    {
      label: 'Loans',
      backgroundColor: "blue",
      data: [11, 20, 11, 29, 30, 20, 13, 0, 0, 0, 0, 0, 0]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
