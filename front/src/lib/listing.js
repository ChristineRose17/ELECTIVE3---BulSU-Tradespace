export const LOGO = 'bulsu-logo.png';
export const CATS = ['All', 'Books and Notes', 'School Supplies', 'Food', 'Services', 'Others'];
export const CAMPUSES = [
  'Meneses Campus',
];
export const COLLEGES = [
  'College of Professional Teacher Education',
  'BS Computer Engineering',
  'BS Information Technology',
  'BIT - Computer Technology',
  'BIT - Culinary and Food Processing Technology',
  'BS Hospitality Management',
  'BS Business Administration',
  'BS Information Technology',
  'Personnel',
];
export const CONDITIONS = ['Like New', 'Good', 'Fair'];
export const TYPES = ['For Sale', 'Item Swap', 'Giveaway', 'Service'];
export const BTN = { 'For Sale': 'Buy Now', 'Item Swap': 'Offer a Swap', Giveaway: 'Claim Item', Service: 'Book Service' };
export const priceText = (type, price) =>
  type === 'Giveaway' ? 'Free' : type === 'Item Swap' ? 'Swap' : '\u20B1 ' + (price || 0) + (type === 'Service' ? ' / service' : '');

