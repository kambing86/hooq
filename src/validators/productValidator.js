import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  measurement: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});
