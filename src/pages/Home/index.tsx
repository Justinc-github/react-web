
import CarouselComponent from './components/Carousel';
import FarewellModule from './components/Farewell';
import Features from './components/Features';
import TeacherShow from './components/TeacherShow';
import TeamIntroduction from './components/TeamIntroduction';
import TeamProjects from './components/TeamProjects';

export default function Home() {
  console.log("关了吧，不给你爬！");
  return (
    <div className="home">
      <CarouselComponent />
      <TeamIntroduction />
      <Features />
      <TeamProjects />
      <TeacherShow/>
      <FarewellModule />
    </div>
  );
}
