import homepageImg from "../assets/homepage.png";
import "../styles/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ItemCard } from "../components/itemCard";
import { Button } from "reactstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, AppDispatch } from "../store/store";
import { fetchItems } from "../store/slices/itemsSlice";
import Loader from "../components/loader";

const Home = () => {
  const items = useSelector((state: IRootState) => state.items.items);
  const status = useSelector((state: IRootState) => state.items.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <img
        className="home-image"
        src={homepageImg}
        alt="Woman with a shopping bag"
      />
      <div className="m-5">
        <h2>Wyprzedaż</h2>
        <Button className="mt-2" color="primary" size="small">
          Przeglądaj
        </Button>
      </div>
      <Loader loading={status === "loading"} type={"spinner"}>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          transitionDuration={1000}
        >
          {items?.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Carousel>
      </Loader>
    </div>
  );
};

export default Home;
