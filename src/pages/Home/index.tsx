
import TopNavBar from '../../components/TopNavBar'
import CarouselComponent from './components/Carousel';
import Features from './components/Features';
import Footer from './components/Footer';
import TeamProjects from './components/TeamProjects';
import FarewellModule from './components/FarewellModule'; // 新增送别模块导入

export default function TopNavbar() {
  return (
    <div className="home">
      <TopNavBar />
      <CarouselComponent />
      <Features />
      <TeamProjects />
      <FarewellModule /> {/* 新增送别学长模块 */}
      <Footer />
    </div>
  );
}
