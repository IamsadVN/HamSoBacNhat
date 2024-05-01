import { Chart, registerables } from 'chart.js';
//import 'chartjs-adapter-date-fns';

// Đăng ký plugin
Chart.register(...registerables);

// Tạo plugin tùy chỉnh
const customXAxisPlugin = {
  id: 'customXAxisPlugin',
  beforeInit(chart, args, options) {
    // Chuyển đổi các giá trị âm thành dương và hiển thị tùy ý
    chart.data.labels = chart.data.labels.map(label => {
      if (parseFloat(label) < 0) {
        return `-${Math.abs(parseFloat(label))}`; // Chuyển đổi giá trị âm thành dương
      } else {
        return label;
      }
    });
  }
};

// Tạo dữ liệu cho biểu đồ
const data = {
  labels: ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5'],
  datasets: [{
    label: 'Số lượng',
    data: [10, 20, -30, 40, 50, 60, -70, 80, 90, 100, 110],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

// Thiết lập cấu hình cho biểu đồ
const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      customXAxisPlugin // Sử dụng plugin tùy chỉnh
    },
    scales: {
      y: {
        beginAtZero: false // Đặt beginAtZero thành false để hiển thị giá trị âm trên trục y
      }
    }
  }
};

// Vẽ biểu đồ
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, config);
