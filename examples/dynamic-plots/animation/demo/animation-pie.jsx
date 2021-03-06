import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Input } from 'antd';
import { Pie } from '@antv/g2plot';
import insertCss from 'insert-css';

class PiePlot extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  componentDidMount() {
    // Step 1: 声明数据源
    // G2Plot 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    /** Generater a data array of 6 items */
    const data = new Array(6).fill(1).map((d, idx) => ({ x: `${idx}`, y: idx + Math.random() * 20 }));
    // Step 2: 创建图表
    const chartDom = this.chartNodeRef.current;
    const pie = new Pie(chartDom, {
      data,
      colorField: 'x',
      angleField: 'y',
      label: { type: 'inner', formatter: '{percentage}', offset: '-20%' },
    });

    // Step 3: 渲染图表
    pie.render();
    this.chartRef.current = pie;
  }

  handleAnimationChange = (v) => {
    const pie = this.chartRef.current;
    if (pie) {
      pie.update({ animation: v === '无' ? false : { appear: { animation: v } } });
    }
  };

  handleDurationChange = (e) => {
    const v = e.target.value;
    const pie = this.chartRef.current;
    if (pie) {
      pie.update({ animation: { appear: { duration: v } } });
    }
  };

  render() {
    return (
      <section>
        <div>
          <span className="select-label">切换动画</span>
          <Select aria-label="select" defaultValue="wave-in" onChange={this.handleAnimationChange} size="small">
            {/* 'grow-in-x', 'grow-in-y', 不可用 */}
            {['wave-in', 'grow-in-xy', 'zoom-in', 'fade-in', '无'].map((opt) => {
              return <Select.Option value={opt}>{opt}</Select.Option>;
            })}
          </Select>
          <span className="select-label">动画持续时间</span>
          <Input aria-label="input" className="custom-input" placeholder="500ms" size="small" onChange={this.handleDurationChange} />
        </div>
        <div className={'chart-wrapper'} ref={this.chartNodeRef} />
      </section>
    );
  }
}

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .select-label {
    margin-right: 8px;
  }
  .select-label:not(:first-of-type) {
    margin-left: 8px;
  }
  .custom-input {
    display: inpie-block;
    width: 200px !important;
  }
  .chart-wrapper {
    margin-top: 12px;
  }
`);

ReactDOM.render(<PiePlot />, document.getElementById('container'));
