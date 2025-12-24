// 移除D3模块导入，使用CDN全局引入
// import * as d3 from 'd3';

// 定义粒子接口类型
interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  opacity: number;
}

// 创建D3背景动画
const createD3Background = () => {
  // 创建全屏背景容器
  const background = d3.select('body')
    .append('div')
    .style('position', 'fixed')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100vw')
    .style('height', '100vh')
    .style('z-index', -1)
    .style('background', '#0f172a');

  // 设置body和root背景透明
  d3.select('body').style('background', 'transparent');
  d3.select('#root').style('background', 'transparent');
  // 创建粒子系统
  const particleCount = 150;
  const particles = background.selectAll('div')
    .data(d3.range(particleCount).map((i: number) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      size: Math.random() * 5 + 1,
      opacity: Math.random() * 0.8 + 0.2
    })))
    .enter()
    .append('div')
    .style('position', 'absolute')
    .style('border-radius', '50%')
    .style('width', (d: Particle) => `${d.size}px`)
    .style('height', (d: Particle) => `${d.size}px`)
    .style('background', (_d: Particle) => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`)
    .style('left', (d: Particle) => `${d.x}vw`)
    .style('top', (d: Particle) => `${d.y}vh`)
    .style('box-shadow', (_d: Particle) => `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`)
    .style('opacity', (d: Particle) => d.opacity);

  // 动画函数
  const animateParticles = () => {
    particles.each(function(this: HTMLElement, d: Particle) {
      // 更新位置
      d.x = (d.x + d.dx + 100) % 100;
      d.y = (d.y + d.dy + 100) % 100;
      
      // 随机调整方向和速度
      if (Math.random() < 0.01) {
        d.dx = (Math.random() - 0.5) * 0.1;
        d.dy = (Math.random() - 0.5) * 0.1;
      }
      
      d3.select(this)
        .style('left', `${d.x}vw`)
        .style('top', `${d.y}vh`);
    });
    requestAnimationFrame(animateParticles);
  };

  // 启动动画
  animateParticles();

  // 窗口大小变化时调整背景
  window.addEventListener('resize', () => {
    background
      .style('width', '100vw')
      .style('height', '100vh');
  });
};

// 当DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createD3Background);
} else {
  createD3Background();
}