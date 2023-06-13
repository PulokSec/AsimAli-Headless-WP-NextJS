import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import userLogo from "../../public/images/user.png";

const CustomRightArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <button
      aria-label="Right Arrow"
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow-right "
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <button
      aria-label="Left Arrow"
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow-left "
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
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

type MyProps = {
  reviews: any;
};

const ClientReviews = (props: MyProps) => {
  const { reviews } = props;
const router = useRouter();
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {reviews?.testimonials?.length > 1 && (
        <Container className="review">
          <h1 className="my-5 text-center">{reviews?.bannerTitle?.split(" ")?.[0]} <span style={{color:"#f0b254"}}>{reviews?.bannerTitle?.split(" ")?.[1]}</span></h1>
        <Carousel
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          autoPlay={true}
          infinite={true}
          responsive={responsive}
        >
          {reviews?.testimonials?.map((review: any, index: number) => {
            return (
              // <div key={index}>
                <div key={index} className="review-box card ml-5">
                  <div className="card-body">
                    <div>
                    <q className="review-content">
                      {review?.testimonial?.length > 200 ? review?.testimonial?.slice(0, 200) + "..." : review?.testimonial}
                    </q>
                    </div>
                    <div className="review-body">
                <div className="review-img">
                <Image 
                  src={review?.client_image ? review?.client_image : userLogo}
                  loader={myLoader}  
                  style={{zIndex: 0}} 
                  alt='Logo' 
                  layout="responsive"
                  objectFit="cover"
                  width={30}
                  height={30}
                  priority={true}
                  />
                </div>
                <div className="review-name">
                    <p className="">
                      {review?.clientName}
                    </p>
                </div>
              </div>
                  </div>
                </div>
              // </div>
            );
          })}
        </Carousel>
        <p className="review-text" onClick={()=> router.push("/testimonials")}> View all Reviews</p>
      </Container>
      )}
    </>
  );
};

export default ClientReviews;
