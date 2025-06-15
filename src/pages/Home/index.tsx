
import TopNavBar from '../../components/TopNavBar'
import CarouselComponent from './components/Carousel';
import FarewellModule from './components/Farewell';
import Features from './components/Features';
import Footer from './components/Footer';
import TeamProjects from './components/TeamProjects';

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
