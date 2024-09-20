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
    avatar: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Jane Smith",
    position: "Small Business Owner",
    comment: "The analytics and simplicity of SaldaQ make it my go-to finance app for managing my business.",
    avatar: "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Mark Johnson",
    position: "Software Engineer",
    comment: "I love the synchronization feature. I can access my data across multiple devices seamlessly.",
    avatar: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    <div className="py-16 bg-white"  data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 font-poppins">What Our Customers Say</h2>
        <p className="text-lg text-center mb-16">See why thousands of customers love using SaldaQ to manage their finances.</p>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 border border-slate-300 rounded-lg shadow-lg  text-center">
              <img src={review.avatar} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <p className="text-gray-500 mb-2">{review.position}</p>
              <p className="text-gray-600">"{review.comment}"</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomerReviews;
