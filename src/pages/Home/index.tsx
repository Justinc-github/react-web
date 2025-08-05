
import CarouselComponent from './components/Carousel';
import FarewellModule from './components/Farewell';
import Features from './components/Features';
import TeamProjects from './components/TeamProjects';

export default function Home() {
  console.log("关了吧，不给你爬！");
  return (
    <div className="home">
      <CarouselComponent />
      <Features />
      <TeamProjects />
      <FarewellModule />
    </div>
  );
}
