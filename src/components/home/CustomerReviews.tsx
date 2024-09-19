import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CustomerReview {
  name: string;
  position: string;
  comment: string;
  avatar: string;
}

const reviews: CustomerReview[] = [
  {
    name: "John Doe",
    position: "Freelancer",
    comment: "SaldaQ has transformed the way I manage my expenses. I can track everything effortlessly!",
    avatar: "/avatars/john.png"
  },
  {
    name: "Jane Smith",
    position: "Small Business Owner",
    comment: "The analytics and simplicity of SaldaQ make it my go-to finance app for managing my business.",
    avatar: "/avatars/jane.png"
  },
  {
    name: "Mark Johnson",
    position: "Software Engineer",
    comment: "I love the synchronization feature. I can access my data across multiple devices seamlessly.",
    avatar: "/avatars/mark.png"
  }
];



const CustomerReviews: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 font-poppins">What Our Customers Say</h2>
        <p className="text-lg text-center mb-16">See why thousands of customers love using SaldaQ to manage their finances.</p>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <img src={review.avatar} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <p className="text-gray-500 mb-2">{review.position}</p>
              <p className="text-gray-600">"{review.comment}"</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CustomerReviews;
