export const LOGO = 'https://ts1.mm.bing.net/th?id=OIP.TyGhWuE7Umci1BdVaPHTxAHaHa&pid=15.1';
export const CATS = ['All', 'Books and Notes', 'School Supplies', 'Food', 'Services', 'Others'];
export const BTN = { 'For Sale': 'Request Trade', 'Item Swap': 'Offer a Swap', Giveaway: 'Claim Item', Service: 'Book Service' };
export const priceText = (type, price) =>
  type === 'Giveaway' ? 'Free' : type === 'Item Swap' ? 'Swap' : '\u20B1 ' + (price || 0) + (type === 'Service' ? ' / service' : '');
