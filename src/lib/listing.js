export const LOGO = 'bulsu-logo.png';
export const CATS = ['All', 'Books and Notes', 'School Supplies', 'Food', 'Services', 'Others'];
export const CAMPUSES = [
  'Meneses Campus',
  'Main Campus (Malolos)',
  'Bustos Campus',
  'Sarmiento Campus',
  'Hagonoy Campus'
];
export const COLLEGES = [
  'CIT / Engineering',
  'College of Education',
  'College of Business',
  'College of Science',
  'All Colleges'
];
export const CONDITIONS = ['Like New', 'Good', 'Fair'];
export const TYPES = ['For Sale', 'Item Swap', 'Giveaway', 'Service'];
export const BTN = { 'For Sale': 'Request Trade', 'Item Swap': 'Offer a Swap', Giveaway: 'Claim Item', Service: 'Book Service' };
export const priceText = (type, price) =>
  type === 'Giveaway' ? 'Free' : type === 'Item Swap' ? 'Swap' : '\u20B1 ' + (price || 0) + (type === 'Service' ? ' / service' : '');

