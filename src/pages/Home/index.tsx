
// import { Container, Navbar, Nav } from "react-bootstrap";
import TopNavBar from '../../components/TopNavBar'
import CarouselComponent from './components/Carousel';
export default function TopNavbar() {
  return (
    <div className='home'>
      <TopNavBar />
      <CarouselComponent/>
    </div>
  );
}
